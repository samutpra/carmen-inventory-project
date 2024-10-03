import { IBasePimaryKey, IBaseTable } from './iBase';

export interface IUnit extends IBasePimaryKey, IBaseTable {
  name: string;
  isActive: boolean;
}
export interface IUnitCreate extends Partial<IUnit> {
  name: string;
  isActive: boolean;
}

export interface IUnitUpdate extends Partial<IUnit> {
  id: string;
  name?: string;
  isActive?: boolean;
}
