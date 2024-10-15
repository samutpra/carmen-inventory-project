import { ICommentAndAttachment, IDepartmentCreate } from 'lib/interfaces';

export class CreateDepartmentDto implements IDepartmentCreate {
  name: string;
  description?: string;
  isActive: boolean;
  comments?: ICommentAndAttachment[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
