import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { GitCard } from '../components/Git/Card';
import { PageHead } from '../components/Layout/PageHead';
import { i18n, t } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { framework, mainNav } from './api/home';

export const getServerSideProps = compose(translator(i18n));

const HomePage = observer(() => (
  <Container as="main" className={styles.main}>
    <PageHead />

    <h1 className={`m-0 text-center ${styles.title}`}>
      {t('welcome_to')}
      <a className="text-primary mx-2" href="https://nextjs.org">
        Next.js!
      </a>
    </h1>

    <p className={`text-center fs-4 ${styles.description}`}>
      {t('get_started_by_editing')}
      <code className={`mx-2 rounded-3 bg-light ${styles.code}`}>
        pages/index.tsx
      </code>
    </p>

    <Row className="g-4" xs={1} sm={2} md={4}>
      {mainNav().map(({ link, title, summary }) => (
        <Col key={link}>
          <Card
            className={`h-100 rounded-3 border ${styles.card}`}
            tabIndex={-1}
          >
            <Card.Body>
              <Card.Title as="h2" className="fs-4 mb-3">
                <a href={link} className="stretched-link">
                  {title} &rarr;
                </a>
              </Card.Title>
              <Card.Text className="fs-5">{summary}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

    <h2 className="my-4 text-center">{t('upstream_projects')}</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      {framework.map(
        ({ title, languages, tags, summary, link, repository }) => (
          <Col key={title}>
            <GitCard
              className={`h-100 ${styles.card}`}
              full_name={title}
              html_url={repository}
              homepage={link}
              languages={languages}
              topics={tags}
              description={summary}
            />
          </Col>
        ),
      )}
    </Row>
  </Container>
));

export default HomePage;
