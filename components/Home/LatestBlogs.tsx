import Link from 'next/link';
import { Button,Card, Col, Container, Row } from 'react-bootstrap';

export const LatestBlogs = () => (
  <Container className="my-5">
    <h2 className="text-center mb-4">最新博客文章</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>如何学习 TypeScript？</Card.Title>
            <Card.Text>发布日期: 2025年3月10日</Card.Text>
            <a href="#" className="btn btn-secondary">
              阅读文章
            </a>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>React 18 新特性</Card.Title>
            <Card.Text>发布日期: 2025年2月25日</Card.Text>
            <a href="#" className="btn btn-secondary">
              阅读文章
            </a>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <div className="text-center mt-4">
      <Link href="/blog" passHref>
        <Button variant="outline-primary" size="lg">
          查看全部文章 →
        </Button>
      </Link>
    </div>
  </Container>
);
