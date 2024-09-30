import { Test, TestingModule } from '@nestjs/testing';

import { InventorytransactionsController } from './inventorytransactions.controller';
import { InventorytransactionsService } from './inventorytransactions.service';

describe('InventorytransactionsController', () => {
  let controller: InventorytransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventorytransactionsController],
      providers: [InventorytransactionsService],
    }).compile();

    controller = module.get<InventorytransactionsController>(
      InventorytransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
