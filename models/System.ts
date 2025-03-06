import { BiSearchModelClass } from 'mobx-lark';
import { BaseModel } from 'mobx-restful';

export type SearchPageMeta = Pick<
  InstanceType<BiSearchModelClass>,
  'pageIndex' | 'currentPage' | 'pageCount'
>;

export class SystemModel extends BaseModel {
  searchMap: Record<string, BiSearchModelClass> = {};
}

export default new SystemModel();
