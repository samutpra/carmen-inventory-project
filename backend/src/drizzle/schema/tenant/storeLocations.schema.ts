import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { departments } from './departments.schema';
import { tenantSchema } from '../const';

export const storeLocations = tenantSchema().table('store_locations', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  code: varchar({ length: 256 }).notNull(),
  departmentId: uuid()
    .references(() => departments.id)
    .notNull(),
  isActive: boolean().notNull(),
  ...columns_created,
  ...columns_updated,
});
