import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IStoreLocation } from 'lib/interfaces';

@Entity()
export class StoreLocation implements IStoreLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  departmentId: string;

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
