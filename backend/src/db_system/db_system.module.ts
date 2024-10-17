import { Global, Module } from '@nestjs/common';

import { DbSystemService } from './db_system.service';

@Global() // Global() decorator is used to make the module available to the entire application
@Module({
  providers: [DbSystemService],
  exports: [DbSystemService],
})
export class DbSystemModule {}
