import { Default_PerPage, IResponseList } from 'src/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { DuplicateException } from 'src/lib';
import { Mock_Product } from 'src/mocks';
import { Product } from 'src/entities';
import { UpdateProductDto } from './dto/update-product.dto';
import { ulid } from 'ulid';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    const found = Mock_Product.find(
      (product) => product.productCode === createProductDto.productCode,
    );
    if (found) {
      throw new DuplicateException('Product already exists');
    }

    const newProd: Product = {
      ...createProductDto,
      id: ulid(),
      create_On: new Date(),
      update_On: new Date(),
    };
    Mock_Product.push(newProd);
  }

  async findAll(): Promise<IResponseList<Product>> {
    const products = Mock_Product;
    const res: IResponseList<Product> = {
      data: products,
      pagination: {
        total: products.length,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(products.length / Default_PerPage),
      },
    };
    return res;
  }

  async findOne(id: string): Promise<Product> {
    const product = Mock_Product.find((product) => product.id === id);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const index = Mock_Product.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundException('Product not found');
    }

    if (index !== -1) {
      Mock_Product[index] = { ...Mock_Product[index], ...updateProductDto };
    }
  }

  remove(id: string) {
    const index = Mock_Product.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundException('Product not found');
    }

    if (index !== -1) {
      Mock_Product.splice(index, 1);
    }
  }
}
