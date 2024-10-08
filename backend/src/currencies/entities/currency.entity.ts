import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ICurrency } from 'lib/interfaces';

@Entity()
export class Currency implements ICurrency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
