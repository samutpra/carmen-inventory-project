import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StoreLocationsModule } from './storelocations/storelocations.module';
import { TenantsModule } from './tenants/tenants.module';
import { UnitsModule } from './units/units.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    TenantsModule,
    CurrenciesModule,
    UnitsModule,
    StoreLocationsModule,
    ExchangerateModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
