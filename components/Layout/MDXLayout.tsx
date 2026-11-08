import { Container, ContainerProps } from 'idea-react';
import { FC } from 'react';

import { PageHead } from './PageHead';

export const MDXLayout: FC<ContainerProps> = ({ title, children, ...props }) => (
  <Container {...props}>
    <link rel="stylesheet" href="https://unpkg.com/github-markdown-css@5.9.0/github-markdown.css" />

    <PageHead title={title} />
    <h1 className="my-4">{title}</h1>

    <article className="markdown-body p-6">{children}</article>
  </Container>
);
