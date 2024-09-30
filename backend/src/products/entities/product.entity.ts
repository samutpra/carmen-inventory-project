import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IBasePimaryKey,
  IBaseTable,
  IProduct,
  IUnitConversion,
} from 'src/interfaces';

@Entity()
export class Product implements IProduct, IBaseTable, IBasePimaryKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  productCode: string;

  @Column()
  localDescription: string;

  @Column()
  categoryId: string;

  @Column()
  subCategoryId: string;

  @Column()
  itemGroupId: string;

  @Column()
  primaryInventoryUnitId: string;

  @Column()
  size?: string;
  @Column()
  color?: string;
  @Column()
  barcode?: string;
  @Column()
  isActive: boolean;

  @Column('numeric')
  basePrice: number;

  @Column()
  currencyId: string;

  @Column()
  taxType: string;

  @Column()
  taxRate: number;

  @Column()
  standardCost: number;

  @Column()
  lastCost: number;

  @Column()
  priceDeviationLimit: number;

  @Column()
  quantityDeviationLimit: number;

  @Column()
  minStockLevel: number;

  @Column()
  maxStockLevel: number;

  @Column()
  isForSale: boolean;

  @Column()
  isIngredient: boolean;

  @Column()
  weight?: number;

  // dimensions?: { length: number; width: number; height: number };

  @Column()
  shelfLife?: number;

  @Column()
  storageInstructions?: string;

  @Column()
  imageUrl?: string;

  @Column()
  preferVendor?: string;

  @Column()
  unitConversions?: IUnitConversion[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  create_On: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  update_On: Date;
}
