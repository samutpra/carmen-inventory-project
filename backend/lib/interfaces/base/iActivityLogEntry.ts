import { IBasePimaryKey, IBaseTable } from './iBase';

export interface IActivityLogEntry extends IBasePimaryKey, IBaseTable {
  module: string;
  log: string;
}

export interface IActivityLogEntryCreate extends Partial<IActivityLogEntry> {
  // id: string;
  log: string;
  module: string;
}

export interface IActivityLogEntryUpdate extends Partial<IActivityLogEntry> {
  log?: string;
  module?: string;
}
