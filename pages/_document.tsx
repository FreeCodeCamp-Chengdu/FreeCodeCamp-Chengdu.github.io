import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <link rel="manifest" href="/manifest.json" />
        <script src="https://polyfill.web-cell.dev/feature/PWAManifest.js" />

        <link
          rel="stylesheet"
          href="https://bootswatch.com/5/quartz/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap-icons@1.13.1/font/bootstrap-icons.css"
        />
      </Head>

      <body className="d-flex flex-column min-vh-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
