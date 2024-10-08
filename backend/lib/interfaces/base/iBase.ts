import { IMoney } from './iMoney';

export interface IBasePimaryKey {
  id: string;
}

export class BasePrimaryKey implements IBasePimaryKey {
  id: string;
}

export interface IBaseTable {
  created_On: Date;
  created_by: string;
  updated_On?: Date;
  updated_by?: string;
  deleted_On?: Date;
  deleted_by?: string;
  isDeleted?: boolean;
}

export class BaseTable implements IBaseTable {
  created_On: Date;
  created_by: string;
  updated_On?: Date;
  updated_by?: string;
  deleted_On?: Date;
  deleted_by?: string;
  isDeleted?: boolean;
}

export interface IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export class ResponseList<T> implements IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export interface IResponseSingle<T> {
  data: T;
}

export class ResponseSingle<T> implements IResponseSingle<T> {
  data: T;
}

export interface IResponseId<T> {
  id: T;
}

export class ResponseId<T> implements IResponseId<T> {
  id: T;
}

export interface IPagination {
  page?: number | 0;
  pages?: number | 0;
  perPage?: number | 10;
  total?: number | 0;
}

export class Pagination implements IPagination {
  page?: number | 0;
  pages?: number | 0;
  perPage?: number | 10;
  total?: number | 0;
}

export const Default_PerPage: number = 10; //default perpage
