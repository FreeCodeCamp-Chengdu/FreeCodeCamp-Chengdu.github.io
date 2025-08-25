import 'core-js/full/array/from-async';

import { observer } from 'mobx-react';
import { InferGetStaticPropsType } from 'next';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { PageHead } from '../components/Layout/PageHead';
import { ArticleMeta, pageListOf, traverseTree } from './api/core';

export const getStaticProps = async () => {
  try {
    // Try to load activities, but handle case where directory doesn't exist
    let activities: ArticleMeta[] = [];

    try {
      const activitiesData = await Array.fromAsync(pageListOf('/article/Wiki/_posts/Activity'));

      activities = activitiesData
        .map(root => [...traverseTree(root, 'subs')])
        .flat()
        .filter((event): event is ArticleMeta => 'meta' in event)
        .sort((a, b) => {
          const dateA = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
          const dateB = b.meta?.date ? new Date(b.meta.date).getTime() : 0;

          return dateB - dateA;
        });
    } catch (dirError) {
      console.warn('Activity directory not found, using empty activities list:', dirError);
    }

    return {
      props: { upcomingEvents: activities },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error loading activities:', error);

    return {
      props: { upcomingEvents: [] },
      revalidate: 3600,
    };
  }
};

const ActivityPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = observer(
  ({ upcomingEvents }) => (
    <div className="min-vh-100">
      <PageHead title="活动日历" />

      <Container className="py-5 mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4">活动日历</h1>
            <p className="lead mb-4">查看 freeCodeCamp 成都社区的最新活动安排和历史活动记录</p>
          </div>
        </div>

        {/* Calendar Iframe */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="mb-3">活动日历</h2>
            <div className="calendar-container" style={{ minHeight: '600px' }}>
              <iframe
                src="https://open-source-bazaar.feishu.cn/share/base/view/shrcn6jNjSKvE9MKPqk56SeSd7p"
                width="100%"
                height="600"
                style={{ border: 'none', borderRadius: '8px' }}
                title="freeCodeCamp 成都社区活动日历"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Activity List Section */}
        {upcomingEvents.length > 0 && (
          <div className="row">
            <div className="col-12">
              <h2 className="mb-3">活动列表</h2>
              <div className="row g-4">
                {upcomingEvents.map(({ name, meta, path }) => (
                  <div key={name} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        {meta?.start && (
                          <p className="card-text">
                            <i className="bi bi-calendar-event me-2" />
                            时间: {meta.start}
                          </p>
                        )}
                        {meta?.address && (
                          <p className="card-text">
                            <i className="bi bi-geo-alt me-2" />
                            地点: {meta.address}
                          </p>
                        )}
                        {meta?.description && (
                          <p className="card-text text-muted">{meta.description}</p>
                        )}
                        {path && (
                          <a href={path} className="btn btn-primary">
                            查看详情
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  ),
);

export default ActivityPage;
