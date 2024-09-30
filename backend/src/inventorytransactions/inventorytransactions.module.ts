import { InventorytransactionsController } from './inventorytransactions.controller';
import { InventorytransactionsService } from './inventorytransactions.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [InventorytransactionsController],
  providers: [InventorytransactionsService],
})
export class InventorytransactionsModule {}
