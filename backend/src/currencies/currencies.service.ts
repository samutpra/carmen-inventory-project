import { Currency, Prisma } from '@prisma-carmen-client/tenant';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { DbSystemService } from 'src/db_system/db_system.service';
import { DbTenantService } from 'src/db_tenant/db_tenant.service';
import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly db_system: DbSystemService,
    private readonly db_tenant: DbTenantService,
  ) {}

  //#region CREATE
  async create(
    createCurrencyDto: Prisma.CurrencyCreateInput,
  ): Promise<ResponseId<string>> {
    // Check if currency already exists
    const found = await this.db_tenant.currency.findUnique({
      where: {
        name: createCurrencyDto.name,
      },
    });

    if (found) {
      throw new DuplicateException('Currency already exists');
    }

    const createObj = await this.db_tenant.currency.create({
      data: createCurrencyDto,
    });

    const res: ResponseId<string> = { id: createObj.id };

    return res;
  }
  //#endregion CREATE

  //#region GET ALL
  async findAll(): Promise<ResponseList<Currency>> {
    const max = await this.db_tenant.currency.count({});
    const listObj = await this.db_tenant.currency.findMany();
    const res: ResponseList<Currency> = {
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
  //#endregion GET ALL

  //#region GET ONE
  async findOne(id: string): Promise<ResponseSingle<Currency>> {
    const oneObj = await this.db_tenant.currency.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }
    const res: ResponseSingle<Currency> = {
      data: oneObj,
    };
    return res;
  }
  //#endregion GET ONE

  //#region UPDATE
  async update(
    id: string,
    updateCurrencyDto: Prisma.CurrencyUpdateInput,
  ): Promise<ResponseId<string>> {
    const oneObj = await this.db_tenant.currency.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    const updateObj = await this.db_tenant.currency.update({
      where: {
        id,
      },
      data: updateCurrencyDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }
  //#endregion UPDATE

  //#region DELETE
  async delete(id: string) {
    const oneObj = await this.db_tenant.currency.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    await this.db_tenant.currency.delete({
      where: {
        id,
      },
    });
  }
  //#endregion DELETE
}
