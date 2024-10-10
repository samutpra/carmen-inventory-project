import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

import { enumGRNItemStatus } from 'lib/enums';

export interface IGRNItem extends IBasePimaryKey, IBaseTable {
  refNo: string;
  poLineId: string;
  itemId: string;
  storeLocationId: string;
  baseReceivedQty: number;
  receivedQty: number;
  receivedUnitId: string;
  isFOC: boolean;
  basePrice: number;
  price: number;
  taxAmount: number;
  totalAmount: number;
  status: enumGRNItemStatus;
  deliveryPoint?: string;
  extraCost: number;
  totalCost: number;
  discountAdjustment: boolean;
  discountAmount?: number;
  taxAdjustment: boolean;
  lotNumber?: string;
  expiryDate?: Date;
  comment?: string;
}
