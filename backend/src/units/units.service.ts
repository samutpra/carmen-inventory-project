import { DBTenantConfigService } from 'src/db_tenant/db_tenant.config';
import { DbSystemService } from 'src/db_system/db_system.service';
import { DbTenantService } from 'src/db_tenant/db_tenant.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-carmen-client/tenant';

@Injectable()
export class UnitsService {
  constructor(
    private readonly db_system: DbSystemService,
    private readonly db_tenant: DbTenantService,
    private readonly db_tenant_config: DBTenantConfigService,
  ) {}

  private tenantId = '123';

  create(createUnitDto: Prisma.UnitCreateInput) {
    this.db_tenant_config.setTenantId(this.tenantId);
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
