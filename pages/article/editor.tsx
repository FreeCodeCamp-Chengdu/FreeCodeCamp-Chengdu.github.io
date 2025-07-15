import { compose } from 'next-ssr-middleware';
import { Container } from 'react-bootstrap';

import { ArticleEditor } from '../../components/Git/ArticleEditor';
import { PageHead } from '../../components/Layout/PageHead';
import { githubOAuth } from '../api/GitHub/core';

export const getServerSideProps = compose(githubOAuth);

export default function EditorPage() {
  return (
    <Container className="mt-5 pt-4">
      <PageHead title="Git Pager" />
      <h1>Git Pager</h1>

      <ArticleEditor />
    </Container>
  );
}
