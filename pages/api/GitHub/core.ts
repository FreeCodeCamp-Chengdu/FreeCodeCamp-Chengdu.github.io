import { Context, Middleware } from 'koa';
import { githubOAuth2 } from 'next-ssr-middleware';

import { githubClient } from '../../../models/Base';
import { ProxyBaseURL, VERCEL } from '../../../models/configuration';

export const proxyGithub = async <T>({
  method,
  url,
  headers: { host, authorization, 'content-length': _, ...headers },
  request,
}: Context) => {
  const path = url!.slice(`/api/GitHub/`.length),
    body = Reflect.get(request, 'body');

  // @ts-expect-error KoAJAX type compatibility
  return githubClient.request<T>({ method, path, headers, body });
};

export const proxyGitHubAll: Middleware = async context => {
  const { status, body } = await proxyGithub(context);

  context.status = status;
  context.body = body;
};

const client_id = process.env.GITHUB_OAUTH_CLIENT_ID!,
  client_secret = process.env.GITHUB_OAUTH_CLIENT_SECRET!;

export const githubOAuth = githubOAuth2({
  rootBaseURL: VERCEL ? undefined : `${ProxyBaseURL}/github.com/`,
  client_id,
  client_secret,
  scopes: ['user', 'repo'],
});
