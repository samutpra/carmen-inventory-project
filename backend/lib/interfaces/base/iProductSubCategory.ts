import { IBasePimaryKey, IBaseTable } from './iBase';

import { IProductCategory } from './iProductCategory';

export interface IProductSubCategory extends IBasePimaryKey, IBaseTable {
  name: string;
  productCategoryId: string;
  productCategory: IProductCategory;
  description?: string;
  isActive: boolean;
}

export interface IProductSubCategoryCreate
  extends Partial<IProductSubCategory> {
  name: string;
  productCategoryId: string;
  description?: string;
  isActive: boolean;
}

export interface IProductSubCategoryUpdate
  extends Partial<IProductSubCategory> {
  id: string;
  name?: string;
  productCategoryId?: string;
  description?: string;
  isActive?: boolean;
}
