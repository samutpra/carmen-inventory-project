import { ApiProperty } from '@nestjs/swagger';
import { Currency } from 'lib/entities';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCurrencyDto extends PartialType(Currency) {
  @ApiProperty({
    description: 'Name of the currency',
    example: 'US Dollar',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'ISO 4217 currency code',
    example: 'USD',
    required: true,
  })
  code: string;

  @ApiProperty({
    description: 'Symbol representing the currency',
    example: '$',
    required: false,
  })
  symbol: string;

  @ApiProperty({
    description: 'Description of the currency',
    example: 'https://www.countryflags.io/us/flat/64.png',
    required: false,
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Whether the currency is active or not',
    example: true,
    required: true,
  })
  isActive: boolean;
}
