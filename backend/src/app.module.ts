import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { TenantsModule } from './tenants/tenants.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [UserModule, ProductsModule, TenantsModule, CurrenciesModule, UnitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
