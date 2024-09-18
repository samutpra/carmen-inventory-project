export interface Product {
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

export interface ProductList {
  total: number;
  products: Product[];
}