export type DepartmentDto = {
  departmentId: string;
  departmentName: string;
  slug: string;
  imageUrl: string;
};

export type DepartmentDetailsDto = DepartmentDto;

export type ProductDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  department: string | null;
  sizes: string[];
  color: string;
  brand: string;
  imageUrl: string;
  createdAt: string;
};
