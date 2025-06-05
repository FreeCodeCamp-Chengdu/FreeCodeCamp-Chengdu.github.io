import '../styles/globals.less';

import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { Container, Image } from 'react-bootstrap';

import { MDXLayout } from '../components/Layout/MDXLayout';
import { MainNavigator } from '../components/Navigator/MainNavigator';
import { isServer } from '../models/Base';
import { t } from '../models/Translation';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

globalThis.addEventListener?.('unhandledrejection', ({ reason }) => {
  const { message, response } = reason as HTTPError;
  const { statusText, body } = response || {};

  const tips = body?.message || statusText || message;

  if (tips) alert(tips);
});

const AppShell: FC<AppProps> = observer(({ Component, pageProps, router }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <MainNavigator />

    {router.route.startsWith('/article/') ? (
      <MDXLayout title={router.route.split('/').at(-1)}>
        <Component {...pageProps} />
      </MDXLayout>
    ) : (
      <Component {...pageProps} />
    )}

    <footer className="section-wrapper border-top py-4">
      <Container className="d-flex justify-content-center align-items-center">
        <a
          className="d-flex justify-content-center align-items-center"
          href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('powered_by')}
          <span className="mx-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Container>
    </footer>
  </>
));

export default AppShell;
