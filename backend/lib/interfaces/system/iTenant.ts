import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface ITenant extends IBasePimaryKey, IBaseTable {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ITenantCreate extends Partial<ITenant> {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ITenantUpdate extends Partial<ITenant> {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}
