import * as Sentry from '@sentry/nextjs';

import { dataCollection } from './sentry.options';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  dataCollection,
  tracesSampleRate: 1.0,
});
