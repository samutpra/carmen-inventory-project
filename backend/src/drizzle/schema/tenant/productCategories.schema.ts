import 'dotenv/config';

import {
  PgSchema,
  boolean,
  pgSchema,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { tenantSchema } from '../const';

export const productCategories = tenantSchema().table('product_categories', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }),
  isActive: boolean().notNull(),
  ...columns_created,
  ...columns_updated,
});
