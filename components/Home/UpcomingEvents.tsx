import { Button, Card, CardBody, CardText, CardTitle, Col, Row } from 'idea-react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { MD_pattern } from '../../models/configuration';
import { I18nContext } from '../../models/Translation';
import { ArticleMeta } from '../../pages/api/core';
import { SectionTitle } from './SectionTitle';

interface UpcomingEventsProps {
  events: ArticleMeta[];
}

export const UpcomingEvents: FC<UpcomingEventsProps> = observer(({ events }) => {
  const { t } = useContext(I18nContext);

  return (
    <>
      <SectionTitle>{t('upcoming_events')}</SectionTitle>

      <Row className="g-4" xs={1} sm={2} md={3}>
        {events.map(({ name, meta, path }) => (
          <Col key={name}>
            <Card>
              <CardBody>
                <CardTitle className="text-dark">
                  {meta?.title || name.replace(MD_pattern, '')}
                </CardTitle>
                <CardText className="text-dark">
                  {t('activity_time')}: {meta?.start || 'N/A'}
                </CardText>
                <CardText className="text-dark">
                  {t('activity_location')}: {meta?.address || 'N/A'}
                </CardText>

                <Link href={path?.replace(MD_pattern, '') || '#'} className="btn theme-primary">
                  {t('view_details')}
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline" theme="primary" size="lg" href="/activity">
          {t('view_all_activities')} →
        </Button>
      </div>
    </>
  );
});
