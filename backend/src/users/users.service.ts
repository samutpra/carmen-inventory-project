import { DBTenantConfigService } from 'src/db_tenant/db_tenant.config';
import { DbSystemService } from 'src/db_system/db_system.service';
import { DbTenantService } from 'src/db_tenant/db_tenant.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@Prisma-Carmen-Client/system';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  constructor(
    private readonly db_system: DbSystemService,
    private readonly db_tenant: DbTenantService,
    private readonly db_tenant_config: DBTenantConfigService,
  ) {}

  private tenantId = '123';

  async create(createUserDto: Prisma.UserCreateInput): Promise<string> {
    this.db_tenant_config.setTenantId(this.tenantId);
    return new Promise((resolve) => resolve('This action adds a new user'));
  }

  async getAll(): Promise<string> {
    return new Promise((resolve) => resolve('This action returns all users'));
  }

  async get(id: string): Promise<string> {
    return new Promise((resolve) =>
      resolve(`This action returns a #${id} user`),
    );
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<string> {
    return new Promise((resolve) =>
      resolve(`This action updates a #${id} user`),
    );
  }

  delete(id: string): Promise<string> {
    return new Promise((resolve) =>
      resolve(`This action removes a #${id} user`),
    );
  }
}
