import 'dotenv/config';

import * as system_schema from './schema/system.schema';
import * as tenant_schema from './schema/tenant.schema';

import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';
import connectionString_pg from './connectionString.pg';

const connStr_system = connectionString_pg('carmen_system');
const connStr_tenant = connectionString_pg('tenant_base');

const pool_system = new Pool({
  connectionString: connStr_system,
  //   ssl: true,
});

const pool_tenant = new Pool({
  connectionString: connStr_tenant,
  //   ssl: true,
});

const db_system = drizzle(pool_system, {
  schema: system_schema,
}) as NodePgDatabase<typeof system_schema>;

const db_tenant = drizzle(pool_tenant, {
  schema: tenant_schema,
}) as NodePgDatabase<typeof tenant_schema>;

async function main() {
  await db_system.execute('drop schema if exists tenant_base cascade');
  await db_system.execute('create schema tenant_base');

  await db_system.execute('drop schema if exists carmen_system cascade');
  await db_system.execute('create schema carmen_system');

  await db_system.execute('drop schema if exists drizzle cascade');
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
