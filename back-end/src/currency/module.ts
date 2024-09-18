import { Module } from '@nestjs/common';
import { CurrencyService } from './services/CurrencyService';
import { CurrencyController } from './controllers/currency.controller';

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
  exports: [CurrencyService],
})
export class CurrencyModule {}
