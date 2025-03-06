import { LarkPageData, TableRecord, TableRecordData } from 'mobx-lark';
import { DataObject } from 'mobx-restful';

import { proxyLark } from '../../core';

function filterData(fields: DataObject) {
  for (const key of Object.keys(fields))
    if (!/^\w+$/.test(key)) delete fields[key];
}

export default proxyLark((URI, data) => {
  const [path] = URI.split('?');

  if (path.endsWith('/records')) {
    const list =
      (data as LarkPageData<TableRecord<DataObject>>).data!.items || [];

    for (const { fields } of list) filterData(fields);
  } else if (path.split('/').at(-2) === 'records') {
    const { record } = (data as TableRecordData<DataObject>).data!;

    filterData(record.fields);
  }
  return data;
});
