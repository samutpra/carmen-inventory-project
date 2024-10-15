import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { tenantSchema } from '../const';

const departments = tenantSchema().table('departments', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  code: varchar({ length: 256 }).notNull(),
  isActive: boolean().notNull(),
  ...columns_created,
  ...columns_updated,
});

export { departments };
