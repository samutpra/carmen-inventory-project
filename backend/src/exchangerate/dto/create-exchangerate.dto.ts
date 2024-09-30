import { ApiProperty } from '@nestjs/swagger';
import { ExchangeRate } from 'src/entities';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExchangerateDto extends PartialType(ExchangeRate) {
  @ApiProperty({ description: 'Code', example: 'USD', required: true })
  code: string;
}
