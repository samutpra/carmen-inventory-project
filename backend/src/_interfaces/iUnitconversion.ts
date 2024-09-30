export interface IUnitConversion {
  id: string;
  name: string;
  conversionFactor: number;

  type: string;
  unitType: 'INVENTORY' | 'ORDER' | 'RECIPE' | 'COUNTING';

  fromUnit: string;
  toUnit: string;
}
