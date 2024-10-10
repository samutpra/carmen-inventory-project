import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

/* todo : fix it */
export interface IRoleUser extends IBasePimaryKey, IBaseTable {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IRoleUserCreate extends Partial<IRoleUser> {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IRoleUserUpdate extends Partial<IRoleUser> {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}
