import { ExchangeRate } from 'lib/entities';
import { faker } from '@faker-js/faker';

export const Mock_ExchangeRate: ExchangeRate[] = [
  {
    id: '01J8ZD4QYBYTFY048VW5PNKH7M',
    currencyId: 'CURRENCY-ID-001',
    atDate: faker.date.past({ refDate: new Date() }),
    rate: 200.0,
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
  },
  {
    id: '01J8ZD4QYBFJZ6NGF8QWNZCSYW',
    currencyId: 'CURRENCY-ID-002',
    atDate: faker.date.past({ refDate: new Date() }),
    rate: 35.0,
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
  },
  {
    id: '01J8ZD4QYBY11DRYXNAVEN7JQX',
    currencyId: 'CURRENCY-ID-003',
    atDate: faker.date.past({ refDate: new Date() }),
    rate: 0.0043,
    created_On: faker.date.past({ refDate: new Date() }),
    created_by: 'USER-01',
    updated_On: faker.date.past({ refDate: new Date() }),
    updated_by: 'USER-01',
  },
];
