import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesModule } from './currencies/currencies.module';
import { DepartmentsModule } from './departments/departments.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { ExtractReqModule } from './auth/extract-req/extract-req.module';
import { Module } from '@nestjs/common';
import { PrismaClientManagerModule } from './prisma-client-manager/prisma-client-manager.module';
import { ProductsModule } from './products/products.module';
import { StoreLocationsModule } from './storelocations/storelocations.module';
import { TenantsModule } from './tenants/tenants.module';
import { UnitsModule } from './units/units.module';
import { UserModule } from './users/users.module';
import { UserTenantModule } from './user-tenant/user-tenant.module';
import { TenantUserModule } from './tenant-user/tenant-user.module';

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
    PrismaClientManagerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaClientManagerModule,
    ExtractReqModule,
    UserTenantModule,
    TenantUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
