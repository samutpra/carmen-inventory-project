export interface IProduct {
  id: string;
  productCode: string;
  name: string;
  categoryId: string;
  subCategoryId: string;
  basePrice: number;
  currency: string;
  isActive: boolean;
  primaryInventoryUnitId: string;
}

export interface IProductList {
  total: number;
  data: IProduct[];
}