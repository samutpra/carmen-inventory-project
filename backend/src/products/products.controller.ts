import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  IResponseList,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import { Prisma, Product } from '@prisma-carmen-client/tenant';

@Controller('api/v1/products')
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiBody({
    // type: CreateProductDto,
    description: 'Get all products',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ResponseList<Product>> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiBody({
    // type: CreateProductDto,
    description: 'Get a product by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ResponseSingle<Product>> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiBody({
    description: 'Create a new product',
    // type: CreateProductDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
  })
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiBody({
    // type: UpdateProductDto,
    description: 'Update a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiBody({
    // type: CreateProductDto,
    description: 'Delete a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
