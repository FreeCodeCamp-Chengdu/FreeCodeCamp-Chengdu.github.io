import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';

import { safeAPI } from '../core';
import { proxyGitHubAll } from './core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.get('/(.*)', safeAPI, proxyGitHubAll);

export default withKoaRouter(router);
