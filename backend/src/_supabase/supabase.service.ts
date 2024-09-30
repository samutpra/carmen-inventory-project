import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  db: SupabaseClient;

  private readonly supabaseUrl: string;
  private readonly supabaseKey: string;

  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;

    if (!this.supabaseUrl || !this.supabaseKey) {
      throw new Error('Missing Supabase URL or Key');
    }

    this.db = createClient(this.supabaseUrl, this.supabaseKey);
  }
}
