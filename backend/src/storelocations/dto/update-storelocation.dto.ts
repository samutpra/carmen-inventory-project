import { IStoreLocationUpdate } from 'lib/interfaces';

export class UpdateStoreLocationDto implements IStoreLocationUpdate {
  id: string;
  code?: string;
  name?: string;
  departmentId?: string;
  isActive?: boolean;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
