import 'dotenv/config';

import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { productCategories } from './productCategories.schema';
import { tenantSchema } from '../const';

export const productSubCategories = tenantSchema().table(
  'product_sub_categories',
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 256 }).notNull(),
    productCategoryId: uuid()
      .references(() => productCategories.id)
      .notNull(),
    description: varchar({ length: 256 }),
    isActive: boolean().notNull(),
    ...columns_created,
    ...columns_updated,
  },
);
