import { IBasePimaryKey, IBaseTable } from '../helper/iBase';
import {
  enumDocumentStatus,
  enumWorkflowStage,
  enumWorkflowStatus,
} from 'lib/enums';

import { IActivityLog } from '../helper/iActivityLog';
import { ICommentAndAttachment } from '../helper/iCommentAndAttachment';
import { IMoney } from '../helper/iMoney';
import { IPRType } from './iPRType';
import { IPurchaseRequestItem } from './iPurchaseRequestItem';
import { IWorkflowStep } from './iWorkflowStep';

export interface IPurchaseRequest extends IBasePimaryKey, IBaseTable {
  refNumber: string;
  createDate: Date;
  type: IPRType;
  deliveryDate: Date;
  description: string;
  requestorId: string;

  status: enumDocumentStatus;
  workflowStatus: enumWorkflowStatus;
  currentWorkflowStage: enumWorkflowStage;

  storeLocationId: string;

  attachments: ICommentAndAttachment[];

  subtotal: IMoney;
  tax: IMoney;
  totalAmount: IMoney;
  jobCode: string;
  department: string;
  budgetCode: string;
  allocatedBudget: IMoney;
  yearToDateSpending: IMoney;
  exchangeRate: number;
  exchangeRateDate: Date;
  paymentMethod?: string;
  paymentTerms?: string;
  earlyPaymentDiscount?: string;
  comments?: ICommentAndAttachment[];
  approvals: IWorkflowStep[];
  deliveryPoint: string;
  activityLog: IActivityLog[];
  additionalCharges: IMoney;

  items: IPurchaseRequestItem[];
}
