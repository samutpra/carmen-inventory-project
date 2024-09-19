import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { sql } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import * as dotenv from 'dotenv';

dotenv.config();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle instance
const db = drizzle(pool);

// Define the base schema for each tenant
const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
});

// Function to create a new tenant schema
async function createTenantSchema(tenantName: string) {
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(tenantName)}`);
  
  await db.execute(sql`
    CREATE TABLE ${sql.identifier(tenantName)}.users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL
    )
  `);
}

// Function to get a Drizzle instance for a specific tenant
function getTenantDb(tenantName: string) {
  return drizzle(pool, { schema: { [tenantName]: { users: usersTable } } });
}

// Example usage
async function main() {
  // Create schemas for a few tenants
  await createTenantSchema('tenant1');
  console.log("Create Tenant 1");
  await createTenantSchema('tenant2');
  console.log("Create Tenant 2");

  // Get Drizzle instances for each tenant
  const tenant1Db = getTenantDb('tenant1');
  console.log("get Tenant 1");
  const tenant2Db = getTenantDb('tenant2');
  console.log("get Tenant 2");

  // Insert data for tenant1
  await tenant1Db.insert(usersTable).values({
    username: 'user1',
    email: 'user1@tenant1.com',
  });

  console.log("Insert success")

  // Insert data for tenant2
  await tenant2Db.insert(usersTable).values({
    username: 'user1',
    email: 'user1@tenant2.com',
  });

  // Query data for tenant1
  const tenant1Users = await tenant1Db.select().from(usersTable);
  console.log('Tenant 1 users:', tenant1Users);

  // Query data for tenant2
  const tenant2Users = await tenant2Db.select().from(usersTable);
  console.log('Tenant 2 users:', tenant2Users);
}

main().catch(console.error).finally(() => pool.end());