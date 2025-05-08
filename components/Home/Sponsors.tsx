import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ArticleMeta } from '../../pages/api/core';

interface SponsorsProps {
  sponsors: ArticleMeta[];
}

export const Sponsors: React.FC<SponsorsProps> = ({ sponsors }) => (
  <Container className="my-5">
    <h2 className="text-center mb-4">赞助商与合作伙伴</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      {sponsors.map((sponsor) => (
        <Col key={sponsor.name}>
          <Card>
            <Card.Body>
              <Card.Title>{sponsor.name}</Card.Title>
              <Card.Text>{sponsor.meta?.description || '暂无描述'}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

    <div className="text-center mt-4">
      <Button variant="outline-primary" size="lg" href="/article/Partner">
        成为赞助商 →
      </Button>
    </div>
  </Container>
);
