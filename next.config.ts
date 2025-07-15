import NextMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync, statSync } from 'fs';
import { NextConfig } from 'next';
import setPWA from 'next-pwa';
// @ts-expect-error no official types
import withLess from 'next-with-less';
import RemarkFrontMatter from 'remark-frontmatter';
import RemarkGfm from 'remark-gfm';
import RemarkMdxFrontMatter from 'remark-mdx-frontmatter';
import { NormalModuleReplacementPlugin } from 'webpack';

const { NODE_ENV, CI, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = process.env;

const isDev = NODE_ENV === 'development';

const withMDX = NextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [RemarkFrontMatter, RemarkMdxFrontMatter, RemarkGfm],
  },
});

const withPWA = setPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
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

const nextConfig = withPWA(
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
      autoInstrumentServerFunctions: false,
      org: SENTRY_ORG,
      project: SENTRY_PROJECT,
      authToken: SENTRY_AUTH_TOKEN,
      silent: true,
    });
