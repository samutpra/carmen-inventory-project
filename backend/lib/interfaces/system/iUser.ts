import { IBasePimaryKey, IBaseTable } from '../base/iBase';

export interface IUser extends IBasePimaryKey, IBaseTable {
  name: string;
  email: string;
  isActive: string;
}

export interface IUserCreate extends Partial<IUser> {
  name: string;
  email: string;
  isActive: string;
}

export interface IUserUpdate extends Partial<IUser> {
  id: string;
  name?: string;
  email?: string;
  isActive?: string;
}
