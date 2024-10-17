import { Test, TestingModule } from '@nestjs/testing';
import { DbSystemService } from './db_system.service';

describe('DbSystemService', () => {
  let service: DbSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbSystemService],
    }).compile();

    service = module.get<DbSystemService>(DbSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
