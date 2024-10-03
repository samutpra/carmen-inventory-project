import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IBasePimaryKey,
  IBaseTable,
  IDepartment,
  IStoreLocation,
} from 'lib/types';

@Entity()
export class StoreLocation
  implements IStoreLocation, IBaseTable, IBasePimaryKey
{
  name: string;
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  updated_On: Date;

  @Column()
  updated_by: string;
}
