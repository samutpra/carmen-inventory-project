import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const databaseUrl = process.env.DATABASE_URL;

// console.log(supabaseUrl);
// console.log(supabaseKey);
// console.log(databaseUrl);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}
if (!databaseUrl) {
  throw new Error('Missing Database URL');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

const queryClient = postgres(databaseUrl!, { prepare: false })
export const base_db = drizzle(queryClient);