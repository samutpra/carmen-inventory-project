import { ApiProperty } from '@nestjs/swagger';
import { IExchangeRateCreate } from 'lib/types';

export class CreateExchangerateDto implements IExchangeRateCreate {
  currencyId: string;
  atDate: Date;
  rate: number;
}
