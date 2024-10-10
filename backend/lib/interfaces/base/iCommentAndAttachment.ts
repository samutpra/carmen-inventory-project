import { IBasePimaryKey, IBaseTable } from '../helper/iBase';

export interface ICommentAndAttachment extends IBasePimaryKey, IBaseTable {
  comment?: string;
  attachments?: File;
  timeStamp: Date;
  isActive: boolean;
  publicAccess: boolean;
}

export interface ICommentAndAttachmentCreate
  extends Partial<ICommentAndAttachment> {
  comment?: string;
  attachments?: File;
  timeStamp: Date;
  isActive: boolean;
  publicAccess: boolean;
}

export interface ICommentAndAttachmentUpdate
  extends Partial<ICommentAndAttachment> {
  id: string;
  comment?: string;
  attachments?: File;
  timeStamp?: Date;
  isActive?: boolean;
  publicAccess?: boolean;
}
