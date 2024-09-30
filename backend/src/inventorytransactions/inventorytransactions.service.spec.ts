import { Test, TestingModule } from '@nestjs/testing';

import { InventorytransactionsService } from './inventorytransactions.service';

describe('InventorytransactionsService', () => {
  let service: InventorytransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventorytransactionsService],
    }).compile();

    service = module.get<InventorytransactionsService>(
      InventorytransactionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
