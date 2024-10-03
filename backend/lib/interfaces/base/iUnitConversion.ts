import { IBasePimaryKey, IBaseTable } from './iBase';

import { IUnit } from './iUnit';
import { enumUnitType } from 'lib/enums';

export interface IUnitConversion extends IBasePimaryKey, IBaseTable {
  name: string;
  unitType: enumUnitType;

  fromUnitId: string;
  fromUnit: IUnit;
  toUnitId: string;
  toUnit: IUnit;

  conversionFactor: number;
}
