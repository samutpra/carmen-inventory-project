import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IExchangeRate } from 'lib/interfaces';

@Entity()
export class ExchangeRate implements IExchangeRate {
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
  updated_On?: Date;

  @Column()
  updated_by?: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_On?: Date;

  @Column({ nullable: true })
  deleted_by?: string;

  @Column()
  isDeleted?: boolean;
}
