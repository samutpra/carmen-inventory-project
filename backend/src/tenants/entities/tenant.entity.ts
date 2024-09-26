import { IBaseTable, IBasePimaryKey } from 'src/_types/_IBaseTable';
import { ITenant } from 'src/_types/tenant';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tenants')
export class Tenant implements ITenant, IBaseTable, IBasePimaryKey {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_On: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_On: Date;
}
