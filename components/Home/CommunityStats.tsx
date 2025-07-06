import { Card, Col, Container, Row } from 'react-bootstrap';

import { SectionTitle } from './SectionTitle';

export const CommunityStats = () => (
  <div className="py-5 bg-white w-100 m-0">
    <Container className="text-center">
      <SectionTitle>社区数据</SectionTitle>

      <Row className="justify-content-center">
        {[
          { number: '1000+', label: '社区成员' },
          { number: '50+', label: '举办活动' },
          { number: '200+', label: '技术文章' },
          { number: '30+', label: '开源项目' },
        ].map(({ number, label }) => (
          <Col key={label} xs={12} sm={6} md={3} className="mb-3">
            <Card className="border-0 shadow-sm p-3" body>
              <strong className="text-dark">{number}</strong>

              <h3 className="mb-0 text-dark">{label}</h3>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
);
