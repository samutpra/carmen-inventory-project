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
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column()
  updatedBy?: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_On?: Date;

  @Column({ nullable: true })
  deleted_By?: string;

  @Column()
  isDeleted?: boolean;
}
