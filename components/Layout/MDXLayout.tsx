import { FC } from 'react';
import { Container, ContainerProps } from 'react-bootstrap';

import { PageHead } from './PageHead';

export const MDXLayout: FC<ContainerProps> = ({
  className = 'mt-5 pt-5 pb-3',
  title,
  children,
  ...props
}) => (
  <Container as="article" {...props} className={className}>
    <PageHead title={title} />
    <h1 className="my-4">{title}</h1>

    {children}
  </Container>
);
