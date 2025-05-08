import Link from 'next/link';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ArticleMeta } from '../../pages/api/core';

interface LatestBlogsProps {
  articles: ArticleMeta[];
}

export const LatestBlogs: React.FC<LatestBlogsProps> = ({ articles }) => (
  <Container className="my-5">
    <h2 className="text-center mb-4">最新博客文章</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      {articles.map((article) => (
        <Col key={article.name}>
          <Card>
            <Card.Body>
              <Card.Title>{article.name}</Card.Title>
              <Card.Text>
                发布日期: {article.meta?.date || '未知日期'}
              </Card.Text>
              <Link href={article.path || '#'} className="btn btn-secondary">
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
);
