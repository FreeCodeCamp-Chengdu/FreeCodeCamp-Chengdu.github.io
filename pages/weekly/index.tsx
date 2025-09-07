import { IssueModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FC, useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { IssueCard } from '../../components/Git/IssueCard';
import { PageHead } from '../../components/Layout/PageHead';
import type { Issue } from '../../models/Base';
import { I18nContext } from '../../models/Translation';
import styles from '../../styles/Weekly.module.less';

interface WeeklyPageProps {
  issues: Issue[];
}

export const getStaticProps: GetStaticProps<WeeklyPageProps> = async () => {
  const list = await new IssueModel('FreeCodeCamp-Chengdu', 'IT-Technology-weekly').getAll({
    state: 'all',
  });

  return {
    props: {
      issues: JSON.parse(JSON.stringify(list)),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

const WeeklyIndexPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = observer(
  ({ issues }) => {
    const { t } = useContext(I18nContext);

    return (
      <Container className="py-5">
        <PageHead title={t('weekly')} description={t('weekly_description')} />

        <div className={styles.weeklyHeader}>
          <h1>{t('weekly')}</h1>
          <p className="lead">{t('weekly_description')}</p>
          <Button
            variant="outline-light"
            size="lg"
            href="https://github.com/FreeCodeCamp-Chengdu/IT-Technology-weekly"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('view_on_github')}
          </Button>
        </div>

        {issues.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {issues.map(issue => (
              <Col key={issue.id}>
                <IssueCard {...issue} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center">
            <Card.Body>
              <h5>{t('no_weekly_content')}</h5>
              <p className="text-muted">{t('weekly_content_from_github')}</p>
              <Button
                variant="primary"
                href="https://github.com/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('view_all_issues')}
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    );
  },
);

export default WeeklyIndexPage;
