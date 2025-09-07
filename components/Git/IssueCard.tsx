import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { Badge, Card, CardProps } from 'react-bootstrap';

import type { Issue } from '../../models/Base';
import { I18nContext } from '../../models/Translation';
import styles from '../../styles/Weekly.module.less';

export type IssueCardProps = Issue & CardProps;

export const IssueCard: FC<IssueCardProps> = observer(({ className, ...issue }) => {
  const { t } = useContext(I18nContext);

  return (
    <Card className={`h-100 shadow-sm ${styles.issueCard} ${className}`}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Badge bg={issue.state === 'open' ? 'success' : 'secondary'}>
            {issue.state === 'open' ? t('open') : t('closed')}
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
            {issue.body.slice(0, 150)}
            {issue.body.length > 150 && '...'}
          </Card.Text>
        )}

        <div className="mt-auto">
          {issue.labels?.[0] && (
            <ul className="list-unstyled mb-2">
              {issue.labels.slice(0, 3).map((label, index) => (
                <Badge
                  key={index}
                  as="li"
                  bg="light"
                  text="dark"
                  className={`d-inline-block me-1 mb-1 ${styles.labelBadge}`}
                >
                  {typeof label === 'string' ? label : label.name}
                </Badge>
              ))}
              {issue.labels.length > 3 && (
                <Badge as="li" bg="light" text="dark" className="d-inline-block small">
                  +{issue.labels.length - 3}
                </Badge>
              )}
            </ul>
          )}

          <div
            className={`d-flex justify-content-between align-items-center text-small text-muted ${styles.authorInfo}`}
          >
            <span>
              {issue.user && (
                <>
                  {t('weekly_author')}: {issue.user.login}
                </>
              )}
            </span>
            <time dateTime={issue.created_at}>
              {new Date(issue.created_at).toLocaleDateString('zh-CN')}
            </time>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
});
