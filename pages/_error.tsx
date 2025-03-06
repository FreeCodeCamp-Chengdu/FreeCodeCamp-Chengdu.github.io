import * as Sentry from '@sentry/nextjs';
import { parseCookie, parseLanguageHeader } from 'mobx-i18n';
import type { NextPage } from 'next';
import type { ErrorProps } from 'next/error';
import Error from 'next/error';

import { NotFoundCard } from '../components/Layout/NotFoundCard';
import { i18n } from '../models/Translation';

const CustomErrorComponent: NextPage<ErrorProps> = props => (
  <>
    <Error {...props} />

    <NotFoundCard {...props} />
  </>
);
const enableSentry =
  process.env.NODE_ENV === 'development' || !process.env.SENTRY_AUTH_TOKEN;

CustomErrorComponent.getInitialProps = async contextData => {
  const { 'accept-language': acceptLanguage, cookie = '' } =
    contextData.req!.headers;
  const { language } = parseCookie(cookie),
    languages = parseLanguageHeader(acceptLanguage || '');

  await i18n.loadLanguages([language, ...languages].filter(Boolean));

  if (enableSentry) await Sentry.captureUnderscoreErrorException(contextData);

  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
