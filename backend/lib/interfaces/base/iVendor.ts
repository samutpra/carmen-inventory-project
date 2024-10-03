import { IBasePimaryKey, IBaseTable } from './iBase';
export interface IVendor extends IBasePimaryKey, IBaseTable {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IVendorCreate extends Partial<IVendor> {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IVendorUpdate extends Partial<IVendor> {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}
