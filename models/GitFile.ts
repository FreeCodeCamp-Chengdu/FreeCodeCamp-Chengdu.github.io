import { components } from '@octokit/openapi-types';
import { githubClient } from 'mobx-github';
import { Filter,ListModel } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { GithubSearchData,makeGithubSearchCondition } from './Base';

export type GitFile = components['schemas']['code-search-result-item'];

export type GitFileFilter = Filter<GitFile>;

export class GitFileSearchModel extends ListModel<GitFile, GitFileFilter> {
  baseURI = 'search/code';
  client = githubClient;

  async loadPage(
    page = this.pageIndex,
    per_page = this.pageSize,
    { repository: repo, path, language }: GitFileFilter,
  ) {
    const queryMap = { repo, in: ['path', 'file'], language },
      keyword = path;
    const condition = makeGithubSearchCondition(queryMap);

    const { body } = await this.client.get<GithubSearchData<GitFile>>(
      `${this.baseURI}?${buildURLData({ page, per_page, q: `${condition} ${keyword}` })}`,
    );

    return { pageData: body!.items, totalCount: body!.total_count };
  }
}
