import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'idea-react';
import { FC } from 'react';

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

      <Row className="g-4" cols={1} sm={2} md={3}>
        {articles.map(({ name, meta, path }) => (
          <Col key={name}>
            <Card>
              <CardBody>
                <CardTitle className="text-dark">
                  {meta?.title || name.replace(MD_pattern, '')}
                </CardTitle>
                <CardText className="text-dark">发布日期: {meta?.date || '未知日期'}</CardText>
                <Button href={path?.replace(MD_pattern, '') || '#'} theme="secondary">
                  阅读文章
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline" theme="primary" size="lg" href="/article">
          查看全部文章 →
        </Button>
      </div>
    </Container>
  </div>
);
