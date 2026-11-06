import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'idea-react';
import { FC } from 'react';

import { MD_pattern } from '../../models/configuration';
import { ArticleMeta } from '../../pages/api/core';
import { SectionTitle } from './SectionTitle';

interface SponsorsProps {
  sponsors: ArticleMeta[];
}

export const Sponsors: FC<SponsorsProps> = ({ sponsors }) => (
  <div className="py-5 w-100 m-0 bg-light">
    <Container>
      <SectionTitle>赞助商</SectionTitle>

      <Row className="g-4" cols={1} sm={2} md={3}>
        {sponsors.map(({ name, meta }) => (
          <Col key={name}>
            <Card>
              <CardBody>
                <CardTitle className="text-dark">
                  {meta?.title || name.replace(MD_pattern, '')}
                </CardTitle>
                <CardText className="text-dark">{meta?.description || '暂无描述'}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline" theme="primary" size="lg" href="/article/Partner">
          成为赞助商 →
        </Button>
      </div>
    </Container>
  </div>
);
