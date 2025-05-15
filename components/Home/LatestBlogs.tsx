import Link from 'next/link';
import { FC } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import { ArticleMeta } from '../../pages/api/core';

interface LatestBlogsProps {
  articles: ArticleMeta[];
}

export const LatestBlogs: FC<LatestBlogsProps> = ({ articles }) => (
  <div className="py-5">
    <Container>
      <h2 className="text-center mb-4 text-dark">最新博客文章</h2>
      <div className="d-flex justify-content-center mb-4">
        <div
          className="border-bottom border-warning"
          style={{ width: '60px', borderBottomWidth: '3px !important' }}
         />
      </div>
      <Row className="g-4" xs={1} sm={2} md={3}>
        {articles.map(({ name, meta, path }) => (
          <Col key={name}>
            <Card>
              <Card.Body>
                <Card.Title className="text-dark">{name}</Card.Title>
                <Card.Text className="text-dark">
                  发布日期: {meta?.date || '未知日期'}
                </Card.Text>
                <Link href={path || '#'} className="btn btn-secondary">
                  阅读文章
                </Link>
              </Card.Body>
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
