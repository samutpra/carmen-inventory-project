import { IBasePimaryKey, IBaseTable } from '../base/iBase';

export interface IUserInfo extends IBasePimaryKey, IBaseTable {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
}

export interface IUserInfoCreate extends Partial<IUserInfo> {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
}

export interface IUserInfoUpdate extends Partial<IUserInfo> {
  id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
}
