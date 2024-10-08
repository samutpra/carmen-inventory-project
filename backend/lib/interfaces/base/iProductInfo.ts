import { IBasePimaryKey, IBaseTable } from './iBase';

import { IUnit } from './iUnit';

export interface IProductInfo extends IBasePimaryKey, IBaseTable {
  productId: string;

  primaryInventoryUnitId: string;
  primaryOrderUnitId: string;
  OrderUnit?: IUnit[];
  primaryRecipeUnitId: string;
  RecipeUnit?: IUnit[];
  primaryCountingUnitId: string;
  CountingUnit?: IUnit[];

  taxType: string;
  taxRate: number;

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
  standardCost?: number;
  lastCost?: number;
  preferVendor?: string;
  priceDeviationLimit?: number;
  quantityDeviationLimit?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface IProductInfoCreate extends Partial<IProductInfo> {
  productId: string;
  primaryInventoryUnitId: string;
  primaryOrderUnitId: string;
  primaryRecipeUnitId: string;
  primaryCountingUnitId: string;
  taxType: string;
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

export interface IProductInfoUpdate extends Partial<IProductInfo> {
  id: string; // id is required for update
  productId: string;
  primaryInventoryUnitId?: string;
  primaryOrderUnitId?: string;
  primaryRecipeUnitId?: string;
  primaryCountingUnitId?: string;
  taxType?: string;
  isForSale?: boolean;
  isIngredient?: boolean;
  attributes?: {
    dimensions?: { length?: number; width?: number; height?: number };
    size?: string;
    color?: string;
    shelfLife?: number;
    storageInstructions?: string;
    weight?: number;
  };
  standardCost?: number;
  lastCost?: number;
  preferVendor?: string;
  priceDeviationLimit?: number;
  quantityDeviationLimit?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  imageUrl?: string;
}
