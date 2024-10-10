export interface IBasePimaryKey {
  id: string;
}

export class BasePrimaryKey implements IBasePimaryKey {
  id: string;
}

export interface IBaseTable {
  created_On: Date;
  created_By: string;
  updated_On?: Date;
  updated_By?: string;
  // deleted_On?: Date;
  // deleted_By?: string;
  // isDeleted?: boolean;
}

export class BaseTable implements IBaseTable {
  created_On: Date;
  created_By: string;
  updated_On?: Date;
  updated_By?: string;
  // deleted_On?: Date;
  // deleted_By?: string;
  // isDeleted?: boolean;
}
