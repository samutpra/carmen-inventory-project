import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';

@Module({
  imports: [UserModule],
  providers: [AppService],
})
export class AppModule {}
