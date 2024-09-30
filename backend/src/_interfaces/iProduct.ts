import { IUnitConversion } from './iUnitconversion';

export interface IProduct {
  name: string;

  price: number;
  description: string;

  productCode: string;
  localDescription: string;

  categoryId: string;
  subCategoryId: string;
  itemGroupId: string;
  primaryInventoryUnitId: string;

  size?: string;
  color?: string;
  barcode?: string;
  isActive: boolean;

  basePrice: number;
  currencyId: string;
  taxType: string;
  taxRate: number;
  standardCost: number;
  lastCost: number;

  priceDeviationLimit: number;
  quantityDeviationLimit: number;
  minStockLevel: number;
  maxStockLevel: number;
  isForSale: boolean;
  isIngredient: boolean;

  weight?: number;

  // dimensions?: { length: number; width: number; height: number };

  shelfLife?: number;
  storageInstructions?: string;
  imageUrl?: string;
  preferVendor?: string;
  unitConversions?: IUnitConversion[];
}
