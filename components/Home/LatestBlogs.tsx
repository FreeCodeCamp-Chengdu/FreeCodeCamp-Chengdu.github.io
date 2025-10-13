import { FC } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { MD_pattern } from '../../models/configuration';
import { ArticleMeta } from '../../pages/api/core';
import { SectionTitle } from './SectionTitle';

interface LatestBlogsProps {
  articles: ArticleMeta[];
}

export const LatestBlogs: FC<LatestBlogsProps> = ({ articles }) => (
  <div className="py-5 w-100 m-0 bg-light">
    <Container>
      <SectionTitle>最新文章</SectionTitle>

      <Row className="g-4" xs={1} sm={2} md={3}>
        {articles.map(({ name, meta, path }) => (
          <Col key={name}>
            <Card body>
              <Card.Title className="text-dark">
                {meta?.title || name.replace(MD_pattern, '')}
              </Card.Title>
              <Card.Text className="text-dark">发布日期: {meta?.date || '未知日期'}</Card.Text>
              <Button href={path?.replace(MD_pattern, '') || '#'} variant="secondary">
                阅读文章
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline-primary" size="lg" href="/article">
          查看全部文章 →
        </Button>
      </div>
    </Container>
  </div>
);
