import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const columns_created = {
  created_On: timestamp().defaultNow().notNull(),
  created_By: uuid().notNull(),
};

export const columns_updated = {
  updated_On: timestamp(),
  updated_By: uuid(),
};
