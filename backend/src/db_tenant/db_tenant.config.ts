import 'dotenv/config';

// config.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBTenantConfigService {
  private currentTenantId: string;

  setTenantId(tenantId: string) {
    this.currentTenantId = tenantId;
  }

  getTenantDatabaseUrl(): string {
    // if (!this.currentTenantId) {
    //   throw new Error('Tenant ID not set. Please call setTenantId() first.');
    // }
    // Logic to fetch the tenant database URL
    // This could be from environment variables, a config file, etc.
    const tenant_schema = `tenant_${this.currentTenantId}`;
    const tenant_database_url =
      process.env.DATABASE_URL + '?schema=' + tenant_schema;
    return tenant_database_url || process.env.TENANT_DATABASE_URL;
  }
}
