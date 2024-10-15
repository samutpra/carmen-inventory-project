import { CreateDepartmentDto } from './dto/create-department.dto';
import { DRIZZLE_SYSTEM, DRIZZLE_TENANT } from 'src/drizzle/drizzle.module';
import { Department } from './entities/department.entity';
import { DrizzleDB } from './../drizzle/types/drizzle.d';
import { IAsyncService } from 'lib/interfaces/helper/IAsyncService';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { drizzle } from 'drizzle-orm/node-postgres';
import { IResponseList } from 'lib/interfaces/helper/iResponse';
import { Default_PerPage } from 'lib/interfaces/helper/perpage.default';

@Injectable()
export class DepartmentsService
  implements
    IAsyncService<Department, CreateDepartmentDto, UpdateDepartmentDto>
{
  constructor(
    @Inject(DRIZZLE_SYSTEM) private readonly db_system: DrizzleDB,
    @Inject(DRIZZLE_TENANT) private readonly db_tenant: DrizzleDB,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  async getAll(tenantId: string): Promise<IResponseList<Department>> {
    const r = await this.db_tenant.query.departments.findMany();

    const res: IResponseList<Department> = {
      data: r,
      pagination: {
        total: r.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(r.length / Default_PerPage),
      },
    };

    return res;
  }

  async get(id: string) {
    return `This action returns a #${id} department`;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  async delete(id: string) {
    return `This action removes a #${id} department`;
  }
}
