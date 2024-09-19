import  * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

// const schemaName = process.env.DRIZZLE_SCHEMA || 'public';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  // schemaFilter: [schemaName],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

});