import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  Unit,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class UnitsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  async _getOne(db_tenant: dbTenant, id: string): Promise<Unit> {
    const res = await db_tenant.unit.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<Unit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Unit not found');
    }
    const res: ResponseSingle<Unit> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<Unit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const max = await this.db_tenant.unit.count({});
    const listObj = await this.db_tenant.unit.findMany();

    const res: ResponseList<Unit> = {
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
    createUnitDto: Prisma.UnitCreateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.unit.findUnique({
      where: {
        name: createUnitDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Unit already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.unit.create({
      data: createUnitDto,
    });

    const res: ResponseId<string> = { id: createObj.id };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateUnitDto: Prisma.UnitUpdateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Unit not found');
    }

    const updateObj = await this.db_tenant.unit.update({
      where: {
        id,
      },
      data: updateUnitDto,
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
      throw new NotFoundException('Unit not found');
    }

    await this.db_tenant.unit.delete({
      where: {
        id,
      },
    });
  }
}
