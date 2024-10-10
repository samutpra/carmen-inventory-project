import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface IActivityLog extends IBasePimaryKey, IBaseTable {
  module: string;
  log: string;
}

export interface IActivityLogCreate extends Partial<IActivityLog> {
  // id: string;
  log: string;
  module: string;
}

export interface IActivityLogUpdate extends Partial<IActivityLog> {
  id: string;
  log?: string;
  module?: string;
}
