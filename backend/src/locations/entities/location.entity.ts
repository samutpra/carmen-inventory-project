import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBasePimaryKey, IBaseTable, ILocation } from 'src/interfaces';

@Entity()
export class Location implements ILocation, IBaseTable, IBasePimaryKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  create_On: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  update_On: Date;

  @Column()
  code: string;
}
