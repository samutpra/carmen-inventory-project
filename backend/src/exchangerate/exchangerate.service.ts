import { ExchangeRate, Prisma } from '@prisma-carmen-client/tenant';
import {
  IResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Injectable, NotFoundException } from '@nestjs/common';

import { DBTenantConfigService } from 'src/db_tenant/db_tenant.config';
import { DbSystemService } from 'src/db_system/db_system.service';
import { DbTenantService } from 'src/db_tenant/db_tenant.service';
import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils';
import { ResponseId } from 'lib/helper/iResponse';

@Injectable()
export class ExchangerateService {
  constructor(
    private readonly db_system: DbSystemService,
    private readonly db_tenant: DbTenantService,
    private readonly db_tenant_config: DBTenantConfigService,
  ) {}

  private tenantId = '123';

  async create(
    createExchangerateDto: Prisma.ExchangeRateCreateInput,
  ): Promise<ResponseId<string>> {
    this.db_tenant_config.setTenantId(this.tenantId);
    const oneObj = await this.db_tenant.exchangeRate.findUnique({
      where: {
        code: createExchangerateDto.code,
      },
    });

    if (oneObj) {
      throw new DuplicateException('Exchangerate already exists');
    }

    const newExchangerate = await this.db_tenant.exchangeRate.create({
      data: createExchangerateDto,
    });
    const res: ResponseId<string> = {
      id: newExchangerate.id,
    };
    return res;
  }

  async findAll(): Promise<ResponseList<ExchangeRate>> {
    this.db_tenant_config.setTenantId(this.tenantId);
    const max = await this.db_tenant.exchangeRate.count({});
    const listObj = await this.db_tenant.exchangeRate.findMany();
    const res: ResponseList<ExchangeRate> = {
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

  async findOne(id: string): Promise<ResponseSingle<ExchangeRate>> {
    this.db_tenant_config.setTenantId(this.tenantId);
    const oneObj = await this.db_tenant.exchangeRate.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const res: ResponseSingle<ExchangeRate> = {
      data: oneObj,
    };
    return res;
  }

  async update(
    id: string,
    updateExchangerateDto: Prisma.ExchangeRateUpdateInput,
  ): Promise<ResponseId<string>> {
    this.db_tenant_config.setTenantId(this.tenantId);
    const oneObj = await this.db_tenant.exchangeRate.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const updateObj = await this.db_tenant.exchangeRate.update({
      where: {
        id,
      },
      data: updateExchangerateDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(id: string) {
    this.db_tenant_config.setTenantId(this.tenantId);
    const oneObj = await this.db_tenant.exchangeRate.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    await this.db_tenant.exchangeRate.delete({
      where: {
        id,
      },
    });
  }
}
