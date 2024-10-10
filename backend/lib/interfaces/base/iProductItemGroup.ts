import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

import { IProductSubCategory } from './iProductSubCategory';

export interface IProductItemGroup extends IBasePimaryKey, IBaseTable {
  name: string;
  productSubCategoryId: string;
  description?: string;
  isActive: boolean;
}

export interface IProductItemGroupCreate extends Partial<IProductItemGroup> {
  name: string;
  productSubCategoryId: string;
  description?: string;
  isActive: boolean;
}

export interface IProductItemGroupUpdate extends Partial<IProductItemGroup> {
  id: string;
  name?: string;
  productSubCategoryId?: string;
  description?: string;
  isActive?: boolean;
}
