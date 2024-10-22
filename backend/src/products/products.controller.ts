import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { Prisma, Product } from '@prisma-carmen-client/tenant';

@Controller('api/v1/products')
@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<Product>> {
    return this.productsService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<ResponseList<Product>> {
    return this.productsService.findAll(req);
  }

  @Post()
  async create(
    @Body() createProductDto: Prisma.ProductCreateInput,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productsService.create(req, createProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
    @Req() req: Request,
  ) {
    return this.productsService.update(req, id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.productsService.delete(req, id);
  }
}
