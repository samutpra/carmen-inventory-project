import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IBasePimaryKey,
  IBaseTable,
  IProduct,
  IUnitConversion,
} from 'lib/types';

@Entity()
export class Product implements IProduct, IBaseTable, IBasePimaryKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  localDescription: string;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column()
  productCategoryId: string;

  @Column()
  productSubCategoryId: string;

  @Column()
  productItemGroupId: string;

  @Column()
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_On: Date;

  @Column()
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_On: Date;

  @Column()
  updated_by: string;
}
