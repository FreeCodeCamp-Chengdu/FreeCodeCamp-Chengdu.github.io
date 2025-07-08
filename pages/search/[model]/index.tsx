import { observer } from 'mobx-react';
import {
  cache,
  compose,
  errorLogger,
  RouteProps,
  router,
} from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { buildURLData } from 'web-utility';

import { CardPage, CardPageProps } from '../../../components/Layout/CardPage';
import { PageHead } from '../../../components/Layout/PageHead';
import { SearchBar } from '../../../components/Navigator/SearchBar';
import systemStore, { SearchPageMeta } from '../../../models/System';
import { I18nContext } from '../../../models/Translation';

type SearchModelPageProps = RouteProps<{ model: string }> & SearchPageMeta;

export const getServerSideProps = compose<
  { model: string },
  SearchModelPageProps
>(
  cache(),
  router,
  errorLogger,
  async ({ params, query: { keywords = '', page = '1' } }) => {
    const Model = systemStore.searchMap[params!.model];

    if (typeof Model !== 'function') return { notFound: true, props: {} };

    const store = new Model();

    await store.getSearchList(keywords + '', +page, 9);

    const { pageIndex, currentPage, pageCount } = store;

    return {
      props: JSON.parse(
        JSON.stringify({ pageIndex, currentPage, pageCount }),
      ) as SearchModelPageProps,
    };
  },
);

const SearchNameMap: () => Record<string, string> = () => ({});

const SearchCardMap: Record<string, CardPageProps['Card']> = {};

const SearchModelPage: FC<SearchModelPageProps> = observer(
  ({ route: { params, query }, ...pageMeta }) => {
    const { t } = useContext(I18nContext),
      { model } = params!,
      { keywords = '' } = query,
      nameMap = SearchNameMap();
    const name = nameMap[model],
      Card = SearchCardMap[model];
    const title = `${keywords} - ${name} ${t('search_results')}`;

    return (
      <Container>
        <PageHead title={title} />

        <h1 className="my-3 text-center">{title}</h1>

        <header className="d-flex flex-wrap align-items-center gap-3">
          <SearchBar
            className="flex-fill"
            action={`/search/${model}`}
            defaultValue={keywords}
          />
          <Nav variant="pills" defaultActiveKey={model}>
            {Object.entries(nameMap).map(([key, value]) => (
              <Nav.Item key={key}>
                <Nav.Link
                  eventKey={key}
                  href={`/search/${key}?keywords=${keywords}`}
                >
                  {value}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </header>

        <CardPage
          {...{ Card, ...pageMeta }}
          cardLinkOf={model === 'suit' ? id => `/suit/${id}` : undefined}
          pageLinkOf={page =>
            `/search/${model}?${buildURLData({ keywords, page })}`
          }
        />
      </Container>
    );
  },
);
export default SearchModelPage;
