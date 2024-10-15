import { IStoreLocationCreate } from 'lib/interfaces';

export class CreateStoreLocationDto implements IStoreLocationCreate {
  code: string;
  name: string;
  departmentId: string;
  isActive: boolean;
  id?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
