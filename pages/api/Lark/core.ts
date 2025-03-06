import { marked } from 'marked';
import {
  LarkApp,
  LarkData,
  normalizeText,
  TableCellLocation,
  TableCellText,
  TableCellValue,
} from 'mobx-lark';

import { safeAPI } from '../core';

export const lark = new LarkApp({
  host: process.env.LARK_API_HOST,
  id: process.env.LARK_APP_ID!,
  secret: process.env.LARK_APP_SECRET!,
});

export interface TableFormViewItem
  extends Record<'name' | 'description' | 'shared_url', string>,
    Record<'shared' | 'submit_limit_once', boolean> {
  shared_limit: 'tenant_editable';
}
export type LarkFormData = LarkData<{ form: TableFormViewItem }>;

export const normalizeTextArray = (list: TableCellText[]) =>
  list.reduce(
    (sum, item) => {
      if (item.text === ',') sum.push('');
      else sum[sum.length - 1] += normalizeText(item);

      return sum;
    },
    [''],
  );

export const normalizeMarkdownArray = (list: TableCellText[]) =>
  normalizeTextArray(list).map(text => marked(text) as string);

export function coordinateOf(location: TableCellValue): [number, number] {
  const [longitude, latitude] =
    (location as TableCellLocation)?.location.split(',') || [];

  return [+latitude, +longitude];
}

export const proxyLark = <T extends LarkData>(
  dataFilter?: (path: string, data: T) => T,
) =>
  safeAPI(async ({ method, url, headers, body }, response) => {
    await lark.getAccessToken();

    delete headers.host;

    const path = url!.slice(`/api/Lark/`.length);

    const { status, body: data } = await lark.client.request<T>({
      // @ts-expect-error Type compatibility issue
      method,
      path,
      // @ts-expect-error Type compatibility issue
      headers,
      body: body || undefined,
    });

    response.status(status);

    response.send(dataFilter?.(path, data!) || data);
  });
