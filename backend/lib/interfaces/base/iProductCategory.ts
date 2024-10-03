import { IBasePimaryKey, IBaseTable } from './iBase';

export interface IProductCategory extends IBasePimaryKey, IBaseTable {
  name: string;
  description?: string;
  isActive: boolean;
}
export interface IProductCategoryCreate extends Partial<IProductCategory> {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IProductCategoryUpdate extends Partial<IProductCategory> {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}
