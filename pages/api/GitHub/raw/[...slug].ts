import { fileTypeFromBuffer } from 'file-type';
import { Context } from 'koa';
import { githubClient } from 'mobx-github';
import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';

import { safeAPI } from '../../core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.all('/(.*)', safeAPI, async (context: Context) => {
  const { method, url, headers, body } = context;

  delete headers.host;

  const path = `https://raw.githubusercontent.com/${url!.slice(`/api/GitHub/raw/`.length)}`;

  const { status, body: data } = await githubClient.request<ArrayBuffer>({
    // @ts-expect-error KoAJAX type compatibility
    method,
    path,
    // @ts-expect-error KoAJAX type compatibility
    headers,
    body: body || undefined,
    responseType: 'arraybuffer',
  });
  const { mime } = (await fileTypeFromBuffer(data!)) || {};

  context.status = status;
  context.set('Content-Type', mime || 'application/octet-stream');
  context.body = data;
});

export default withKoaRouter(router);
