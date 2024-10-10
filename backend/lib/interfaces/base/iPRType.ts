import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface IPRType extends IBasePimaryKey, IBaseTable {
  name: string;
  description: string;
  isActive: boolean;
}

export interface IPRTypeCreate extends Partial<IPRType> {
  name: string;
  description: string;
  isActive: boolean;
}

export interface IPRTypeUpdate extends Partial<IPRType> {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}
