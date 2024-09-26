export interface IBasePimaryKey {
  id: string;
}

export interface IBaseTable {
  create_On: Date;
  update_On: Date;
}

export interface Money {
  amount: number;
  currency: string;
}

export const K_PerPage: number = 10; //default perpage
