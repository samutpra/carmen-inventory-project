import {
  IResponseList,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Injectable, NotFoundException } from '@nestjs/common';

import { DbSystemService } from 'src/db_system/db_system.service';
import { DbTenantService } from 'src/db_tenant/db_tenant.service';
import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils';
import { Prisma } from '@Prisma-Carmen-Client/system';
import { Tenant } from '@Prisma-Carmen-Client/system';

@Injectable()
export class TenantsService {
  constructor(
    private readonly db_system: DbSystemService,
    private readonly db_tenant: DbTenantService,
  ) {}

  async create(
    createTenantDto: Prisma.TenantCreateInput,
  ): Promise<ResponseId<string>> {
    const oneObj = await this.db_system.tenant.findUnique({
      where: {
        name: createTenantDto.name,
      },
    });

    if (oneObj) {
      throw new DuplicateException('Tenant already exists');
    }

    const newTenant = await this.db_system.tenant.create({
      data: createTenantDto,
    });

    const res: ResponseId<string> = {
      id: newTenant.id,
    };

    return res;
  }

  async findAll(): Promise<IResponseList<Tenant>> {
    const max = await this.db_system.tenant.count({});
    const listObj = await this.db_system.tenant.findMany();

    const res: ResponseList<Tenant> = {
      data: listObj,
      pagination: {
        total: max,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(max / Default_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<ResponseSingle<Tenant>> {
    const oneObj = await this.db_system.tenant.findUnique({
      where: {
        id: id,
      },
    });

    const res: ResponseSingle<Tenant> = {
      data: oneObj,
    };

    return res;
  }

  async update(
    id: string,
    updateTenantDto: Prisma.TenantUpdateInput,
  ): Promise<ResponseId<string>> {
    const oneObj = await this.db_system.tenant.findUnique({
      where: {
        id: id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Tenant not found');
    }

    const updateObj = await this.db_system.tenant.update({
      where: {
        id: id,
      },
      data: updateTenantDto,
    });
    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async remove(id: string) {
    const oneObj = await this.db_system.tenant.findUnique({
      where: {
        id: id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Tenant not found');
    }

    await this.db_system.tenant.delete({
      where: {
        id: id,
      },
    });
  }
}
