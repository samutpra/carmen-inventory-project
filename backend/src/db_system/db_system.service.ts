import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@Prisma-Carmen-Client/system';

@Injectable()
export class DbSystemService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
