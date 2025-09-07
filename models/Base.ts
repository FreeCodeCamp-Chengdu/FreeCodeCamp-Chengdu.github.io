import 'core-js/full/array/from-async';

import { HTTPClient } from 'koajax';
import { githubClient, Issue as GitHubIssue, RepositoryModel } from 'mobx-github';
import { TableCellAttachment, TableCellMedia, TableCellValue } from 'mobx-lark';
import { DataObject } from 'mobx-restful';
import { isEmpty } from 'web-utility';

import { API_Host, GithubToken, isServer, LARK_API_HOST, ProxyBaseURL } from './configuration';

export const ownClient = new HTTPClient({
  baseURI: `${API_Host}/api/`,
  responseType: 'json',
});

export const larkClient = new HTTPClient({
  baseURI: LARK_API_HOST,
  responseType: 'json',
});

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      Authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };

  return next();
});

export { githubClient };
export type { GitHubIssue as Issue };

export const githubRawClient = new HTTPClient({
  baseURI: `${ProxyBaseURL}/raw.githubusercontent.com/`,
  responseType: 'arraybuffer',
});

export interface GithubSearchData<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export const makeGithubSearchCondition = (queryMap: DataObject) =>
  Object.entries(queryMap)
    .filter(([, value]) => !isEmpty(value))
    .map(([key, value]) => `${key}:${value}`)
    .join(' ');

export const repositoryStore = new RepositoryModel('idea2app');

type UploadedFile = Record<'originalname' | 'filename' | 'location', string>;
/**
 * @see {@link https://fakeapi.platzi.com/en/rest/files/}
 */
export async function upload(file: Blob) {
  const form = new FormData();
  form.append('file', file);

  const { body } = await larkClient.post<UploadedFile>(
    'https://api.escuelajs.co/api/v1/files/upload',
    form,
  );

  return body!.location;
}

export function fileURLOf(field: TableCellValue, cache = false) {
  if (!(field instanceof Array) || !field[0]) return field + '';

  const file = field[0] as TableCellMedia | TableCellAttachment;

  let URI = `/api/Lark/file/${'file_token' in file ? file.file_token : file.attachmentToken}/${file.name}`;

  if (cache) URI += '?cache=1';

  return URI;
}
