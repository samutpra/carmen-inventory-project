import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

import { enumPurchaseRequestItemStatus } from 'lib/enums';

export interface IPurchaseRequestItem extends IBasePimaryKey, IBaseTable {
  location: string;
  name: string;
  description: string;
  unit: string;
  quantityRequested: number;
  quantityApproved: number;

  deliveryDate: Date;
  deliveryPoint: string;

  currencyId: string;
  currencyRate: number;

  price: number;
  foc: number;

  netAmount: number;
  adjustment: boolean;

  discountRate: number;
  discountAmount: number;

  taxRate: number;
  taxAmount: number;

  totalAmount: number;
  vendor: string;
  pricelistNumber: string;
  comment: string;

  accountCode: string;
  jobCode: string;

  status?: enumPurchaseRequestItemStatus;

  inventoryInfo: {
    onHand(): number;
    onOrdered(): number;
    reorderLevel(): number;
    restockLevel(): number;
    averageMonthlyUsage(): number;
    lastPrice(): number;
    lastOrderDate(): Date;
    lastVendor(): string;
  };
}
