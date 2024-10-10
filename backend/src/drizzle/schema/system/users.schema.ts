import { boolean, uuid, varchar } from 'drizzle-orm/pg-core';

import { columns_updated } from '../column.helper';
import { systemSchema } from '../const';

export const users = systemSchema().table('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 256 }).unique().notNull(),
  email: varchar({ length: 256 }).notNull(),
  isActive: boolean().notNull(),
  ...columns_updated,
});
