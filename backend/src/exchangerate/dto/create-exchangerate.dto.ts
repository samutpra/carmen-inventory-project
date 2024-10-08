import { ApiProperty } from '@nestjs/swagger';
import { IExchangeRateCreate } from 'lib/interfaces';

export class CreateExchangerateDto implements IExchangeRateCreate {
  currencyId: string;
  atDate: Date;
  rate: number;
}
