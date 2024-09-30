import { Currency } from 'src/entities';
import { faker } from '@faker-js/faker';

export const Mock_Currency: Currency[] = [
  {
    id: '01J8ZCTHG9VWZJDSRMRNPTVAZ1',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
    isActive: true,
  },
  {
    id: '01J8ZCTHG9EG0PZXH66JY1WE5C',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    isActive: false,
  },
  {
    id: '01J8ZCTHGAQ0D330S3TAKCMEC0',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'Japanese Yen',
    code: 'JPY',
    symbol: '¥',
    isActive: false,
  },
  {
    id: '01J8ZCTHGABNDVCHS8R36N2ABJ',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'British Pound',
    code: 'GBP',
    symbol: '£',
    isActive: false,
  },
  {
    id: '01J8ZCTHGABNDVCHS8R36N2ABJ',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
    name: 'Swiss Franc',
    code: 'CHF',
    symbol: 'Fr',
    isActive: false,
  },
];
