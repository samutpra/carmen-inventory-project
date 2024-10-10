import { pgSchema } from 'drizzle-orm/pg-core';

export function systemSchema() {
  return pgSchema('carmen_system');
}

export const tenantSchema = (tenantid?: string) => {
  return pgSchema(tenantid || 'tenant_base');
};

// export const systemSchema = pgSchema('carmen_system');
// export const tenantSchema = pgSchema(process.env.TENANT_NAME || 'tenant_base');
