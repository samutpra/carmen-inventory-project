import { IStoreLocationUpdate } from 'lib/interfaces';

export class UpdateStoreLocationDto implements IStoreLocationUpdate {
  id: string;
  code?: string;
  name?: string;
  departmentId?: string;
  isActive?: boolean;
  created_On?: Date;
  created_By?: string;
  updated_On?: Date;
  updated_By?: string;
}
