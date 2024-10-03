import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBasePimaryKey, IBaseTable, ITenant } from 'lib/types';

@Entity('tenants')
export class Tenant implements ITenant, IBaseTable, IBasePimaryKey {
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
  updated_On: Date;

  @Column()
  updated_by: string;
}
