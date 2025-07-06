import { FC } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { ArticleMeta } from '../../pages/api/core';
import { SectionTitle } from './SectionTitle';

interface SponsorsProps {
  sponsors: ArticleMeta[];
}

export const Sponsors: FC<SponsorsProps> = ({ sponsors }) => (
  <div className="py-5 w-100 m-0 bg-light">
    <Container>
      <SectionTitle>赞助商</SectionTitle>

      <Row className="g-4" xs={1} sm={2} md={3}>
        {sponsors.map(({ name, meta }) => (
          <Col key={name}>
            <Card body>
              <Card.Title className="text-dark">{name}</Card.Title>
              <Card.Text className="text-dark">
                {meta?.description || '暂无描述'}
              </Card.Text>
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
