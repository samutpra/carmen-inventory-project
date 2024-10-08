import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ITenant } from 'lib/interfaces';

@Entity('tenants')
export class Tenant implements ITenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

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
