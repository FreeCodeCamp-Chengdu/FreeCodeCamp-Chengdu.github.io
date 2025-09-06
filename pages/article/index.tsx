import { observer } from 'mobx-react';
import { InferGetStaticPropsType } from 'next';
import { FC } from 'react';

import { MDXLayout } from '../../components/Layout/MDXLayout';
import { i18n } from '../../models/Translation';
import { ArticleMeta, pageListOf, traverseTree } from '../api/core';

export const getStaticProps = async () => {
  const tree = await Array.fromAsync(pageListOf('/article'));
  const list = tree.map(root => [...traverseTree(root, 'subs')]).flat();

  return { props: { tree, list } };
};

const renderTree = (list: ArticleMeta[]) => (
  <ol>
    {list.map(({ name, path, meta, subs }) => (
      <li key={path || name}>
        {path ? (
          <a
            className="h4 d-flex justify-content-between align-items-center"
            href={path}
          >
            {name}{' '}
            {meta && (
              <time className="fs-6" dateTime={meta.updated || meta.date}>
                {meta.updated || meta.date}
              </time>
            )}
          </a>
        ) : (
          <details>
            <summary className="h4">{name}</summary>
            {renderTree(subs)}
          </details>
        )}
      </li>
    ))}
  </ol>
);

const ArticleIndexPage: FC<InferGetStaticPropsType<typeof getStaticProps>> =
  observer(({ tree, list: { length } }) => (
    <MDXLayout className="" title={`${i18n.t('article')} (${length})`}>
      {renderTree(tree)}
    </MDXLayout>
  ));

export default ArticleIndexPage;
