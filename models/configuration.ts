import { parseCookie } from 'web-utility';

export const isServer = () => typeof window === 'undefined';

export const MD_pattern = /\.(md|markdown)$/i,
  MDX_pattern = /\.mdx?$/i;

export const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY,
  DefaultImage = process.env.NEXT_PUBLIC_LOGO!;

export const { VERCEL, VERCEL_URL } = process.env;

export const API_Host = isServer()
  ? VERCEL_URL
    ? `https://${VERCEL_URL}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const CACHE_HOST = process.env.NEXT_PUBLIC_CACHE_HOST!;

export const ProxyBaseURL = 'https://2025.fcc-cd.dev/proxy';

export const GithubToken = (globalThis.document && parseCookie().token) || process.env.GITHUB_TOKEN;

export const LARK_API_HOST = `${API_Host}/api/Lark/`;

export const LarkAppMeta = {
  host: process.env.NEXT_PUBLIC_LARK_API_HOST,
  id: process.env.NEXT_PUBLIC_LARK_APP_ID!,
  secret: process.env.LARK_APP_SECRET!,
};
