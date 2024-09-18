import { pgTable, uuid, varchar, numeric, timestamp, index } from 'drizzle-orm/pg-core';

const schemaPrefix = (tableName: string) => `${process.env.DRIZZLE_SCHEMA || 'public'}.${tableName}`;

export const tenant = pgTable('tenant', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type SelectTenant = typeof tenant.$inferSelect;
export type InsertTenant = typeof tenant.$inferInsert;

// export const currency = pgTable(schemaPrefix('currency'), {
//   id: uuid('id').primaryKey().defaultRandom(),
//   code: varchar('code', { length: 3 }).unique().notNull(),
//   name: varchar('name').notNull(),
//   symbol: varchar('symbol').notNull(),
//   exchangeRate: numeric('exchange_rate').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// export const exchangeRateHistory = pgTable(schemaPrefix('exchange_rate_history'), {
//   id: uuid('id').primaryKey().defaultRandom(),
//   currencyId: uuid(schemaPrefix('currency_id')).references(() =>  currency.id).notNull(),
//   exchangeRate: numeric('exchange_rate').notNull(),
//   timestamp: timestamp('timestamp').defaultNow().notNull(),
// }, (table) => ({
//   currencyIdIdx: index(schemaPrefix('currency_id_idx')).on( table.currencyId),
// }));

// export type SelectCurrency = typeof currency.$inferSelect;
// export type InsertCurrency = typeof currency.$inferInsert;

// export type SelectExchangeRateHistory = typeof exchangeRateHistory.$inferSelect;
// export type InsertExchangeRateHistory = typeof exchangeRateHistory.$inferInsert;