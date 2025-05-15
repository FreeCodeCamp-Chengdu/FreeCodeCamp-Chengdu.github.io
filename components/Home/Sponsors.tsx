import { FC } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { ArticleMeta } from '../../pages/api/core';

interface SponsorsProps {
  sponsors: ArticleMeta[];
}

export const Sponsors: FC<SponsorsProps> = ({ sponsors }) => (
  <div className="py-5">
    <Container>
      <h2 className="text-center mb-4 text-dark">赞助商与合作伙伴</h2>
      <div className="d-flex justify-content-center mb-4">
        <div
          className="border-bottom border-warning"
          style={{ width: '60px', borderBottomWidth: '3px !important' }}
         />
      </div>
      <Row className="g-4" xs={1} sm={2} md={3}>
        {sponsors.map(({ name, meta }) => (
          <Col key={name}>
            <Card>
              <Card.Body>
                <Card.Title className="text-dark">{name}</Card.Title>
                <Card.Text className="text-dark">
                  {meta?.description || '暂无描述'}
                </Card.Text>
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
  </div>
);
