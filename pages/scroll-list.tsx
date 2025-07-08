import { Loading } from 'idea-react';
import { GitRepository, RepositoryModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { GitCard } from '../components/Git/Card';
import { PageHead } from '../components/Layout/PageHead';
import { repositoryStore } from '../models/Base';
import { I18nContext } from '../models/Translation';

export const getServerSideProps = compose(errorLogger, cache(), async () => {
  const list = await new RepositoryModel('freecodecamp-chengdu').getList();

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const ScrollListPage: FC<{ list: GitRepository[] }> = observer(({ list }) => {
  const i18n = useContext(I18nContext);

  return (
    <Container>
      <PageHead title={i18n.t('scroll_list')} />

      <h1 className="my-4">{i18n.t('scroll_list')}</h1>

      {repositoryStore.downloading > 0 && <Loading />}

      <ScrollList
        translator={i18n}
        store={repositoryStore}
        renderList={allItems => (
          <Row as="ul" className="list-unstyled g-4" xs={1} sm={2}>
            {allItems.map(item => (
              <Col key={item.id} as="li">
                <GitCard className="h-100 shadow-sm" {...item} />
              </Col>
            ))}
          </Row>
        )}
        defaultData={list}
      />
    </Container>
  );
});
export default ScrollListPage;
