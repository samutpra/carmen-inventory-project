import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBasePimaryKey, IBaseTable, IExchangeRate } from 'lib/types';

@Entity()
export class ExchangeRate implements IExchangeRate, IBaseTable, IBasePimaryKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  currencyId: string;

  @Column()
  atDate: Date;

  @Column()
  rate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_On: Date;

  @Column()
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_On: Date;

  @Column()
  updated_by: string;
}
