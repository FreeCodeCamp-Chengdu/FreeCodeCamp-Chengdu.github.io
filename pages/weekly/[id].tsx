import { marked } from 'marked';
import { observer } from 'mobx-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FC, useContext } from 'react';
import { Badge, Breadcrumb, Button, Card, Container } from 'react-bootstrap';

import { PageHead } from '../../components/Layout/PageHead';
import { githubClient } from '../../models/Base';
import { I18nContext } from '../../models/Translation';
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

interface WeeklyDetailParams extends ParsedUrlQuery {
  id: string;
}

interface WeeklyDetailProps {
  issue: GitHubIssue;
}

export const getStaticPaths: GetStaticPaths<WeeklyDetailParams> = async () => {
  try {
    const { body: issues } = await githubClient.get<GitHubIssue[]>(
      'repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues?state=all&sort=created&direction=desc',
    );

    const paths = (issues || []).map(issue => ({
      params: { id: issue.number.toString() },
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Failed to generate static paths:', error);

    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<WeeklyDetailProps, WeeklyDetailParams> = async ({
  params,
}) => {
  const { id } = params!;

  try {
    const { body: issue } = await githubClient.get<GitHubIssue>(
      `repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues/${id}`,
    );

    if (!issue) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        issue: JSON.parse(JSON.stringify(issue)),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Failed to fetch issue:', error);

    return {
      notFound: true,
    };
  }
};

const WeeklyDetailPage: FC<WeeklyDetailProps> = observer(({ issue }) => {
  const { t } = useContext(I18nContext);
  const htmlContent = issue.body ? (marked(issue.body) as string) : '';

  return (
    <Container className={`py-4 ${styles.weeklyContainer}`}>
      <PageHead
        title={`${issue.title} - ${t('weekly')}`}
        description={issue.body ? issue.body.substring(0, 160) + '...' : issue.title}
      />

      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
        <Breadcrumb.Item href="/weekly">{t('weekly')}</Breadcrumb.Item>
        <Breadcrumb.Item active>#{issue.number}</Breadcrumb.Item>
      </Breadcrumb>

      <article>
        <header className="mb-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Badge bg={issue.state === 'open' ? 'success' : 'secondary'} className="fs-6">
              {issue.state === 'open' ? t('open') : t('closed')}
            </Badge>
            <span className="text-muted">#{issue.number}</span>
          </div>

          <h1 className="display-5 mb-3">{issue.title}</h1>

          {issue.labels && issue.labels.length > 0 && (
            <div className="mb-3">
              {issue.labels.map((label, index) => (
                <Badge
                  key={index}
                  bg="light"
                  text="dark"
                  className={`me-2 mb-2 ${styles.labelBadge}`}
                >
                  {typeof label === 'string' ? label : label.name}
                </Badge>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <div className="text-muted">
              {issue.user && (
                <span>
                  {t('weekly_author')}: <strong>{issue.user.login}</strong>
                </span>
              )}
              {issue.created_at && (
                <span className="ms-3">
                  {t('weekly_published')}:{' '}
                  <time dateTime={issue.created_at}>
                    {new Date(issue.created_at).toLocaleString('zh-CN')}
                  </time>
                </span>
              )}
              {issue.updated_at && issue.updated_at !== issue.created_at && (
                <span className="ms-3">
                  {t('weekly_updated')}:{' '}
                  <time dateTime={issue.updated_at}>
                    {new Date(issue.updated_at).toLocaleString('zh-CN')}
                  </time>
                </span>
              )}
            </div>

            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('view_on_github')}
              </Button>
            </div>
          </div>
        </header>

        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className={styles.markdownBody} />
        ) : (
          <Card>
            <Card.Body className="text-center text-muted">
              <p>{t('weekly_issue_no_content')}</p>
            </Card.Body>
          </Card>
        )}
      </article>

      <footer className="mt-5 pt-4 border-top">
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="outline-secondary" href="/weekly">
            ← {t('back_to_weekly_list')}
          </Button>

          <div className="text-muted small">
            <p className="mb-0">
              {t('github_document_description')}
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="ms-1">
                {t('view_original_on_github')}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Container>
  );
});

export default WeeklyDetailPage;
