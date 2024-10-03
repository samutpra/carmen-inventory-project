import { IProductInfo, IProductUpdate } from 'lib/types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto implements IProductUpdate {
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  localDescription?: string;

  @IsOptional()
  productCategoryId?: string;

  @IsOptional()
  productSubCategoryId?: string;

  @IsOptional()
  productItemGroupId?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  ProductInfo?: IProductInfo;
}
