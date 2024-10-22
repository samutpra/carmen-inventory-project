import {
  ExchangeRate,
  Prisma,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class ExchangerateService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  async _getOne(db_tenant: dbTenant, id: string): Promise<ExchangeRate> {
    const res = await db_tenant.exchangeRate.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<ExchangeRate>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const res: ResponseSingle<ExchangeRate> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<ExchangeRate>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
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

  async create(
    req: Request,
    createExchangerateDto: Prisma.ExchangeRateCreateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.exchangeRate.findUnique({
      where: {
        code: createExchangerateDto.code,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Exchange Rate already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.exchangeRate.create({
      data: createExchangerateDto,
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };
    return res;
  }

  async update(
    req: Request,
    id: string,
    updateExchangerateDto: Prisma.ExchangeRateUpdateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

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

  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

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
