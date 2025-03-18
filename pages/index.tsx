import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { Button,Card, Col, Container, Row } from 'react-bootstrap';

import { CommunityStats } from '../components/Home/CommunityStats';
import { LatestBlogs } from '../components/Home/LatestBlogs';
import { Sponsors } from '../components/Home/Sponsors';
import { UpcomingEvents } from '../components/Home/UpcomingEvents';
import { PageHead } from '../components/Layout/PageHead';
import { i18n, t } from '../models/Translation';
import styles from '../styles/Home.module.less';

export const getServerSideProps = compose(translator(i18n));

const HomePage = observer(() => (
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
          <Button variant="primary" size="lg" className="me-3" href="#">
            加入社区
          </Button>
          <Button variant="outline-primary" size="lg" href="#">
            查看活动
          </Button>
        </div>
      </Col>

      {/* <Col xs={12} md={5} className={styles.imageSection}></Col> */}
    </Row>

    <UpcomingEvents />

    <LatestBlogs />

    <CommunityStats />

    <Sponsors />
  </Container>
));

export default HomePage;
