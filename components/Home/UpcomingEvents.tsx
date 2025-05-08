import Link from 'next/link';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ArticleMeta } from '../../pages/api/core';

interface UpcomingEventsProps {
  events: ArticleMeta[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => (
  <Container className="my-5">
    <h2 className="text-center mb-4">往期活动</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      {events.map((event) => (
        <Col key={event.name}>
          <Card>
            <Card.Body>
              <Card.Title>{event.meta?.title}</Card.Title>
              <Card.Text>时间: {event.meta?.start || 'void 0'}</Card.Text>
              <Card.Text>地点: {event.meta?.address || 'void 0'}</Card.Text>
              {/* TODO: 无 Path 不渲染 */}
              <Link href={event.path || '#'} className="btn btn-primary">
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
);
