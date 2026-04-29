export type ShopCategory = 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes';
export type ShopDepartment = 'men' | 'woman' | 'accessories';

export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  category: ShopCategory;
  sizes: string[];
  color: string;
  brand: string;
  imageUrl: string;
  /** ISO timestamp; later date = newer for "Newest" sort */
  createdAt: string;
  department: ShopDepartment | null;
};

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
