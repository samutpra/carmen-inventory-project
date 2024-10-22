import {
  Department,
  Prisma,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';
import {
  IResponseId,
  IResponseList,
  ResponseId,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class DepartmentsService {
  private db_tenant: dbTenant;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_tenant = this.prismaClientMamager.getTenantDB(this.tenantId);
  }

  private tenantId = '123';

  async create(
    createDepartmentDto: Prisma.DepartmentCreateInput,
  ): Promise<IResponseId<string>> {
    const oneObj = await this.db_tenant.department.findUnique({
      where: {
        name: createDepartmentDto.name,
      },
    });

    if (oneObj) {
      throw new Error('Department already exists');
    }

    const createObj = await this.db_tenant.department.create({
      data: createDepartmentDto,
    });

    const res: IResponseId<string> = { id: createObj.id };
    return res;
  }

  async findAll(tenantId: string): Promise<IResponseList<Department>> {
    const max = await this.db_tenant.department.count({});
    const listObj = await this.db_tenant.department.findMany();

    const res: IResponseList<Department> = {
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

  async findOne(id: string): Promise<ResponseSingle<Department>> {
    const oneObj = await this.db_tenant.department.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }
    const res: ResponseSingle<Department> = {
      data: oneObj,
    };
    return res;
  }

  async update(id: string, updateDepartmentDto: Prisma.DepartmentUpdateInput) {
    const oneObj = await this.db_tenant.department.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Department not found');
    }

    const updateObj = await this.db_tenant.department.update({
      where: {
        id,
      },
      data: updateDepartmentDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(id: string) {
    const oneObj = await this.db_tenant.department.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Department not found');
    }

    await this.db_tenant.department.delete({
      where: {
        id,
      },
    });
  }
}
