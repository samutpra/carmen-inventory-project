import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma-carmen-client/tenant';

@Injectable()
export class DbTenantService extends PrismaClient implements OnModuleInit {
  private readonly prisma_database_url: string;

  // constructor(database_url: string) {
  //   if (database_url && database_url.length > 0) {
  //     super({
  //       datasources: {
  //         db: {
  //           url: database_url,
  //         },
  //       },
  //     });
  //   } else {
  //     super();
  //   }

  //   this.prisma_database_url = database_url;
  // }

  async onModuleInit() {
    await this.$connect();
  }
}
