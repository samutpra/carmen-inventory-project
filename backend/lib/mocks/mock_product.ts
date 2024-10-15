import { Product } from 'lib/entities';
import { faker } from '@faker-js/faker';

export const Mock_Product: Product[] = [
  {
    id: '01J8ZD1ES1APNTFH2F2ERVTNFC',
    code: 'ROOM-STD',
    name: 'Standard Room',
    description: 'Comfortable standard room with basic amenities',
    localDescription: 'Habitación estándar cómoda con servicios básicos',

    productItemGroupId: 'GRP-ACCOM',
    isActive: true,
    price: 0,
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
  },
  {
    id: '01J8ZD1ES1587196BQ5C7M95K6',
    code: 'ROOM-DLX',
    name: 'Deluxe Room',
    description: 'Spacious deluxe room with premium amenities',
    localDescription: 'Habitación de lujo espaciosa con servicios premium',

    productItemGroupId: 'GRP-ACCOM',
    isActive: true,
    price: 0,
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
  },
  {
    id: '01J8ZD1ES1JVC4KGDPK2DKJ8TP',
    code: 'ROOM-STE',
    name: 'Suite',
    description: 'Luxurious suite with separate living area',
    localDescription: 'Suite lujosa con área de estar separada',

    productItemGroupId: 'GRP-ACCOM',
    isActive: true,
    price: 0,
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
  },
  {
    id: '01J8ZD1ES17QP39V3ZJ491J03B',
    code: 'SVC-BRKFST',
    name: 'Breakfast Buffet',
    description: 'Full breakfast buffet service',
    localDescription: 'Servicio de desayuno buffet completo',

    productItemGroupId: 'GRP-DINING',
    isActive: true,
    price: 0,
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
  },
  {
    id: '01J8ZD1ES1YTYYWSKAKG11E9X5',
    code: 'SVC-WIFI',
    name: 'Wi-Fi Service',
    description: 'High-speed Wi-Fi internet access',
    localDescription: 'Acceso a internet Wi-Fi de alta velocidad',

    productItemGroupId: 'GRP-AMENITIES',
    isActive: true,
    price: 0,
    createdAt: faker.date.past({ refDate: new Date() }),
    createdBy: 'USER-01',
    updatedAt: faker.date.past({ refDate: new Date() }),
    updatedBy: 'USER-01',
  },
];
