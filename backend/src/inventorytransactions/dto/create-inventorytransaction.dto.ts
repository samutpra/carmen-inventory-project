import { ApiProperty } from '@nestjs/swagger';
import { InventoryTransaction } from 'src/entities';
import { PartialType } from '@nestjs/mapped-types';

export class CreateInventorytransactionDto extends PartialType(
  InventoryTransaction,
) {
  @ApiProperty({ description: 'Code', example: 'USD', required: true })
  code: string;
}
