import { Default_PerPage, IResponseList } from 'lib/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { DuplicateException } from 'lib/utils';
import { Mock_Tenant } from 'lib/mocks';
import { Tenant } from 'lib/entities';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ulid } from 'ulid';

@Injectable()
export class TenantsService {
  create(createTenantDto: CreateTenantDto) {
    const found = Mock_Tenant.find(
      (tenant) => tenant.name === createTenantDto.name,
    );
    if (found) {
      throw new DuplicateException('Tenant already exists');
    }

    const newTenant: Tenant = {
      ...createTenantDto,
      id: ulid(),
      created_On: new Date(),
      created_by: 'USER-01',
      updated_On: new Date(),
      updated_by: 'USER-01',
    };
    Mock_Tenant.push(newTenant);
  }

  async findAll(): Promise<IResponseList<Tenant>> {
    const tenants = Mock_Tenant;
    const res: IResponseList<Tenant> = {
      data: tenants,
      pagination: {
        total: tenants.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(tenants.length / Default_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = Mock_Tenant.find((tenant) => tenant.id === id);
    return tenant;
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    const index = Mock_Tenant.findIndex((tenant) => tenant.id === id);

    if (index === -1) {
      throw new NotFoundException('Tenant not found');
    }

    if (index !== -1) {
      Mock_Tenant[index] = { ...Mock_Tenant[index], ...updateTenantDto };
    }
  }

  remove(id: string) {
    const index = Mock_Tenant.findIndex((tenant) => tenant.id === id);

    if (index === -1) {
      throw new NotFoundException('Tenant not found');
    }

    if (index !== -1) {
      Mock_Tenant.splice(index, 1);
    }
  }
}
