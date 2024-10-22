import {
  Prisma,
  Unit,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';

import { Injectable } from '@nestjs/common';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class UnitsService {
  private db_tenant: dbTenant;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_tenant = this.prismaClientMamager.getTenantDB(this.tenantId);
  }

  private tenantId = '123';

  create(createUnitDto: Prisma.UnitCreateInput) {
    return 'This action adds a new unit';
  }

  findAll() {
    return `This action returns all units`;
  }

  findOne(id: string) {
    return `This action returns a #${id} unit`;
  }

  update(id: string, updateUnitDto: Prisma.UnitUpdateInput) {
    return `This action updates a #${id} unit`;
  }

  remove(id: string) {
    return `This action removes a #${id} unit`;
  }
}
