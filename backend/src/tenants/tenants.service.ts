import { Tenant } from './entities/tenant.entity';
import { IResponseList } from 'src/_types/_IResponseList';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Mock_Tenant } from 'src/_mocks/mock_tenant';
import { K_PerPage } from 'src/_types/_IBaseTable';
import { DuplicateException } from 'src/_lib/exception';
import { v4 as uuidv4 } from 'uuid';

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
      id: uuidv4(),
      create_On: new Date(),
      update_On: new Date(),
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
        perPage: K_PerPage,
        pages: Math.ceil(tenants.length / K_PerPage),
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
