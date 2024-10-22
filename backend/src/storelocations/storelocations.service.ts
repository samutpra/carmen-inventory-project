import {
  IResponseId,
  IResponseList,
  IResponseSingle,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import {
  Location,
  Prisma,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { Injectable } from '@nestjs/common';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class StoreLocationsService {
  private db_tenant: dbTenant;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_tenant = this.prismaClientMamager.getTenantDB(this.tenantId);
  }

  private tenantId = '123';

  async create(
    createStoreLocationDto: Prisma.LocationCreateInput,
  ): Promise<ResponseSingle<Location>> {
    const oneObj = await this.db_tenant.location.findUnique({
      where: {
        name: createStoreLocationDto.name,
      },
    });

    if (oneObj) {
      throw new Error('Location already exists');
    }

    const createObj = await this.db_tenant.location.create({
      data: createStoreLocationDto,
    });

    const res: ResponseSingle<Location> = {
      data: createObj,
    };

    return res;
  }

  async getAll(): Promise<ResponseList<Location>> {
    const max = await this.db_tenant.location.count({});
    const listObj = await this.db_tenant.location.findMany();

    const res: ResponseList<Location> = {
      data: listObj,
      pagination: {
        total: max,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(max / Default_PerPage),
      },
    };
    return new Promise((resolve) => resolve(res));
  }

  async findOne(id: string): Promise<ResponseSingle<Location>> {
    const oneObj = await this.db_tenant.location.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new Error('Location not found');
    }

    const res: ResponseSingle<Location> = {
      data: oneObj,
    };

    return res;
  }

  async update(
    id: string,
    updateLocationDto: Prisma.LocationUpdateInput,
  ): Promise<ResponseSingle<Location>> {
    const oneObj = await this.db_tenant.location.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new Error('Location not found');
    }

    const updateObj = await this.db_tenant.location.update({
      where: {
        id,
      },
      data: updateLocationDto,
    });

    const res: ResponseSingle<Location> = {
      data: updateObj,
    };

    return res;
  }

  async delete(id: string) {
    const oneObj = await this.db_tenant.location.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new Error('Location not found');
    }

    await this.db_tenant.location.delete({
      where: {
        id,
      },
    });
  }
}
