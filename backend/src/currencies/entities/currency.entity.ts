import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBasePimaryKey, IBaseTable, ICurrency } from 'lib/types';

@Entity()
export class Currency implements ICurrency, IBaseTable, IBasePimaryKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_On: Date;

  @Column()
  created_by: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  updated_On: Date;

  @Column()
  updated_by?: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  symbol: string;

  @Column({ nullable: true })
  description?: string | null;

  @Column('boolean', { default: true })
  isActive: boolean;
}
