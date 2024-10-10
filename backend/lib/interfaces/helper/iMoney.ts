export interface IMoney {
  amount: number;
  currency: string;
}

export class Money implements IMoney {
  amount: number;
  currency: string;
}
