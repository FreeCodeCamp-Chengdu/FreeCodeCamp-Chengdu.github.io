import { marked } from 'marked';
import { IssueModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FC, useContext } from 'react';
import { Badge, Breadcrumb, Button, Card, Container } from 'react-bootstrap';

import { PageHead } from '../../components/Layout/PageHead';
import type { Issue } from '../../models/Base';
import { I18nContext } from '../../models/Translation';
import styles from '../../styles/Weekly.module.less';

interface WeeklyDetailParams extends ParsedUrlQuery {
  id: string;
}

interface WeeklyDetailProps {
  issue: Issue;
}

export const getStaticPaths: GetStaticPaths<WeeklyDetailParams> = async () => {
  const list = await new IssueModel('FreeCodeCamp-Chengdu', 'IT-Technology-weekly').getAll({
    state: 'all',
  });

  const paths = list.map(issue => ({
    params: { id: issue.number.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<WeeklyDetailProps, WeeklyDetailParams> = async ({
  params,
}) => {
  const { id } = params!;
  const issue = await new IssueModel('FreeCodeCamp-Chengdu', 'IT-Technology-weekly').getOne(id);

  return {
    props: JSON.parse(JSON.stringify(issue)),
    revalidate: 3600, // Revalidate every hour
  };
};

const WeeklyDetailPage: FC<WeeklyDetailProps> = observer(({ issue }) => {
  const { t } = useContext(I18nContext);
  const htmlContent = issue.body ? (marked(issue.body) as string) : '';

  return (
    <Container className={`py-4 ${styles.weeklyContainer}`}>
      <PageHead
        title={`${issue.title} - ${t('weekly')}`}
        description={issue.body ? issue.body.slice(0, 160) + '...' : issue.title}
      />

      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">{t('home_page')}</Breadcrumb.Item>
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

          {issue.labels?.[0] && (
            <ul className="list-unstyled mb-3">
              {issue.labels.map((label, index) => (
                <Badge
                  key={index}
                  as="li"
                  bg="light"
                  text="dark"
                  className={`d-inline-block me-2 mb-2 ${styles.labelBadge}`}
                >
                  {typeof label === 'string' ? label : label.name}
                </Badge>
              ))}
            </ul>
          )}

          <dl className="row mb-4 pb-3 border-bottom">
            {issue.user && (
              <>
                <dt className="col-sm-3 text-muted">{t('weekly_author')}:</dt>
                <dd className="col-sm-9">
                  <strong>{issue.user.login}</strong>
                </dd>
              </>
            )}
            {issue.created_at && (
              <>
                <dt className="col-sm-3 text-muted">{t('weekly_published')}:</dt>
                <dd className="col-sm-9">
                  <time dateTime={issue.created_at}>
                    {new Date(issue.created_at).toLocaleString('zh-CN')}
                  </time>
                </dd>
              </>
            )}
            {issue.updated_at && issue.updated_at !== issue.created_at && (
              <>
                <dt className="col-sm-3 text-muted">{t('weekly_updated')}:</dt>
                <dd className="col-sm-9">
                  <time dateTime={issue.updated_at}>
                    {new Date(issue.updated_at).toLocaleString('zh-CN')}
                  </time>
                </dd>
              </>
            )}
          </dl>
          <div className="d-flex justify-content-end mb-4">
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
        </header>

        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="markdown-body" />
        ) : (
          <Card body>
            <p className="text-center text-muted">{t('weekly_issue_no_content')}</p>
          </Card>
        )}
      </article>

      <footer className="mt-5 pt-4 border-top">
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="outline-secondary" href="/weekly">
            ← {t('back_to_weekly_list')}
          </Button>

          <div className="text-muted small">
            <p>
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
