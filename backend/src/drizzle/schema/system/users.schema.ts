import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { columns_updated } from '../column.helper';

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 256 }).unique().notNull(),
  email: varchar({ length: 256 }).notNull(),
  isActive: boolean().notNull(),
  ...columns_updated,
});
