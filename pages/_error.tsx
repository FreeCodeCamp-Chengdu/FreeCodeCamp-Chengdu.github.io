import * as Sentry from '@sentry/nextjs';
import type { NextPageContext } from 'next';
import Error from 'next/error';

import { NotFoundCard } from '../components/Layout/NotFoundCard';
import {
  createI18nStore,
  I18nContext,
  I18nProps,
  loadSSRLanguage,
} from '../models/Translation';

const enableSentry =
  process.env.NODE_ENV === 'development' || !process.env.SENTRY_AUTH_TOKEN;

export default class CustomError extends Error<I18nProps> {
  static async getInitialProps(context: NextPageContext) {
    if (enableSentry) await Sentry.captureUnderscoreErrorException(context);

    return {
      ...(await Error.getInitialProps(context)),
      ...(await loadSSRLanguage(context)),
    };
  }

  i18nStore = createI18nStore(this.props.language, this.props.languageMap);

  render() {
    const { props, i18nStore } = this;

    return (
      <I18nContext.Provider value={i18nStore}>
        <Error {...props} />
        <NotFoundCard {...props} />
      </I18nContext.Provider>
    );
  }
}
