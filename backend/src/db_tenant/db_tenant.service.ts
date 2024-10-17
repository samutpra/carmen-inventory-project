import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma-carmen-client/tenant';

@Injectable()
export class DbTenantService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
