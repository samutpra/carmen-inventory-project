import {
  IResponseList,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  Tenant,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client/system';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class TenantsService {
  private db_System: dbSystem;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_System = this.prismaClientMamager.getSystemDB();
  }

  async create(
    createTenantDto: Prisma.TenantCreateInput,
  ): Promise<ResponseId<string>> {
    const oneObj = await this.db_System.tenant.findUnique({
      where: {
        name: createTenantDto.name,
      },
    });

    if (oneObj) {
      throw new DuplicateException('Tenant already exists');
    }

    const newTenant = await this.db_System.tenant.create({
      data: createTenantDto,
    });

    const res: ResponseId<string> = {
      id: newTenant.id,
    };

    return res;
  }

  async findAll(): Promise<IResponseList<Tenant>> {
    const max = await this.db_System.tenant.count({});
    const listObj = await this.db_System.tenant.findMany();

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
    const oneObj = await this.db_System.tenant.findUnique({
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
    const oneObj = await this.db_System.tenant.findUnique({
      where: {
        id: id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Tenant not found');
    }

    const updateObj = await this.db_System.tenant.update({
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
    const oneObj = await this.db_System.tenant.findUnique({
      where: {
        id: id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Tenant not found');
    }

    await this.db_System.tenant.delete({
      where: {
        id: id,
      },
    });
  }
}
