import Link from 'next/link';
import { Button,Card, Col, Container, Row } from 'react-bootstrap';

export const Sponsors = () => (
  <Container className="my-5">
    <h2 className="text-center mb-4">赞助商与合作伙伴</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>企业 A</Card.Title>
            <Card.Text>领先的技术公司，支持开源社区。</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>企业 B</Card.Title>
            <Card.Text>专注于智能具身领域的创新公司。</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <div className="text-center mt-4">
      <Link href="/partners" passHref>
        <Button variant="outline-primary" size="lg">
          成为赞助商 →
        </Button>
      </Link>
    </div>
  </Container>
);
