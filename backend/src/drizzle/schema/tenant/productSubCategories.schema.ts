import 'dotenv/config';

import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { productCategories } from './productCategories.schema';

export const productSubCategories = pgTable('product_sub_categories', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  productCategoryId: uuid()
    .references(() => productCategories.id)
    .notNull(),
  description: varchar({ length: 256 }),
  isActive: boolean().notNull(),
  ...columns_created,
  ...columns_updated,
});
