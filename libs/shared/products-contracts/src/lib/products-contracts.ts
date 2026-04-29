export const ProductDepartment = {
  men: 'men',
  woman: 'woman',
  accessories: 'accessories',
} as const;

export type ProductDepartment = (typeof ProductDepartment)[keyof typeof ProductDepartment];

export type ProductCategoryDto = {
  categoryId: string;
  categoryName: string;
};

export type ProductDepartmentDto = {
  departmentId: string;
  departmentName: ProductDepartment;
};

export type ProductDto = {
  productId: string;
  productName: string;
  description: string;
  price: number;
  sizes: string[];
  color: string;
  brand: string;
  imageUrl: string;
  createdAt: string;
  category: ProductCategoryDto;
  department: ProductDepartmentDto | null;
};
