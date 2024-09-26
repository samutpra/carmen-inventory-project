export interface IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  page?: number | 0;
  pages?: number | 0;
  perPage?: number | 10;
  total?: number | 0;
}
