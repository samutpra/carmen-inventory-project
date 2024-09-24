import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
