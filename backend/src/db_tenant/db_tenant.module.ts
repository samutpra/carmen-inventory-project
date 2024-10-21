import { Global, Module } from '@nestjs/common';

import { DBTenantConfigService } from './db_tenant.config';
import { DbTenantService } from './db_tenant.service';

@Global() // this decorator is used to make the module available globally
@Module({
  providers: [
    DbTenantService,
    DBTenantConfigService,
    {
      provide: String,
      useFactory: (configService: DBTenantConfigService) =>
        configService.getTenantDatabaseUrl(),
      inject: [DBTenantConfigService],
    },
  ],
  exports: [DbTenantService, DBTenantConfigService],
})
export class DbTenantModule {}
