import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

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
            <Card body>
              <Card.Title className="text-dark">{name}</Card.Title>
              <Card.Text className="text-dark">
                {t('activity_time')}: {meta?.start || 'N/A'}
              </Card.Text>
              <Card.Text className="text-dark">
                {t('activity_location')}: {meta?.address || 'N/A'}
              </Card.Text>

              <Link href={path || '#'} className="btn btn-primary">
                {t('view_details')}
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline-primary" size="lg" href="/activity">
          {t('view_all_activities')} →
        </Button>
      </div>
    </>
  );
});
