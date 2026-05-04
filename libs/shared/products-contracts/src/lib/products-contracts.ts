export const PRODUCT_LIST_SORT_VALUES = ['featured', 'price-asc', 'price-desc', 'newest'] as const;

// ProductListSort is the type of the sort parameter in the GET /products list query string
export type ProductListSort = (typeof PRODUCT_LIST_SORT_VALUES)[number];

/** GET /products list filters: URL query, RTK args, and backend `findAll` input (same keys). */
export type ProductsListQueryArgs = Partial<{
  department: string;
  sort: ProductListSort;
  category: string[];
  size: string[];
  color: string[];
  priceRange: string[];
  brand: string[];
}>;

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
