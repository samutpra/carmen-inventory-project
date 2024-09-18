import { ProductList } from "@/types/interfaces/Product";

export const mock_productList: ProductList = {
  total: 4,
  products: [
    {
      id: "1",
      productCode: "123456",
      name: "Product 1",
      categoryId: "1",
      subCategoryId: "1",
      basePrice: 100,
      currency: "USD",
      isActive: true,
      primaryInventoryUnitId: "1",
    },
    {
      id: "2",
      productCode: "123457",
      name: "Product 2",
      categoryId: "2",
      subCategoryId: "2",
      basePrice: 200,
      currency: "EUR",
      isActive: true,
      primaryInventoryUnitId: "1",
    },
    {
      id: "3",
      productCode: "123458",
      name: "Product 3",
      categoryId: "3",
      subCategoryId: "3",
      basePrice: 300,
      currency: "GBP",
      isActive: true,
      primaryInventoryUnitId: "1",
    },
    {
      id: "4",
      productCode: "123459",
      name: "Product 4",
      categoryId: "4",
      subCategoryId: "4",
      basePrice: 400,
      currency: "CAD",
      isActive: true,
      primaryInventoryUnitId: "1",
    },
  ],
};
