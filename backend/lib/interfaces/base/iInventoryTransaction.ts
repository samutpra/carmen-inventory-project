import { IBasePimaryKey, IBaseTable } from './iBase';

import { enumTransactionType } from 'lib/enums';

export interface IInventoryTransaction extends IBasePimaryKey, IBaseTable {
  transactionId: number;
  itemId: number;
  locationId: number;
  transactionType: enumTransactionType;
  quantity: number;
  unitCost: number;
  totalCost: number;
  transactionDate: Date;
  referenceNo?: string;
  referenceType?: string;
  userId: string;
  notes?: string;
}
