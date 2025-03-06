import { ComponentClass, FC } from 'react';
import { Col, Pagination, Row } from 'react-bootstrap';

import { SearchPageMeta } from '../../models/System';

export interface CardPageProps extends SearchPageMeta {
  Card: ComponentClass<any> | FC<any>;
  cardLinkOf?: (id: string) => string;
  pageLinkOf: (page: number) => string;
}

export const CardPage: FC<CardPageProps> = ({
  Card,
  cardLinkOf,
  currentPage,
  pageIndex,
  pageCount,
  pageLinkOf,
}) => (
  <>
    <Row className="g-3 my-3" xs={1} md={2} lg={3}>
      {currentPage.map(item => (
        <Col key={item.id as string}>
          <Card className="h-100" linkOf={cardLinkOf} {...item} />
        </Col>
      ))}
    </Row>

    <Pagination className="justify-content-center" size="lg">
      <Pagination.Prev
        href={pageLinkOf(pageIndex - 1)}
        disabled={pageIndex === 1}
      />
      <Pagination.Next
        href={pageLinkOf(pageIndex + 1)}
        disabled={pageIndex === pageCount}
      />
    </Pagination>
  </>
);
