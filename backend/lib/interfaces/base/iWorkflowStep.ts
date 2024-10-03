import { IBasePimaryKey, IBaseTable } from './iBase';
import { enumWorkflowStage, enumWorkflowStatus } from 'lib/enums';

export interface IWorkflowStep extends IBasePimaryKey, IBaseTable {
  stage: enumWorkflowStage;
  status: enumWorkflowStatus;
}
