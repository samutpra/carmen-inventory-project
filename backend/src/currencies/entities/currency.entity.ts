import { IBaseTable, IBasePimaryKey } from 'src/_types/_IBaseTable';
import { ICurrency } from 'src/_types/currency';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency implements ICurrency, IBaseTable, IBasePimaryKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  create_On: Date;

  @Column()
  update_On: Date;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  symbol: string;

  @Column({ nullable: true })
  description?: string | null;

  @Column()
  isActive: boolean;
}
