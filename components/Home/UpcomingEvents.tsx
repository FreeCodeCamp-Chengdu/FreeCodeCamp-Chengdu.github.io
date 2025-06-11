import Link from 'next/link';
import { FC } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { ArticleMeta } from '../../pages/api/core';
import { SectionTitle } from './SectionTitle';

interface UpcomingEventsProps {
  events: ArticleMeta[];
}

export const UpcomingEvents: FC<UpcomingEventsProps> = ({ events }) => (
  <div className="py-5 bg-white w-100 m-0">
    <Container>
      <SectionTitle>近期活动</SectionTitle>
      <Row className="g-4" xs={1} sm={2} md={3}>
        {events.map(({ name, meta, path }) => (
          <Col key={name}>
            <Card>
              <Card.Body>
                <Card.Title className="text-dark">{name}</Card.Title>
                <Card.Text className="text-dark">
                  时间: {meta?.start || 'N/A'}
                </Card.Text>
                <Card.Text className="text-dark">
                  地点: {meta?.address || 'N/A'}
                </Card.Text>

                <Link href={path || '#'} className="btn btn-primary">
                  查看详情
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Button variant="outline-primary" size="lg" href="/article/Activity">
          查看全部活动 →
        </Button>
      </div>
    </Container>
  </div>
);
