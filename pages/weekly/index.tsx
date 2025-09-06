import { observer } from 'mobx-react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FC } from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';

import { PageHead } from '../../components/Layout/PageHead';
import { githubClient } from '../../models/Base';
import styles from '../../styles/Weekly.module.less';

// GitHub Issue type definition
interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  labels: Array<{ name: string; color: string } | string>;
  user: {
    login: string;
    avatar_url: string;
  } | null;
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface WeeklyPageProps {
  issues: GitHubIssue[];
}

export const getStaticProps: GetStaticProps<WeeklyPageProps> = async () => {
  try {
    const { body: issues } = await githubClient.get<GitHubIssue[]>(
      'repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues?state=all&sort=created&direction=desc',
    );

    return {
      props: {
        issues: JSON.parse(JSON.stringify(issues || [])),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Failed to fetch issues:', error);

    return {
      props: {
        issues: [],
      },
      revalidate: 300, // Retry more frequently if there's an error
    };
  }
};

const WeeklyIndexPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = observer(
  ({ issues }) => (
    <Container className="py-5">
      <PageHead
        title="IT 周刊"
        description="FreeCodeCamp 成都社区 IT 技术周刊，分享最新技术动态和资源"
      />

      <div className={styles.weeklyHeader}>
        <h1>IT 周刊</h1>
        <p className="lead">分享最新的技术动态、开源项目和学习资源</p>
        <Button
          variant="outline-light"
          size="lg"
          href="https://github.com/FreeCodeCamp-Chengdu/IT-Technology-weekly"
          target="_blank"
          rel="noopener noreferrer"
        >
          在 GitHub 上查看
        </Button>
      </div>

      {issues.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {issues.map(issue => (
            <Col key={issue.id}>
              <Card className={`h-100 shadow-sm ${styles.issueCard}`}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg={issue.state === 'open' ? 'success' : 'secondary'}>
                      {issue.state === 'open' ? '开放' : '已关闭'}
                    </Badge>
                    <small className="text-muted">#{issue.number}</small>
                  </div>

                  <Card.Title className="h5">
                    <a
                      href={`/weekly/${issue.number}`}
                      className={`text-decoration-none text-dark ${styles.issueTitle}`}
                    >
                      {issue.title}
                    </a>
                  </Card.Title>

                  {issue.body && (
                    <Card.Text className="text-muted mb-3 flex-grow-1">
                      {issue.body.substring(0, 150)}
                      {issue.body.length > 150 && '...'}
                    </Card.Text>
                  )}

                  <div className="mt-auto">
                    {issue.labels && issue.labels.length > 0 && (
                      <div className="mb-2">
                        {issue.labels.slice(0, 3).map((label, index) => (
                          <Badge
                            key={index}
                            bg="light"
                            text="dark"
                            className={`me-1 ${styles.labelBadge}`}
                          >
                            {typeof label === 'string' ? label : label.name}
                          </Badge>
                        ))}
                        {issue.labels.length > 3 && (
                          <Badge bg="light" text="dark" className="small">
                            +{issue.labels.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div
                      className={`d-flex justify-content-between align-items-center text-small text-muted ${styles.authorInfo}`}
                    >
                      <span>{issue.user && <>作者: {issue.user.login}</>}</span>
                      <time dateTime={issue.created_at}>
                        {new Date(issue.created_at).toLocaleDateString('zh-CN')}
                      </time>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center">
          <Card.Body>
            <h5>暂无周刊内容</h5>
            <p className="text-muted">周刊内容将从 GitHub Issues 自动加载</p>
            <Button
              variant="primary"
              href="https://github.com/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              查看所有 Issues
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  ),
);

export default WeeklyIndexPage;
