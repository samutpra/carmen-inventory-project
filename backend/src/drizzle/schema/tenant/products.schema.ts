import 'dotenv/config';

import { PgTable, boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { productItemGroups } from './productItemGroups.schema';
import { tenantSchema } from '../const';

export const products = tenantSchema().table('products', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  code: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }).notNull(),
  localDescription: varchar({ length: 256 }),
  productItemGroupId: uuid().references(() => productItemGroups.id),
  isActive: boolean().notNull(),
  ...columns_created,
  ...columns_updated,
});
