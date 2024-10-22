import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  Product,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client/tenant';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class ProductsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  async _getOne(db_tenant: dbTenant, id: string): Promise<Product> {
    const res = await db_tenant.product.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<Product>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    const res: ResponseSingle<Product> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<Product>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const max = await this.db_tenant.product.count({});
    const listObj = await this.db_tenant.product.findMany();

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

  async create(
    req: Request,
    createProductDto: Prisma.ProductCreateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.product.findUnique({
      where: {
        name: createProductDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Product already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.product.create({
      data: createProductDto,
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateProductDto: Prisma.ProductUpdateInput,
  ) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

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

  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    await this.db_tenant.product.delete({
      where: {
        id,
      },
    });
  }
}
