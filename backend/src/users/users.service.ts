import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  Tenant,
  User,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client/system';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';
import { rawListeners } from 'process';

@Injectable()
export class UsersService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  async _getOne(db_System: dbSystem, id: string): Promise<User> {
    const res = await db_System.user.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<User>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }
    const res: ResponseSingle<User> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<User>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.user.count({});
    const listObj = await this.db_System.user.findMany();

    const res: ResponseList<User> = {
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
    createUserDto: Prisma.UserCreateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    });

    if (found) {
      throw new DuplicateException('User already exists');
    }

    const createObj = await this.db_System.user.create({
      data: createUserDto,
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }

    const updateObj = await this.db_System.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
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
      throw new NotFoundException('User not found');
    }

    await this.db_System.user.delete({
      where: {
        id: id,
      },
    });
  }
}
