import { observer } from 'mobx-react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import { CommunityStats } from '../components/Home/CommunityStats';
import { LatestBlogs } from '../components/Home/LatestBlogs';
import { Sponsors } from '../components/Home/Sponsors';
import { UpcomingEvents } from '../components/Home/UpcomingEvents';
import { PageHead } from '../components/Layout/PageHead';
import styles from '../styles/Home.module.less';
import { ArticleMeta, pageListOf, traverseTree } from './api/core';

interface HomePageProps {
  latestArticles: ArticleMeta[];
  upcomingEvents: ArticleMeta[];
  sponsors: ArticleMeta[];
  error?: {
    message: string;
    stack?: string;
  };
}

export const getStaticProps = async () => {
  const [articles, activities, partners] = await Promise.all([
    Array.fromAsync(pageListOf('/article/Wiki/_posts/Article')),
    Array.fromAsync(pageListOf('/article/Wiki/_posts/Activity')),
    Array.fromAsync(pageListOf('/article/Wiki/_posts/Partner')),
  ]);

  const latestArticles = articles
    .map(root => {
      const message = [...traverseTree(root, 'subs')];

      return message;
    })
    .flat()
    .filter((article): article is ArticleMeta => 'meta' in article)
    .sort((a, b) => {
      const dateA = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
      const dateB = b.meta?.date ? new Date(b.meta.date).getTime() : 0;

      return dateB - dateA;
    })
    .slice(0, 3);

  const upcomingEvents = activities
    .map(root => [...traverseTree(root, 'subs')])
    .flat()
    .filter((event): event is ArticleMeta => 'meta' in event)
    .sort((a, b) => {
      const dateA = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
      const dateB = b.meta?.date ? new Date(b.meta.date).getTime() : 0;

      return dateB - dateA;
    })
    .slice(0, 3);

  const sponsors = partners
    .flat()
    .filter((sponsor): sponsor is ArticleMeta => 'meta' in sponsor)
    .slice(0, 6);

  return {
    props: { latestArticles, upcomingEvents, sponsors },
    revalidate: 3600,
  };
};

const HomePage = observer(
  ({ latestArticles, upcomingEvents, sponsors, error }: HomePageProps) => (
    <main className="min-vh-100">
      <PageHead title="Home" />
      <>
        <div className={styles.hero}>
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} md={7}>
                <h1 className="fw-bold display-4 hero-dark-text">
                  freeCodeCamp 成都社区
                </h1>
                <p className="fs-5 mt-3 hero-dark-text">
                  一个友好的技术社区，致力于交流、学习和互助，帮助成都的开发者和技术爱好者提升个人技术能力。
                </p>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="me-3"
                    href="https://open-source-bazaar.feishu.cn/share/base/form/shrcnUC1stOces9sfPbHbEseep8"
                  >
                    加入社区
                  </Button>
                  <Button variant="outline-primary" size="lg" href="#">
                    查看活动
                  </Button>
                </div>
              </Col>
              <Col
                xs={12}
                md={5}
                className="d-flex justify-content-center mt-5 mt-md-0"
              >
                <div
                  className="bg-white rounded-4 d-flex justify-content-center align-items-center"
                  style={{ width: '25rem', height: '18.75rem' }}
                >
                  <Image
                    src="https://github.com/FreeCodeCamp-Chengdu.png"
                    alt="freeCodeCamp Chengdu"
                    fluid
                    className="rounded-3"
                    style={{ maxWidth: '80%', maxHeight: '80%' }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <UpcomingEvents events={upcomingEvents} />

        <LatestBlogs articles={latestArticles} />

        <CommunityStats />

        <Sponsors sponsors={sponsors} />
      </>
    </main>
  ),
);

export default HomePage;
