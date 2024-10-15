import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

import { ICommentAndAttachment } from '../helper/iCommentAndAttachment';

export interface PurchaseOrderItem extends IBasePimaryKey, IBaseTable {
  name: string;
  description: string;

  convertRate: number;

  orderedQty: number;
  orderUnit: string;

  baseQuantity: number;
  baseUnit: string;

  baseReceivingQty: number;
  receivedQty: number;
  remainingQty: number;

  unitPrice: number;
  totalPrice: number;

  status: string;
  isFOC: boolean;

  adjustments?: {
    discount?: boolean | false;
    tax?: boolean | false;
    price?: boolean | false;
  };

  taxRate: number;
  baseTaxAmount: number;
  taxAmount: number;

  discountRate: number;
  baseDiscountAmount: number;
  discountAmount: number;

  baseNetAmount?: number;
  netAmount?: number;

  baseTotalAmount?: number;
  totalAmount?: number;

  attachments?: ICommentAndAttachment[];
  comment?: string;
}
