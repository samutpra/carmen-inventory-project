import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DrizzleDB } from 'src/drizzle/types/drizzle.d';
import { DrizzleModule } from './../drizzle/drizzle.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    // { provide: DrizzleDB, useValue: drizzleConnection },
  ],
  imports: [DrizzleModule],
})
export class DepartmentsModule {}
