import { IProductCreate, IUnitConversion } from 'lib/interfaces';

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto implements IProductCreate {
  name: string;
  code: string;
  description: string;
  localDescription: string;
  productItemGroupId: string;
  price: number;
  quantity: number;
  unit: string;
  unitConversion: IUnitConversion[];
  imageUrl: string;
  isActive: boolean;
}
