import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { IUnit } from 'lib/interfaces';

export class Unit implements IUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
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
