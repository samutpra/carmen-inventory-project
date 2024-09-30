import { PartialType } from '@nestjs/mapped-types';
import { Product } from 'src/entities';

export class UpdateProductDto extends PartialType(Product) {}
