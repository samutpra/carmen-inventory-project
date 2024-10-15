import { Tenant } from 'lib/entities';
import { faker } from '@faker-js/faker';

export const Mock_Tenant: Tenant[] = [
  {
    id: '01J8ZD4QYBYTFY048VW5PNKH7M',
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
    name: 'Sunset Beach Resort',
    description: 'A luxurious beachfront resort with stunning ocean views',
    isActive: true,
  },
  {
    id: '01J8ZD4QYBFJZ6NGF8QWNZCSYW',
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
    name: 'Mountain View Lodge',
    description:
      'Cozy mountain retreat offering scenic hiking trails and ski access',
    isActive: true,
  },
  {
    id: '01J8ZD4QYBY11DRYXNAVEN7JQX',
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
    name: 'City Center Suites',
    description:
      'Modern urban hotel in the heart of downtown, perfect for business travelers',
    isActive: true,
  },
];
