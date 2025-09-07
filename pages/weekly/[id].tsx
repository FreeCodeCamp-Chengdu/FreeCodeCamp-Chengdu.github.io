import '../../models/Base';

import { marked } from 'marked';
import { Issue, IssueModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FC, useContext } from 'react';
import { Badge, Breadcrumb, Button, Card, Col, Container, Row } from 'react-bootstrap';

import { LabelBar } from '../../components/Git/LabelBar';
import { PageHead } from '../../components/Layout/PageHead';
import { I18nContext } from '../../models/Translation';
import styles from '../../styles/Weekly.module.less';

interface WeeklyDetailParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<WeeklyDetailParams> = async () => {
  const list = await new IssueModel('FreeCodeCamp-Chengdu', 'IT-Technology-weekly').getAll({
    state: 'all',
  });
  const paths = list.map(({ number }) => ({ params: { id: number + '' } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Issue, WeeklyDetailParams> = async ({ params }) => {
  const { id } = params!;
  const issue = await new IssueModel('FreeCodeCamp-Chengdu', 'IT-Technology-weekly').getOne(id);

  return {
    props: JSON.parse(JSON.stringify(issue)),
    revalidate: 3600, // Revalidate every hour
  };
};

const WeeklyDetailPage: FC<Issue> = observer(
  ({ number, title, labels, body, user, created_at, updated_at, state, html_url }) => {
    const { t } = useContext(I18nContext);
    const htmlContent = body ? (marked(body) as string) : '';

    return (
      <Container className={`py-4 ${styles.weeklyContainer}`}>
        <PageHead
          title={`${title} - ${t('weekly')}`}
          description={body ? body.slice(0, 160) + '...' : title}
        />

        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/">{t('home_page')}</Breadcrumb.Item>
          <Breadcrumb.Item href="/weekly">{t('weekly')}</Breadcrumb.Item>
          <Breadcrumb.Item active>#{number}</Breadcrumb.Item>
        </Breadcrumb>

        <article>
          <header className="mb-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <Badge bg={state === 'open' ? 'success' : 'secondary'} className="fs-6">
                {state === 'open' ? t('open') : t('closed')}
              </Badge>
              <span className="text-muted">#{number}</span>
            </div>

            <h1 className="display-5 mb-3">{title}</h1>

            {labels?.[0] && <LabelBar labels={labels} />}

            <Row as="dl" className="mb-4 pb-3 border-bottom">
              {user && (
                <>
                  <Col as="dt" sm={3} className="text-muted">
                    {t('weekly_author')}:
                  </Col>
                  <Col as="dd" sm={9} className="fw-bold">
                    {user.login}
                  </Col>
                </>
              )}
              {created_at && (
                <>
                  <Col as="dt" sm={3} className="text-muted">
                    {t('weekly_published')}:
                  </Col>
                  <Col as="dd" sm={9}>
                    <time dateTime={created_at}>
                      {new Date(created_at).toLocaleString('zh-CN')}
                    </time>
                  </Col>
                </>
              )}
              {updated_at && updated_at !== created_at && (
                <>
                  <Col as="dt" sm={3} className="text-muted">
                    {t('weekly_updated')}:
                  </Col>
                  <Col as="dd" sm={9}>
                    <time dateTime={updated_at}>
                      {new Date(updated_at).toLocaleString('zh-CN')}
                    </time>
                  </Col>
                </>
              )}
            </Row>
            <div className="d-flex justify-content-end mb-4">
              <Button
                variant="outline-primary"
                size="sm"
                href={html_url}
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

            <p className="text-muted small">
              {t('github_document_description')}
              <a href={html_url} target="_blank" rel="noopener noreferrer" className="ms-1">
                {t('view_original_on_github')}
              </a>
            </p>
          </div>
        </footer>
      </Container>
    );
  },
);
export default WeeklyDetailPage;
