import { IStoreLocationCreate } from 'lib/interfaces';

export class CreateStoreLocationDto implements IStoreLocationCreate {
  code: string;
  name: string;
  departmentId: string;
  isActive: boolean;
  id?: string;
  created_On?: Date;
  created_By?: string;
  updated_On?: Date;
  updated_By?: string;
}
