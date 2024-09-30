import { ApiProperty } from '@nestjs/swagger';
import { InventoryTransaction } from 'src/entities';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInventorytransactionDto extends PartialType(
  InventoryTransaction,
) {
  @ApiProperty({ description: 'Id', example: '1' })
  id: string;

  @ApiProperty({ description: 'Code', example: 'USD', required: true })
  code?: string;
}
