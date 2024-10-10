import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { DuplicateException } from 'lib/utils';
import { Mock_Product } from 'lib/mocks';
import { UpdateProductDto } from './dto/update-product.dto';
import { ulid } from 'ulid';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { products } from 'src/drizzle/schema/tenant/products.schema';
import { IResponseList } from 'lib/interfaces/helper/iResponse';
import { Default_PerPage } from 'lib/interfaces/helper/perpage.default';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  create(createProductDto: CreateProductDto) {
    // const create_By = ulid();
    // const product: typeof products.$inferInsert = {
    //   ...createProductDto,
    // };
    // this.db.insert(products).values(product).execute();
    // return product;

    return 'This action adds a new product';
  }

  async findAll() {
    //const products = Mock_Product;
    const r = await this.db.query.products.findMany();
    const res: IResponseList<typeof products> = {
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

  async findOne(id: string) {
    const r = await this.db.query.products.findUnique((o) => o.id === id);
    return r;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
