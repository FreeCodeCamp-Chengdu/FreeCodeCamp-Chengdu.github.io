import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  CardText,
  CardTitle,
} from 'idea-react';
import { Issue } from 'mobx-github';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import styles from './IssueCard.module.less';
import { LabelBar } from './LabelBar';

export type IssueCardProps = Omit<Issue, 'id'> & Omit<CardProps, 'body'>;

export const IssueCard: FC<IssueCardProps> = observer(
  ({ className = '', number, title, labels, body, user, created_at, state }) => {
    const { t } = useContext(I18nContext);

    return (
      <Card className={`shadow-sm ${styles.issueCard} ${className}`}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <Badge theme={state === 'open' ? 'success' : 'secondary'}>
            {state === 'open' ? t('open') : t('closed')}
          </Badge>
          <small className="text-body-secondary">#{number}</small>
        </CardHeader>

        <CardBody className="d-flex flex-column gap-3">
          <CardTitle className="h5">
            <a
              href={`/weekly/${number}`}
              className={`text-decoration-none text-dark ${styles.issueTitle}`}
            >
              {title}
            </a>
          </CardTitle>

          {body && (
            <CardText className="text-body-secondary flex-grow-1">
              {body.slice(0, 150)}
              {body.length > 150 && '...'}
            </CardText>
          )}
          {labels?.[0] && <LabelBar labels={labels} />}
        </CardBody>

        <CardFooter
          className={`d-flex justify-content-between align-items-center small text-body-secondary ${styles.authorInfo}`}
        >
          <span>{user && `${t('weekly_author')}: ${user.login}`}</span>

          <time dateTime={created_at}>{new Date(created_at).toLocaleDateString('zh-CN')}</time>
        </CardFooter>
      </Card>
    );
  },
);
