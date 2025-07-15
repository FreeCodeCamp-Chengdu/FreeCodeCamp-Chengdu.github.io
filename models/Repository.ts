import { Repository, RepositoryModel, UserModel } from 'mobx-github';
import { Filter, ListModel, toggle } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { githubClient, githubRawClient, GithubSearchData, makeGithubSearchCondition } from './Base';

export class GitRepositoryModel extends RepositoryModel {
  @toggle('downloading')
  async downloadRaw(
    path: string,
    repository = this.currentOne.name,
    ref = this.currentOne.default_branch,
  ) {
    const owner = this.owner || (await userStore.getSession()).login;
    const identity = `${owner}/${repository}`;

    if (!ref) {
      const { default_branch } = await this.getOne(identity);

      ref = default_branch;
    }
    const { body } = await githubRawClient.get<ArrayBuffer>(`${identity}/${ref}/${path}`);

    return body!;
  }
}

export const userStore = new UserModel();
export const repositoryStore = new GitRepositoryModel('kaiyuanshe');

export type RepositoryFilter = Filter<Repository>;

export class RepositorySearchModel extends ListModel<Repository, RepositoryFilter> {
  baseURI = 'search/repositories';
  client = githubClient;

  async loadPage(page = this.pageIndex, per_page = this.pageSize, { full_name }: RepositoryFilter) {
    const name = full_name?.split('/').at(-1);

    const queryMap = { in: name ? 'name' : undefined },
      keyword = name;
    const condition = makeGithubSearchCondition(queryMap);

    const { body } = await this.client.get<GithubSearchData<Repository>>(
      `${this.baseURI}?${buildURLData({ page, per_page, q: `${condition} ${keyword}` })}`,
    );

    return { pageData: body!.items, totalCount: body!.total_count };
  }
}
