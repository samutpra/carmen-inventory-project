import { Tenant } from 'src/entities';
import { faker } from '@faker-js/faker';

export const Mock_Tenant: Tenant[] = [
  {
    id: '01J8ZD4QYBYTFY048VW5PNKH7M',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'Sunset Beach Resort',
    description: 'A luxurious beachfront resort with stunning ocean views',
    isActive: true,
  },
  {
    id: '01J8ZD4QYBFJZ6NGF8QWNZCSYW',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'Mountain View Lodge',
    description:
      'Cozy mountain retreat offering scenic hiking trails and ski access',
    isActive: true,
  },
  {
    id: '01J8ZD4QYBY11DRYXNAVEN7JQX',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'City Center Suites',
    description:
      'Modern urban hotel in the heart of downtown, perfect for business travelers',
    isActive: true,
  },
];
