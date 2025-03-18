import { HTTPError } from 'koajax';
import { DataObject } from 'mobx-restful';
import { NextApiRequest, NextApiResponse } from 'next';
import { ProxyAgent, setGlobalDispatcher } from 'undici';
import { parse } from 'yaml';

const { HTTP_PROXY } = process.env;

if (HTTP_PROXY) setGlobalDispatcher(new ProxyAgent(HTTP_PROXY));

export type NextAPI = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<any>;

export function safeAPI(handler: NextAPI): NextAPI {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        console.error(error);

        res.status(400);

        return res.send({ message: (error as Error).message });
      }
      const { message, response } = error;
      let { body } = response;

      res.status(response.status);
      res.statusMessage = message;

      if (body instanceof ArrayBuffer)
        try {
          body = new TextDecoder().decode(new Uint8Array(body));
          console.error(body);

          body = JSON.parse(body);
          console.error(body);
        } catch {
          //
        }
      res.send(body);
    }
  };
}

export interface ArticleMeta {
  name: string;
  path?: string;
  meta?: DataObject;
  subs: ArticleMeta[];
}

const MDX_pattern = /\.mdx?$/;

export async function frontMatterOf(path: string) {
  const { readFile } = await import('fs/promises');

  const file = await readFile(path, 'utf-8');

  const [, frontMatter] = file.match(/^---[\r\n]([\s\S]+?[\r\n])---/) || [];

  return frontMatter && parse(frontMatter);
}

export async function* pageListOf(
  path: string,
  prefix = 'pages',
): AsyncGenerator<ArticleMeta> {
  const { readdir } = await import('fs/promises');

  const list = await readdir(prefix + path, { withFileTypes: true });

  for (const node of list) {
    let { name, path } = node;

    if (name.startsWith('.')) continue;

    const isMDX = MDX_pattern.test(name);

    name = name.replace(MDX_pattern, '');
    path = `${path}/${name}`.replace(new RegExp(`^${prefix}`), '');

    if (node.isFile())
      if (isMDX) {
        const article: ArticleMeta = { name, path, subs: [] };
        try {
          const meta = await frontMatterOf(`${node.path}/${node.name}`);

          if (meta) article.meta = meta;
        } catch (error) {
          console.error(error);
        }
        yield article;
      } else continue;

    if (!node.isDirectory()) continue;

    const subs = await Array.fromAsync(pageListOf(path, prefix));

    if (subs[0]) yield { name, subs };
  }
}

export type TreeNode<K extends string> = {
  [key in K]: TreeNode<K>[];
};

export function* traverseTree<K extends string>(
  tree: TreeNode<K>,
  key: K,
): Generator<TreeNode<K>> {
  for (const node of tree[key] || []) {
    yield node;
    yield* traverseTree(node, key);
  }
}
