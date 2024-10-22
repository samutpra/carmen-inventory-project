import {
  IResponseList,
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  Product,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class ProductsService {
  private db_tenant: dbTenant;

  constructor(private prismaClientMamager: PrismaClientManagerService) {
    this.db_tenant = this.prismaClientMamager.getTenantDB(this.tenantId);
  }

  private tenantId = '123';

  async create(
    createProductDto: Prisma.ProductCreateInput,
  ): Promise<ResponseId<string>> {
    const createOne = await this.db_tenant.product.create({
      data: createProductDto,
    });

    const res: ResponseId<string> = {
      id: createOne.id,
    };

    return res;
  }

  async findAll(): Promise<ResponseList<Product>> {
    const max = await this.db_tenant.product.count({});
    const listObj = await this.db_tenant.product.findMany();

    //const products = Mock_Product;
    const res: ResponseList<Product> = {
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

  async findOne(id: string): Promise<ResponseSingle<Product>> {
    const oneObj = await this.db_tenant.product.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    const res: ResponseSingle<Product> = {
      data: oneObj,
    };
    return res;
  }

  async update(id: string, updateProductDto: Prisma.ProductUpdateInput) {
    const oneObj = await this.db_tenant.product.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    const updateObj = await this.db_tenant.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async remove(id: string) {
    const oneObj = await this.db_tenant.product.findUnique({
      where: {
        id,
      },
    });

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    const deleteObj = await this.db_tenant.product.delete({
      where: {
        id,
      },
    });
  }
}
