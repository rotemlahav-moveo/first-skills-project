import type { ProductDto } from '@shared/products-contracts';

export type ShopCategory = ProductDto['category']['categoryName'];
export type ShopDepartment = NonNullable<ProductDto['department']>['departmentName'];
export type ShopProduct = ProductDto;

export enum SortOption {
  featured = 'featured',
  priceAsc = 'price-asc',
  priceDesc = 'price-desc',
  newest = 'newest',
}

export enum FilterSectionTitle {
  Category = 'Category',
  Size = 'Size',
  Color = 'Color',
  PriceRange = 'Price Range',
  Brand = 'Brand',
}

export type FilterSelections = Partial<Record<FilterSectionTitle, string[]>>;
