import { IBasePimaryKey, IBaseTable } from './iBase';

import { IProductInfo } from './iProductInfo';

export interface IProduct extends IBasePimaryKey, IBaseTable {
  name: string;
  code: string;
  description: string;
  localDescription: string;

  barcode?: string;

  productCategoryId: string;
  productSubCategoryId: string;
  productItemGroupId: string;

  isActive: boolean;
}

export interface IProductCreate extends Partial<IProduct> {
  name: string;
  code: string;
  description: string;
  localDescription: string;
  productCategoryId: string;
  productSubCategoryId: string;
  productItemGroupId: string;
  isActive: boolean;

  ProductInfo?: IProductInfo;
}

export interface IProductUpdate extends Partial<IProduct> {
  id: string;
  code?: string;
  name?: string;
  description?: string;
  localDescription?: string;
  productCategoryId?: string;
  productSubCategoryId?: string;
  productItemGroupId?: string;
  isActive?: boolean;

  ProductInfo?: IProductInfo;
}
