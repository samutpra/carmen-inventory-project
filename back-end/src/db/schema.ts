import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  index,
  pgSchema,
} from 'drizzle-orm/pg-core';

const schemaName = process.env.DRIZZLE_SCHEMA || 'public';
const schemaPrefix = (tableName: string) => `${schemaName}.${tableName}`;

export const schema = pgSchema(schemaName);

export const tenantTable = pgTable('tenant', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SelectTenant = typeof tenantTable.$inferSelect;
export type InsertTenant = typeof tenantTable.$inferInsert;

export const currencyTable = pgTable('currency', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 3 }).unique().notNull(),
  name: varchar('name').notNull(),
  symbol: varchar('symbol').notNull(),
  exchangeRate: numeric('exchange_rate').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// export const exchangeRateHistory = pgTable(schemaPrefix('exchange_rate_history'), {
//   id: uuid('id').primaryKey().defaultRandom(),
//   currencyId: uuid(schemaPrefix('currency_id')).references(() =>  currency.id).notNull(),
//   exchangeRate: numeric('exchange_rate').notNull(),
//   timestamp: timestamp('timestamp').defaultNow().notNull(),
// }, (table) => ({
//   currencyIdIdx: index(schemaPrefix('currency_id_idx')).on( table.currencyId),
// }));

export type SelectCurrency = typeof currencyTable.$inferSelect;
export type InsertCurrency = typeof currencyTable.$inferInsert;

// export type SelectExchangeRateHistory = typeof exchangeRateHistory.$inferSelect;
// export type InsertExchangeRateHistory = typeof exchangeRateHistory.$inferInsert;
