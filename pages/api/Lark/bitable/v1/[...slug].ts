import { LarkPageData, TableRecord, TableRecordData } from 'mobx-lark';
import { DataObject } from 'mobx-restful';
import { createKoaRouter } from 'next-ssr-middleware';

import { withSafeKoaRouter } from '../../../core';
import { proxyLark, proxyLarkAll } from '../../core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

function filterData(fields: DataObject) {
  for (const key of Object.keys(fields))
    if (!/^\w+$/.test(key)) delete fields[key];
}

router.get('/apps/:app/tables/:table/records/:record', async context => {
  const { status, body } =
    await proxyLark<TableRecordData<DataObject>>(context);

  const { fields } = body!.data!.record;

  filterData(fields);

  context.status = status;
  context.body = body;
});

router.get('/apps/:app/tables/:table/records', async context => {
  const { status, body } =
    await proxyLark<LarkPageData<TableRecord<DataObject>>>(context);

  const list = body!.data!.items || [];

  for (const { fields } of list) filterData(fields);

  context.status = status;
  context.body = body;
});

router.all('/(.*)', proxyLarkAll);

export default withSafeKoaRouter(router);
