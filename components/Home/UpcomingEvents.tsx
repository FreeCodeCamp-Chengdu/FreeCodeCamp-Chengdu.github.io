import Link from 'next/link';
import { FC } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { ArticleMeta } from '../../pages/api/core';

interface UpcomingEventsProps {
  events: ArticleMeta[];
}

export const UpcomingEvents: FC<UpcomingEventsProps> = ({ events }) => (
  <div className="py-5 bg-white">
    <Container>
      <h2 className="text-center mb-4 text-dark">近期活动</h2>
      <div className="d-flex justify-content-center mb-4">
        <div
          className="border-bottom border-warning"
          style={{ width: '60px', borderBottomWidth: '3px !important' }}
         />
      </div>
      <Row className="g-4" xs={1} sm={2} md={3}>
        {events.map(({ name, meta, path }) => (
          <Col key={name}>
            <Card>
              <Card.Body>
                <Card.Title className="text-dark">{name}</Card.Title>
                <Card.Text className="text-dark">
                  时间: {meta?.start || 'void 0'}
                </Card.Text>
                <Card.Text className="text-dark">
                  地点: {meta?.address || 'void 0'}
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
