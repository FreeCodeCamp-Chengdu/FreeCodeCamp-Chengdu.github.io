import { fileTypeFromStream } from 'file-type';
import { Middleware } from 'koa';
import MIME from 'mime';
import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';
import { Readable } from 'stream';

import { CACHE_HOST } from '../../../../../models/configuration';
import { safeAPI } from '../../../core';
import { lark } from '../../core';

const router = createKoaRouter(import.meta.url);

const downloader: Middleware = async context => {
  const { method, url, params, query } = context;
  const { id, name } = params;

  if (query.cache) {
    const { pathname } = new URL(url!, `http://${context.headers.host}`);

    return context.redirect(new URL(pathname, CACHE_HOST) + '');
  }

  const token = await lark.getAccessToken();

  const response = await fetch(lark.client.baseURI + `drive/v1/medias/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { ok, status, headers, body } = response;

  if (!ok) {
    context.status = status;

    return (context.body = await response.json());
  }

  const mime = headers.get('Content-Type'),
    [stream1, stream2] = body!.tee();

  const contentType =
    !mime || mime.startsWith('application/octet-stream')
      ? MIME.getType(name! + '') || (await fileTypeFromStream(stream1))?.mime
      : mime;
  context.set('Content-Type', contentType || 'application/octet-stream');
  context.set('Content-Disposition', headers.get('Content-Disposition') || '');
  context.set('Content-Length', headers.get('Content-Length') || '');

  if (method === 'GET')
    // @ts-expect-error Web type compatibility
    context.body = Readable.fromWeb(stream2);
};

router.head('/:id/:name', safeAPI, downloader).get('/:id/:name', safeAPI, downloader);

export default withKoaRouter(router);
