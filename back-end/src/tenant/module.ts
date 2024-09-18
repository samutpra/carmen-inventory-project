import { Module } from '@nestjs/common';
import { TenantService } from './services/TenantService';
import { TenantController } from './controllers/tenant.controller';

@Module({
  providers: [TenantService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
