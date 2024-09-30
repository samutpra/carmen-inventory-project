import { InventoryTransaction } from 'src/entities';
import { faker } from '@faker-js/faker';

export const Mock_InventoryTransaction: InventoryTransaction[] = [
  {
    id: '01J8ZD4QYBYTFY048VW5PNKH7M',
    code: 'USD',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
  },
  {
    id: '01J8ZD4QYBFJZ6NGF8QWNZCSYW',
    code: 'EUR',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
  },
  {
    id: '01J8ZD4QYBY11DRYXNAVEN7JQX',
    code: 'JPY',
    create_On: faker.date.past({ refDate: new Date() }),
    update_On: faker.date.past({ refDate: new Date() }),
  },
];
