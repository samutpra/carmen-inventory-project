import { Test, TestingModule } from '@nestjs/testing';
import { DbTenantService } from './db_tenant.service';

describe('DbTenantService', () => {
  let service: DbTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbTenantService],
    }).compile();

    service = module.get<DbTenantService>(DbTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
