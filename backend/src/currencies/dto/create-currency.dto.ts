import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../entities/currency.entity';

export class CreateCurrencyDto implements Currency {
  @ApiProperty({
    description: 'Unique identifier for the currency',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Date when the currency was created',
    example: new Date(),
    required: true,
  })
  create_On: Date;

  @ApiProperty({
    description: 'Date when the currency was last updated',
    example: new Date(),
    required: false,
    nullable: true,
  })
  update_On: Date;

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
    required: true,
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
