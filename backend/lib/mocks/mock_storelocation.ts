import { StoreLocation } from 'lib/entities';
import { faker } from '@faker-js/faker';

export const Mock_StoreLocation: StoreLocation[] = [
  {
    id: '01J8ZD4QYBYTFY048VW5PNKH7M',
    code: 'ST-001',
    name: 'IT',
    departmentId: 'DEPARTMENT-ID-001',
    isActive: false,
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
  },
  {
    id: '01J8ZD4QYBFJZ6NGF8QWNZCSYW',
    code: 'ST-002',
    name: 'House Keeping',
    departmentId: 'DEPARTMENT-ID-002',
    isActive: false,
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
  },
  {
    id: '01J8ZD4QYBY11DRYXNAVEN7JQX',
    code: 'ST-003',
    name: 'Maid',
    departmentId: 'DEPARTMENT-ID-003',
    isActive: false,
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
  },
];
