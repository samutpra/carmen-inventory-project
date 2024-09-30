export interface IBasePimaryKey {
  id: string;
}

export class BasePrimaryKey implements IBasePimaryKey {
  id: string;
}

export interface IBaseTable {
  create_On: Date;
  update_On: Date;
}

export class BaseTable implements IBaseTable {
  create_On: Date;
  update_On: Date;
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

export interface Money {
  amount: number;
  currency: string;
}

export const Default_PerPage: number = 10; //default perpage
