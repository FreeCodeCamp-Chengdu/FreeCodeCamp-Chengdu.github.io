import { spawnSync } from 'node:child_process';

import NextMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs/config';
import withSerwistInit from '@serwist/next';
import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync, statSync } from 'fs';
import { NextConfig } from 'next';
// @ts-expect-error no official types
import withLess from 'next-with-less';
import RemarkFrontMatter from 'remark-frontmatter';
import RemarkGfm from 'remark-gfm';
import RemarkMdxFrontMatter from 'remark-mdx-frontmatter';
import { NormalModuleReplacementPlugin } from 'webpack';

const { NODE_ENV, CI, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = process.env;

const isDev = NODE_ENV === 'development';

const { stdout, stderr } = spawnSync('git', ['rev-parse', 'HEAD'], {
  encoding: 'utf8',
});
const { GITHUB_SHA, VERCEL_GIT_COMMIT_SHA } = process.env;
const revision = stdout.trim() || VERCEL_GIT_COMMIT_SHA || GITHUB_SHA || crypto.randomUUID();

if (!stdout.trim())
  console.warn(
    `Falling back to random UUID for Serwist revision: ${
      stderr.trim() || 'Git revision is unavailable'
    }`,
  );

const withMDX = NextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [RemarkFrontMatter, RemarkMdxFrontMatter, RemarkGfm],
  },
});

const withSerwist = withSerwistInit({
  swSrc: 'service-worker.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/', revision }],
});

const webpack: NextConfig['webpack'] = config => {
  config.plugins.push(
    new NormalModuleReplacementPlugin(/^node:/, resource => {
      resource.request = resource.request.replace(/^node:/, '');
    }),
  );

  if (
    statSync('pages/article', {
      throwIfNoEntry: false,
    })?.isDirectory() &&
    readdirSync('pages/article')[0]
  )
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'pages/article',
            to: 'static/article',
          },
        ],
      }),
    );

  return config;
};

const rewrites: NextConfig['rewrites'] = async () => ({
  beforeFiles: [
    {
      source: '/proxy/github.com/:path*',
      destination: 'https://github.com/:path*',
    },
    {
      source: '/proxy/raw.githubusercontent.com/:path*',
      destination: 'https://raw.githubusercontent.com/:path*',
    },
    {
      source: '/proxy/geo.datav.aliyun.com/:path*',
      destination: 'https://geo.datav.aliyun.com/:path*',
    },
  ],
  afterFiles: [],
  fallback: [
    {
      source: '/article/:path*',
      destination: `/_next/static/article/:path*`,
      has: [
        {
          type: 'header',
          key: 'Accept',
          value: '.*(image|audio|video|application)/.*',
        },
      ],
    },
  ],
});

const nextConfig = withSerwist(
  withLess(
    withMDX({
      output: CI ? 'standalone' : undefined,
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      transpilePackages: ['@sentry/browser'],

      webpack,
      rewrites,
    }),
  ),
);

export default isDev || !SENTRY_AUTH_TOKEN
  ? nextConfig
  : withSentryConfig(nextConfig, {
      webpack: {
        autoInstrumentServerFunctions: false,
      },
      org: SENTRY_ORG,
      project: SENTRY_PROJECT,
      authToken: SENTRY_AUTH_TOKEN,
      silent: true,
    });
