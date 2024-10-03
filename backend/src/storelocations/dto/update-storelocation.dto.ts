import { CreateStoreLocationDto } from './create-storelocation.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateStoreLocationDto extends PartialType(
  CreateStoreLocationDto,
) {}
