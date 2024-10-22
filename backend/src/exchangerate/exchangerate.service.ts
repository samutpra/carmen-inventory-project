import {
  ExchangeRate,
  Prisma,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';
import {
  IResponseId,
  IResponseList,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class ExchangerateService {
  private db_tenant: dbTenant;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_tenant = this.prismaClientMamager.getTenantDB(this.tenantId);
  }

  private tenantId = '123';

  async create(
    createExchangerateDto: Prisma.ExchangeRateCreateInput,
  ): Promise<ResponseId<string>> {
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
