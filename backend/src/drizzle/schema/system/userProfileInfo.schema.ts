import { PgTable, PgTableFn, jsonb, uuid, varchar } from 'drizzle-orm/pg-core';
import { columns_created, columns_updated } from '../column.helper';

import { systemSchema } from '../const';
import { users } from './users.schema';

export const userProfileInfo = systemSchema().table('user_profile_info', {
  id: uuid()
    .references(() => users.id)
    .unique()
    .notNull(),
  firstName: varchar({ length: 256 }).notNull(),
  middleName: varchar({ length: 256 }).notNull(),
  lastName: varchar({ length: 256 }).notNull(),
  nickName: varchar({ length: 256 }).notNull(),
  metaInfo: jsonb().notNull(),
  ...columns_created,
  ...columns_updated,
});
