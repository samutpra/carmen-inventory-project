import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface IDepartment extends IBasePimaryKey, IBaseTable {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IDepartmentCreate extends Partial<IDepartment> {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IDepartmentUpdate extends Partial<IDepartment> {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}
