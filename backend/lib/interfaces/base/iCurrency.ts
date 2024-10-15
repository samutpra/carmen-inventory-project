import { IBaseActivity, IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface ICurrency extends IBasePimaryKey, IBaseTable, IBaseActivity {
  name: string;
  code: string;
  symbol?: string;
  description?: string;
  isActive: boolean;
}

export interface ICurrencyCreate extends Partial<ICurrency> {
  name: string;
  code: string;
  symbol?: string;
  description?: string;
  isActive: boolean;
}

export interface ICurrencyUpdate extends Partial<ICurrency> {
  id: string;
  name?: string;
  code?: string;
  symbol?: string;
  description?: string;
  isActive?: boolean;
}
