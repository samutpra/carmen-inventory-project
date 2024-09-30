import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { InventorytransactionsModule } from './inventorytransactions/inventorytransactions.module';
import { LocationsModule } from './locations/locations.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TenantsModule } from './tenants/tenants.module';
import { UnitsModule } from './units/units.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    TenantsModule,
    CurrenciesModule,
    UnitsModule,
    LocationsModule,
    ExchangerateModule,
    InventorytransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
