export interface IService<T, C, U> {
  get: (id: string, tenantId?: string) => T;
  create: (data: C, tenantId?: string) => string;
  update: (id: string, data: U, tenantId?: string) => T;
  delete: (id: string, tenantId?: string) => string;
  getAll: (tenantId?: string) => T[];
}

export interface IAsyncService<T, C, U> {
  get: (id: string, tenantId?: string) => Promise<T>;
  create: (data: C, tenantId?: string) => string;
  update: (id: string, data: U, tenantId?: string) => Promise<T>;
  delete: (id: string, tenantId?: string) => string;
  getAll: (tenantId?: string) => Promise<T[]>;
}
