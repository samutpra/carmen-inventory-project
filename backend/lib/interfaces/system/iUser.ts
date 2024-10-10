import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface IUser extends IBasePimaryKey, IBaseTable {
  name: string;
  email: string;
  isActive: boolean;
}

export interface IUserCreate extends Partial<IUser> {
  name: string;
  email: string;
  isActive: boolean;
}

export interface IUserUpdate extends Partial<IUser> {
  id: string;
  name?: string;
  email?: string;
  isActive?: boolean;
}
