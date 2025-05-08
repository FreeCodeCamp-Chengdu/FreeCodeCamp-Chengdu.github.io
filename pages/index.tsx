import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { CommunityStats } from '../components/Home/CommunityStats';
import { LatestBlogs } from '../components/Home/LatestBlogs';
import { Sponsors } from '../components/Home/Sponsors';
import { UpcomingEvents } from '../components/Home/UpcomingEvents';
import { PageHead } from '../components/Layout/PageHead';
import { i18n, t } from '../models/Translation';
import { ArticleMeta, pageListOf, traverseTree } from './api/core';
import styles from '../styles/Home.module.less';

interface HomePageProps {
  latestArticles: ArticleMeta[];
  upcomingEvents: ArticleMeta[];
  sponsors: ArticleMeta[];
}

export const getStaticProps = async () => {
  try {
    console.log('Starting to fetch data...');
    const [articles, activities, partners] = await Promise.all([
      Array.fromAsync(pageListOf('/article/Wiki/_posts/Article/Translation')),
      Array.fromAsync(pageListOf('/article/Wiki/_posts/Activity')),
      Array.fromAsync(pageListOf('/article/Wiki/_posts/Partner'))
    ]);

    console.log('Raw articles:', articles);
    console.log('Raw activities:', activities);
    console.log('Raw partners:', partners);

    const latestArticles = articles
      // .map(root => {
      //   let message = [...traverseTree(root, 'subs')];
      //   console.log('123:', root);
      //   return message;
      // })
      .flat()
      .filter((article): article is ArticleMeta => 'meta' in article)
      .sort((a, b) => {
        const dateA = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
        const dateB = b.meta?.date ? new Date(b.meta.date).getTime() : 0;
        return dateB - dateA; // Sort in descending order (newest first)
      })
      .slice(0, 3);
    
    console.log('Processed latestArticles:', latestArticles);

    const upcomingEvents = activities
      .map(root => {
        let message = [...traverseTree(root, 'subs')]
        console.log('aabbcc:', message);
        return message;
      })
      .flat()
      .filter((event): event is ArticleMeta => 'meta' in event)
      // .filter(event => {
      //   const eventDate = event.meta?.date ? new Date(event.meta.date) : null;
      //   return eventDate && eventDate > new Date(); // Only keep future events
      // })
      .sort((a, b) => {
        const dateA = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
        const dateB = b.meta?.date ? new Date(b.meta.date).getTime() : 0;
        return dateB - dateA; // Sort in ascending order (nearest future first)
      })
      .slice(0, 3);

    console.log('Processed upcomingEvents:', upcomingEvents);

    const sponsors = partners
      // .map(root => [...traverseTree(root, 'subs')])
      .flat()
      .filter((sponsor): sponsor is ArticleMeta => 'meta' in sponsor)
      .slice(0, 3);

    console.log('Processed sponsors:', sponsors);

    return { 
      props: { latestArticles, upcomingEvents, sponsors },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        latestArticles: [],
        upcomingEvents: [],
        sponsors: []
      },
      revalidate: 3600
    };
  }
};

const HomePage = observer(({ latestArticles, upcomingEvents, sponsors }: HomePageProps) => (
  <Container as="main" className={styles.main}>
    <PageHead title="Home" />

    <Row className={styles.heroSection}>
      <Col xs={12} md={7} className={styles.textSection}>
        <h1 className="fw-bold">freeCodeCamp 成都社区</h1>
        <br />
        <p className="fs-5 text-muted">
          一个友好的技术社区，致力于交流、学习和互助，帮助成都的开发者和技术爱好者提升个人技术能力。
        </p>
        <div className="mt-4">
          <Button variant="primary" size="lg" className="me-3" href="https://open-source-bazaar.feishu.cn/share/base/form/shrcnUC1stOces9sfPbHbEseep8">
            加入社区
          </Button>
          <Button variant="outline-primary" size="lg" href="#">
            查看活动
          </Button>
        </div>
      </Col>
    </Row>

    <UpcomingEvents events={upcomingEvents} />

    <LatestBlogs articles={latestArticles} />

    <CommunityStats />

    <Sponsors sponsors={sponsors} />
  </Container>
));

export default HomePage;
