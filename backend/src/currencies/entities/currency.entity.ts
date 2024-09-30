import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBasePimaryKey, IBaseTable, ICurrency } from 'src/interfaces';

@Entity()
export class Currency implements ICurrency, IBaseTable, IBasePimaryKey {
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

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  create_On: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  update_On: Date;
}
