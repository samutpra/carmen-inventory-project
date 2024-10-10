import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

import { PurchaseOrderItem } from './iPurchaseOrderItem';
import { enumPurchaseOrderStatus } from 'lib/enums';

export interface PurchaseOrder extends IBasePimaryKey, IBaseTable {
  id: string;
  number: string;
  vendorId: string;

  orderDate: Date;
  DeliveryDate?: Date;

  status: enumPurchaseOrderStatus;

  currencyId: string;
  exchangeRate: number;

  notes?: string;

  approvedBy?: string;
  approvalDate?: Date;

  email: string;
  buyer: string;

  creditTerms: string;
  description: string;
  remarks: string;
  items?: PurchaseOrderItem[];
}
