import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DrizzleModule],
})
export class ProductsModule {}
