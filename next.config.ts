import NextMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync, statSync } from 'fs';
import setPWA from 'next-pwa';
// @ts-expect-error no official types
import withLess from 'next-with-less';
import RemarkFrontMatter from 'remark-frontmatter';
import RemarkGfm from 'remark-gfm';
import RemarkMdxFrontMatter from 'remark-mdx-frontmatter';
import webpack from 'webpack';

const { NODE_ENV, CI, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } =
  process.env;
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

const nextConfig = withPWA(
  withLess(
    withMDX({
      output: CI ? 'standalone' : undefined,
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      transpilePackages: ['@sentry/browser'],

      webpack: config => {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
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
      },
      rewrites: async () => ({
        beforeFiles: [],
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
      }),
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
