import 'dotenv/config';

import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { productSubCategories } from './productSubCategories.schema';

export const productItemGroups = pgTable('product_item_groups', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  description: varchar({ length: 256 }),
  productSubCategoryId: uuid()
    .references(() => productSubCategories.id)
    .notNull(),
  isActive: boolean().notNull(),
  ...columns_created,
  ...columns_updated,
});
