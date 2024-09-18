import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TenantModule } from './tenant/module';
import { CurrencyModule } from './currency/module';
import * as dotenv from 'dotenv';
import { TenantMiddleware } from './tenant/middlewares/TenantMiddleware';
dotenv.config();

@Module({
  imports: [TenantModule, CurrencyModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('/api/currencies');
  }
}
