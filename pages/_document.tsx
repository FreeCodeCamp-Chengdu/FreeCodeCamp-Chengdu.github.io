import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

import { LanguageCode, parseSSRContext } from '../models/Translation';

interface CustomDocumentProps {
  language: LanguageCode;
  colorScheme: 'light' | 'dark';
}

export default class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    return {
      ...(await Document.getInitialProps(context)),
      ...parseSSRContext<CustomDocumentProps>(context, ['language']),
    };
  }

  render() {
    const { language, colorScheme } = this.props;

    return (
      <Html lang={language} data-bs-theme={colorScheme}>
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <link rel="manifest" href="/manifest.json" />
          <script src="https://polyfill.web-cell.dev/feature/PWAManifest.js" />

          <link
            rel="stylesheet"
            href="https://unpkg.com/bootstrap@5.3.6/dist/css/bootstrap.min.css"
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
}
