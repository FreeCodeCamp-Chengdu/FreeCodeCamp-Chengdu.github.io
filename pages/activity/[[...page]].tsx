import { observer } from 'mobx-react';
import { Pager } from 'mobx-restful-table';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { FC, useContext } from 'react';
import { Container } from 'react-bootstrap';

import { UpcomingEvents } from '../../components/Home/UpcomingEvents';
import { PageHead } from '../../components/Layout/PageHead';
import { I18nContext } from '../../models/Translation';
import { ArticleMeta, getMarkdownListSortedByDate } from '../api/core';

const ITEMS_PER_PAGE = 10;

interface ActivityPageProps {
  activities: ArticleMeta[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const activities = await getMarkdownListSortedByDate('/article/Wiki/_posts/Activity');
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  const paths = [
    { params: { page: [] } },
    ...Array.from({ length: totalPages }, (_, i) => ({
      params: { page: [i + 1 + ''] },
    }))
  ];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ActivityPageProps> = async ({ params }) => {
  const page = Number(params?.page?.[0]) || 1;
  const activities = await getMarkdownListSortedByDate('/article/Wiki/_posts/Activity');

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedActivities = activities.slice(startIndex, endIndex);
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  return {
    props: {
      activities: paginatedActivities,
      currentPage: page,
      totalPages,
      hasMore: page < totalPages,
    },
    revalidate: 3600,
  };
};

const ActivityPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = observer(
  ({ activities, currentPage, totalPages }) => {
    const { t } = useContext(I18nContext);

    return (
      <div className="min-vh-100">
        <Container className="py-5 mt-5">
          <PageHead title={t('activity_calendar')} />

          <hgroup className="d-flex flex-column align-items-center gap-4">
            <h1>{t('activity_calendar')}</h1>
            <p className="lead">{t('activity_calendar_description')}</p>
          </hgroup>

          <section className="d-flex flex-column align-items-center gap-3">
            <h2>{t('activity_calendar')}</h2>
            <iframe
              src="https://open-source-bazaar.feishu.cn/share/base/view/shrcn6jNjSKvE9MKPqk56SeSd7p"
              className="w-100 vh-100 border-0"
              allowFullScreen
            />
          </section>

          {activities.length > 0 && (
            <div className="py-5 bg-white w-100 m-0">
              <UpcomingEvents events={activities} />
            </div>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pager
                pageCount={totalPages}
                pageIndex={currentPage}
                pageSize={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </Container>
      </div>
    );
  },
);

export default ActivityPage;
