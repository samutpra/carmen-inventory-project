import { IBasePimaryKey, IBaseTable } from './iBase';

export interface IVendorProduct extends IBasePimaryKey, IBaseTable {
  vendorId: string;
  productId: string;
  isActive: boolean;
}

export interface IVendorProductCreate extends Partial<IVendorProduct> {
  vendorId: string;
  productId: string;
  isActive: boolean;
}

export interface IVendorProductUpdate extends Partial<IVendorProduct> {
  id: string;
  vendorId?: string;
  productId?: string;
  isActive?: boolean;
}
