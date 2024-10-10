import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface IDeliveryPoint extends IBasePimaryKey, IBaseTable {
  name: string;
  description: string;
  isActive: boolean;
}

export interface IDeliveryPointCreate extends Partial<IDeliveryPoint> {
  name: string;
  description: string;
  isActive: boolean;
}

export interface IDeliveryPointUpdate extends Partial<IDeliveryPoint> {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}
