import 'dotenv/config';

import * as schema from './schema/schema';

import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //   ssl: true,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  await db.execute('drop schema if exists tenant_base cascade');
  await db.execute('create schema tenant_base');

  await db.execute('drop schema if exists carmen_system cascade');
  await db.execute('create schema carmen_system');

  await db.execute('drop schema if exists drizzle cascade');
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
