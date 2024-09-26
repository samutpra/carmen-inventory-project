export interface ICurrency {
  name: string;
  code: string;
  symbol: string;
  description?: string | null;
  isActive: boolean;
}
