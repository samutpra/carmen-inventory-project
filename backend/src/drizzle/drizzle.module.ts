import * as system_schema from './schema/system.schema';
import * as tenant_schema from './schema/tenant.schema';

import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import connectionString_pg from './connectionString.pg';

export const DRIZZLE_SYSTEM = Symbol('drizzle-connection');
export const DRIZZLE_TENANT = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE_SYSTEM,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseURL = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: databaseURL,
          //   ssl: true,
        });

        return drizzle(pool, { schema: system_schema }) as NodePgDatabase<
          typeof system_schema
        >;
      },
    },
    {
      provide: DRIZZLE_TENANT,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService, tenantid: string) => {
        const databaseURL = configService.get<string>('DATABASE_URL');
        const tenant_space = tenantid === 'undefined' ? 'base' : tenantid;
        const connStr = connectionString_pg(tenant_space);
        // const connStr = `${databaseURL}?currentSchema=tenant_${tenant_space}`;
        const pool = new Pool({
          connectionString: connStr,
          //   ssl: true,
        });

        return drizzle(pool, { schema: tenant_schema }) as NodePgDatabase<
          typeof tenant_schema
        >;
      },
    },
  ],
  exports: [DRIZZLE_SYSTEM, DRIZZLE_TENANT],
})
export class DrizzleModule {}
