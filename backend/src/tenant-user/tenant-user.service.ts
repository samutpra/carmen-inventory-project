import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  TenantUser,
  User,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client/system';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class TenantUserService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  async _getOne(db_System: dbSystem, id: string): Promise<TenantUser> {
    const res = await db_System.tenantUser.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<TenantUser>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant-User not found');
    }
    const res: ResponseSingle<TenantUser> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<TenantUser>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.tenantUser.count({});
    const listObj = await this.db_System.tenantUser.findMany();

    const res: ResponseList<TenantUser> = {
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
    createTenantUserDto: Prisma.TenantUserCreateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.tenantUser.findFirst({
      where: {
        tenantId: createTenantUserDto.tenantId,
        userId: createTenantUserDto.userId,
      },
    });

    if (found) {
      throw new DuplicateException('Tenant - User already exists');
    }

    const createObj = await this.db_System.tenantUser.create({
      data: createTenantUserDto,
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateTenantUserDto: Prisma.TenantUserUpdateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant - User not found');
    }

    const updateObj = await this.db_System.tenantUser.update({
      where: {
        id: id,
      },
      data: updateTenantUserDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant - User not found');
    }

    await this.db_System.tenantUser.delete({
      where: {
        id: id,
      },
    });
  }
}
