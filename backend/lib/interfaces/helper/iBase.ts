import { IActivityLog } from './iActivityLog';
import { ICommentAndAttachment } from './iCommentAndAttachment';

export interface IBasePimaryKey {
  id: string;
}

export class BasePrimaryKey implements IBasePimaryKey {
  id: string;
}

export interface IBaseTable {
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  // deletedAt?: Date;
  // deletedBy?: string;
  // isDeleted?: boolean;
}

export class BaseTable implements IBaseTable {
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  // deletedAt?: Date;
  // deletedBy?: string;
  // isDeleted?: boolean;
}

export interface IBaseComments {
  comments?: ICommentAndAttachment[];
}
export class BaseComments implements IBaseComments {
  comments?: ICommentAndAttachment[];
}

export interface IBaseActivity {
  activityLogs?: IActivityLog[];
}

export class BaseActivity implements IBaseActivity {
  activityLogs?: IActivityLog[];
}
