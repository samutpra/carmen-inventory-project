import { ApiProperty } from '@nestjs/swagger';
import { ExchangeRate } from 'src/entities';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateExchangerateDto extends PartialType(ExchangeRate) {
  @ApiProperty({ description: 'Id', example: '1' })
  id: string;

  @ApiProperty({ description: 'Code', example: 'USD', required: true })
  code?: string;
}
