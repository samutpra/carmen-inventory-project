import { IBasePimaryKey, IBaseTable } from './iBase';

import { IUnit } from './iUnit';

export interface IProductInfo extends IBasePimaryKey, IBaseTable {
  productId: string;

  primaryInventoryUnitId: string;
  primaryInventoryUnit?: IUnit[];
  primaryOrderUnitId: string;
  primaryOrderUnit?: IUnit[];
  primaryRecipeUnitId: string;
  primaryRecipeUnit: IUnit[];
  primaryCountingUnitId: string;
  primaryCountingUnit: IUnit[];

  imageUrl?: string;

  standardCost: number;
  lastCost: number;

  taxType: string;
  taxRate: number;

  preferVendor?: string;
  priceDeviationLimit: number;
  quantityDeviationLimit: number;

  minStockLevel: number;
  maxStockLevel: number;

  isForSale: boolean;
  isIngredient: boolean;

  attributes: {
    dimensions?: { length?: number; width?: number; height?: number };
    size?: string;
    color?: string;
    shelfLife?: number;
    storageInstructions?: string;
    weight?: number;
  };
}

export interface IProductInfoCreate extends Partial<IProductInfo> {
  productId: string;
}

export interface IProductInfoUpdate extends Partial<IProductInfo> {
  productId: string;
}
