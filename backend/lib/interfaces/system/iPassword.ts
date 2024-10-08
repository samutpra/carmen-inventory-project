import { IBasePimaryKey, IBaseTable } from '../base';

export interface IPassword extends IBasePimaryKey, IBaseTable {
  userId: string; // foreign key
  hash: string;
  expired_on?: Date;
}

export interface IPasswordCreate extends Partial<IPassword> {
  userId: string; // foreign key
  hash: string;
  expired_on?: Date;
}

export interface IPasswordUpdate extends Partial<IPassword> {
  id: string;
  userId: string; // foreign key
  hash?: string;
  expired_on?: Date;
}
