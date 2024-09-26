export interface IUnitConversion {
  unitId: string;
  unitName: string;
  conversionFactor: number;

  type: string;
  unitType: 'INVENTORY' | 'ORDER' | 'RECIPE' | 'COUNTING';

  fromUnit: string;
  toUnit: string;
}
