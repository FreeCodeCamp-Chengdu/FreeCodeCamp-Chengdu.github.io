import { Issue } from 'mobx-github';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { Badge, Card, CardProps } from 'react-bootstrap';

import { I18nContext } from '../../models/Translation';
import styles from './IssueCard.module.less';
import { LabelBar } from './LabelBar';

export type IssueCardProps = Omit<Issue, 'id'> & Omit<CardProps, 'body'>;

export const IssueCard: FC<IssueCardProps> = observer(
  ({ className = '', number, title, labels, body, user, created_at, state }) => {
    const { t } = useContext(I18nContext);

    return (
      <Card className={`shadow-sm ${styles.issueCard} ${className}`}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Badge bg={state === 'open' ? 'success' : 'secondary'}>
            {state === 'open' ? t('open') : t('closed')}
          </Badge>
          <small className="text-muted">#{number}</small>
        </Card.Header>

        <Card.Body className="d-flex flex-column gap-3">
          <Card.Title className="h5">
            <a
              href={`/weekly/${number}`}
              className={`text-decoration-none text-dark ${styles.issueTitle}`}
            >
              {title}
            </a>
          </Card.Title>

          {body && (
            <Card.Text className="text-muted flex-grow-1">
              {body.slice(0, 150)}
              {body.length > 150 && '...'}
            </Card.Text>
          )}
          {labels?.[0] && <LabelBar labels={labels} />}
        </Card.Body>

        <Card.Footer
          className={`d-flex justify-content-between align-items-center small text-muted ${styles.authorInfo}`}
        >
          <span>{user && `${t('weekly_author')}: ${user.login}`}</span>

          <time dateTime={created_at}>{new Date(created_at).toLocaleDateString('zh-CN')}</time>
        </Card.Footer>
      </Card>
    );
  },
);
