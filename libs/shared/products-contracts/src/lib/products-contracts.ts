export type DepartmentDto = {
  departmentId: string;
  departmentName: string;
  slug: string;
  imageUrl: string;
};

export type DepartmentDetailsDto = DepartmentDto;

export type CategoryDto = {
  categoryId: string;
  categoryName: string;
};

export type ProductDto = {
  productId: string;
  productName: string;
  description: string;
  price: number;
  category: CategoryDto;
  department: DepartmentDto | null;
  sizes: string[];
  color: string;
  brand: string;
  imageUrl: string;
  createdAt: string;
};
