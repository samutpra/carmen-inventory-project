import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesModule } from './currencies/currencies.module';
import { DbSystemModule } from './db_system/db_system.module';
import { DbTenantModule } from './db_tenant/db_tenant.module';
import { DepartmentsModule } from './departments/departments.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StoreLocationsModule } from './storelocations/storelocations.module';
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
    StoreLocationsModule,
    ExchangerateModule,
    AuthModule,
    DepartmentsModule,
    DbSystemModule,
    DbTenantModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
