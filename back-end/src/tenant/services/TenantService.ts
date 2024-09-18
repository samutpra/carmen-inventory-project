import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IAsyncService } from '../../app.interface';
import { TenantModel } from '../models/TenantModel';
import { CreateTenantDto } from '../dtos/CreateTenantDto';
import { UpdateTenantDto } from '../dtos/UpdateTenantDto';
import { base_db } from 'src/db/db';
import { SelectTenant, tenantTable } from 'src/db/schema';
import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm';

@Injectable()
export class TenantService
  implements IAsyncService<TenantModel, CreateTenantDto, UpdateTenantDto>
{
  // private readonly tenants: TenantModel[] = []; // Temp local database..

  create(data: CreateTenantDto): string {
    const obj = {
      name: data.name,
      description: data.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = async () =>
      await base_db.insert(tenantTable).values(obj).execute();

    console.log(result);
    return 'Tenant created successfully';
  }

  delete(id: string): string {
    try {
      const findTenant = async () =>
        await base_db.select().from(tenantTable).where(eq(tenantTable.id, id));

      console.log(findTenant);
      if (!findTenant) throw new NotFoundException('Tenant not found');

      const result = async () =>
        await base_db
          .delete(tenantTable)
          .where(eq(tenantTable.id, id))
          .execute();

      console.log(result);
      return 'Tenant deleted successfully';
    } catch (error) {
      console.log(error);
    }
  }

  async get(id: string): Promise<SelectTenant> {
    const findTenant = await base_db
      .select()
      .from(tenantTable)
      .where(eq(tenantTable.id, id))
      .limit(1);

    console.log(findTenant);

    if (!findTenant) throw new NotFoundException('Tenant not found');

    const result = findTenant[0];

    console.log(result);

    return result;
  }

  async update(id: string, data: UpdateTenantDto): Promise<SelectTenant> {
    const obj = {
      name: data.name,
      description: data.description || '',
      updatedAt: new Date(),
    };

    const updateResult =
      await base_db.update(tenantTable).set(obj).where(eq(tenantTable.id, id));

    console.log(updateResult);

    const result = await base_db.select().from(tenantTable).where(eq(tenantTable.id, id)).limit(1);

    console.log(result);

    return result[0]
    
  }

  async getAll(): Promise<SelectTenant[]> {
    const result = await base_db
      .select()
      .from(tenantTable)
      .orderBy(asc(tenantTable.name));

    console.log(result);
    return result;
  }
}
