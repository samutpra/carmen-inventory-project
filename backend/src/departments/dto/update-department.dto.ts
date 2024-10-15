import { ICommentAndAttachment, IDepartmentUpdate } from 'lib/interfaces';

export class UpdateDepartmentDto implements IDepartmentUpdate {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  comments?: ICommentAndAttachment[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
