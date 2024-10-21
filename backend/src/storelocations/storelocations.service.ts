import {
  IResponseId,
  IResponseList,
  IResponseSingle,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';

import { DBTenantConfigService } from 'src/db_tenant/db_tenant.config';
import { DbSystemService } from 'src/db_system/db_system.service';
import { DbTenantService } from 'src/db_tenant/db_tenant.service';
import { Default_PerPage } from 'lib/helper/perpage.default';
import { Injectable } from '@nestjs/common';
import { Location } from '@prisma-carmen-client/tenant';
import { Prisma } from '@prisma-carmen-client/tenant';

@Injectable()
export class StoreLocationsService {
  constructor(
    private readonly db_system: DbSystemService,
    private readonly db_tenant: DbTenantService,
    private readonly db_tenant_config: DBTenantConfigService,
  ) {}

  private tenantId = '123';

  async create(
    createStoreLocationDto: Prisma.LocationCreateInput,
  ): Promise<ResponseSingle<Location>> {
    this.db_tenant_config.setTenantId(this.tenantId);
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
    this.db_tenant_config.setTenantId(this.tenantId);
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
    this.db_tenant_config.setTenantId(this.tenantId);
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
    this.db_tenant_config.setTenantId(this.tenantId);
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
    this.db_tenant_config.setTenantId(this.tenantId);
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
