import { Tenant } from 'lib/entities';
import { faker } from '@faker-js/faker';

export const Mock_Tenant: Tenant[] = [
  {
    id: '01J8ZD4QYBYTFY048VW5PNKH7M',
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
    name: 'Sunset Beach Resort',
    description: 'A luxurious beachfront resort with stunning ocean views',
    isActive: true,
  },
  {
    id: '01J8ZD4QYBFJZ6NGF8QWNZCSYW',
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
    name: 'Mountain View Lodge',
    description:
      'Cozy mountain retreat offering scenic hiking trails and ski access',
    isActive: true,
  },
  {
    id: '01J8ZD4QYBY11DRYXNAVEN7JQX',
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
    name: 'City Center Suites',
    description:
      'Modern urban hotel in the heart of downtown, perfect for business travelers',
    isActive: true,
  },
];
