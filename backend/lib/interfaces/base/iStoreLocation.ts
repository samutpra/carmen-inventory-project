import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface IStoreLocation extends IBasePimaryKey, IBaseTable {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  isActive: boolean;
}

export interface IStoreLocationCreate extends Partial<IStoreLocation> {
  code: string;
  name: string;
  departmentId: string;
  isActive: boolean;
}

export interface IStoreLocationUpdate extends Partial<IStoreLocationCreate> {
  id: string;
  code?: string;
  name?: string;
  departmentId?: string;
  isActive?: boolean;
}
