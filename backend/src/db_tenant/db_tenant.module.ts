import { Global, Module } from '@nestjs/common';

import { DbTenantService } from './db_tenant.service';

@Global() // this decorator is used to make the module available globally
@Module({
  providers: [DbTenantService],
  exports: [DbTenantService],
})
export class DbTenantModule {}
