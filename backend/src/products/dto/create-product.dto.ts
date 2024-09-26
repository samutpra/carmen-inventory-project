import { IUnitConversion } from 'src/_types/unitconversion';
import { Product } from '../entities/product.entity';

export class CreateProductDto implements Product {
  id: string;
  create_On: Date;
  update_On: Date;
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
  currency: string;
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
  shelfLife?: number;
  storageInstructions?: string;
  imageUrl?: string;
  preferVendor?: string;
  unitConversions?: IUnitConversion[];
}
