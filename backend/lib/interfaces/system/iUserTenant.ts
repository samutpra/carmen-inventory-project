import { IBasePimaryKey, IBaseTable } from '../base/iBase';

/* todo : fix it */
export interface IUserTenant extends IBasePimaryKey, IBaseTable {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IUserTenantCreate extends Partial<IUserTenant> {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IUserTenantUpdate extends Partial<IUserTenant> {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}
