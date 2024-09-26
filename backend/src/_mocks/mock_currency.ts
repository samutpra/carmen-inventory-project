import { Currency } from './../currencies/entities/currency.entity';
import { v4 as uuidv4 } from 'uuid';

export const Mock_Currency: Currency[] = [
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
    isActive: true,
  },
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    isActive: false,
  },
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'Japanese Yen',
    code: 'JPY',
    symbol: '¥',
    isActive: false,
  },
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'British Pound',
    code: 'GBP',
    symbol: '£',
    isActive: false,
  },
  {
    id: uuidv4(),
    create_On: new Date(),
    update_On: new Date(),
    name: 'Swiss Franc',
    code: 'CHF',
    symbol: 'Fr',
    isActive: false,
  },
];
