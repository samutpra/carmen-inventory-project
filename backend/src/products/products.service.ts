import { Mock_Product } from '../_mocks/mock_product';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IResponseList } from 'src/_types/_IResponseList';
import { K_PerPage } from 'src/_types/_IBaseTable';
import { v4 as uuidv4 } from 'uuid';
import { DuplicateException } from 'src/_lib/exception';

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
      id: uuidv4(),
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
        perPage: K_PerPage,
        pages: Math.ceil(products.length / K_PerPage),
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
