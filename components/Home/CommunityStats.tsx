import { Card,Col, Container, Row } from 'react-bootstrap';

export const CommunityStats = () => (
  <Container className="my-5 text-center">
    <h2 className="mb-4">
      社区数据
    </h2>
    <Row className="justify-content-center">
      {[
        { number: '1000+', label: '社区成员' },
        { number: '50+', label: '举办活动' },
        { number: '200+', label: '技术文章' },
        { number: '30+', label: '开源项目' },
      ].map(({ number, label }) => (
        <Col key={label} xs={12} sm={6} md={3} className="mb-3">
          <Card className="border-0 shadow-sm p-3">
            <Card.Body>
              <h3 className="fw-bold">{number}</h3>
              <p className="mb-0">{label}</p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);
