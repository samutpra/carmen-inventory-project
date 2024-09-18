export interface Currency {
  code: string;
  description: string;
  active: boolean;
}

export interface CurrencyList {
  total: number;
  currencies: Currency[];
}
