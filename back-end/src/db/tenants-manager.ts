import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres'
// import { drizzle } from 'drizzle-orm/postgres-js';

import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const databaseUrl = process.env.DATABASE_URL;

console.log(supabaseUrl);
console.log(supabaseKey);
console.log(databaseUrl);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}
if (!databaseUrl) {
  throw new Error('Missing Database URL');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

interface TenantConfig {
  databaseUrl: string;
  schema?: string;
}

class TenantManager {
  private tenants: Map<string, TenantConfig> = new Map();
  private pools: Map<string, Pool> = new Map();

  addTenant(tenantId: string, config: TenantConfig) {
    this.tenants.set(tenantId, config);
  }

  async getDb(tenantId: string) {
    const config = this.tenants.get(tenantId);
    if (!config) throw new Error(`Tenant ${tenantId} not found`);

    if (!this.pools.has(config.databaseUrl)) {
      this.pools.set(
        config.databaseUrl,
        new Pool({ connectionString: config.databaseUrl }),
      );
    }

    const pool = this.pools.get(config.databaseUrl)!;

    // const queryClient = postgres(config.databaseUrl!, { prepare: false });
    
    const db = drizzle(pool);

    if (config.schema) {
      await db.execute(
        sql`SET search_path TO ${sql.identifier(config.schema)}`,
      );
    }

    return db;
  }
}

export const tenantManager = new TenantManager();
