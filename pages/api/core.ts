import 'core-js/full/array/from-async';

import { Context, Middleware } from 'koa';
import { HTTPError } from 'koajax';
import { DataObject } from 'mobx-restful';
import { KoaOption, withKoa } from 'next-ssr-middleware';
import { ProxyAgent, setGlobalDispatcher } from 'undici';
import { parse } from 'yaml';

import { MDX_pattern } from '../../models/configuration';

const { HTTP_PROXY } = process.env;

if (HTTP_PROXY) setGlobalDispatcher(new ProxyAgent(HTTP_PROXY));

export const safeAPI: Middleware<any, any> = async (context: Context, next) => {
  try {
    return await next();
  } catch (error) {
    if (!(error instanceof HTTPError)) {
      console.error(error);

      context.status = 400;

      return (context.body = { message: (error as Error).message });
    }
    const { message, response } = error;
    let { body } = response;

    context.status = response.status;
    context.statusMessage = message;

    if (body instanceof ArrayBuffer)
      try {
        body = new TextDecoder().decode(new Uint8Array(body));

        body = JSON.parse(body);
      } catch {
        //
      }
    console.error(JSON.stringify(body, null, 2));

    context.body = body;
  }
};

export const withSafeKoa = <S, C>(...middlewares: Middleware<S, C>[]) =>
  withKoa<S, C>({} as KoaOption, safeAPI, ...middlewares);

export interface ArticleMeta {
  name: string;
  path?: string;
  meta?: DataObject;
  subs: ArticleMeta[];
}

export function splitFrontMatter(raw: string) {
  const [, frontMatter, markdown] =
    raw.trim().match(/^---[\r\n]([\s\S]+?[\r\n])---[\r\n]([\s\S]*)/) || [];

  if (!frontMatter) return { markdown: raw };

  try {
    const meta = parse(frontMatter) as DataObject;

    return { markdown, meta };
  } catch (error) {
    console.error(`Error parsing Front Matter:`, error);

    return { markdown };
  }
}

export async function* pageListOf(path: string, prefix = 'pages'): AsyncGenerator<ArticleMeta> {
  const { readdir, readFile } = await import('fs/promises');

  const list = await readdir(prefix + path, { withFileTypes: true });

  for (const node of list) {
    let { name, parentPath } = node;

    if (name.startsWith('.')) continue;

    const isMDX = MDX_pattern.test(name);

    name = name.replace(MDX_pattern, '');
    const path = `${parentPath}/${name}`.replace(new RegExp(`^${prefix}`), '');

    if (node.isFile() && isMDX) {
      const article: ArticleMeta = { name, path, subs: [] };

      const file = await readFile(`${parentPath}/${node.name}`, 'utf-8');

      const { meta } = splitFrontMatter(file);

      if (meta) article.meta = meta;

      yield article;
    }
    if (!node.isDirectory()) continue;

    const subs = await Array.fromAsync(pageListOf(path, prefix));

    if (subs[0]) yield { name, subs };
  }
}

export type TreeNode<K extends string> = {
  [key in K]: TreeNode<K>[];
};

export function* traverseTree<K extends string, N extends TreeNode<K>>(
  tree: N,
  key: K,
): Generator<N> {
  for (const node of tree[key] || []) {
    yield node as N;
    yield* traverseTree(node as N, key);
  }
}

/**
 * Get markdown file list from a directory and its subdirectories, sorted by date descending
 *
 * @param path - Directory path to search
 * @param prefix - Path prefix (default: 'pages')
 * @returns - Sorted list of articles
 */
export async function getMarkdownListSortedByDate(
  path: string,
  prefix = 'pages',
): Promise<ArticleMeta[]> {
  const data = await Array.fromAsync(pageListOf(path, prefix));

  return data
    .map(root => [...traverseTree(root, 'subs')])
    .flat()
    .filter((event): event is ArticleMeta => 'meta' in event)
    .sort((a, b) => {
      const dateA = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
      const dateB = b.meta?.date ? new Date(b.meta.date).getTime() : 0;

      return dateB - dateA;
    });
}
