import Link from 'next/link';
import { Button,Card, Col, Container, Row } from 'react-bootstrap';

export const UpcomingEvents = () => (
  <Container className="my-5">
    <h2 className="text-center mb-4">即将举行的活动</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>活动标题 1</Card.Title>
            <Card.Text>时间: 2025年3月20日</Card.Text>
            <Card.Text>地点: 成都某咖啡馆</Card.Text>
            <a href="#" className="btn btn-primary">
              查看详情
            </a>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>活动标题 2</Card.Title>
            <Card.Text>时间: 2025年4月5日</Card.Text>
            <Card.Text>地点: 线上直播</Card.Text>
            <a href="#" className="btn btn-primary">
              查看详情
            </a>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <div className="text-center mt-4">
      <Link href="/events" passHref>
        <Button variant="outline-primary" size="lg">
          查看全部活动 →
        </Button>
      </Link>
    </div>
  </Container>
);
