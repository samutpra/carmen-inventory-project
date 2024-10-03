import { ApiProperty } from '@nestjs/swagger';
import { Currency } from 'lib/entities';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCurrencyDto extends PartialType(Currency) {
  @ApiProperty({
    description: 'Unique identifier for the currency',
    example: '01J8ZCTHG9VWZJDSRMRNPTVAZ1',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Name of the currency',
    example: 'US Dollar',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'ISO 4217 currency code',
    example: 'USD',
    required: false,
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
    required: false,
  })
  isActive: boolean;
}
