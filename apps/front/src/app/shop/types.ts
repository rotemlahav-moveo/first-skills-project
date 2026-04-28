export type ShopCategory = 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes';

export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  category: ShopCategory;
  sizes: string[];
  color: string;
  brand: string;
  imageUrl: string;
  /** Higher = newer for “Newest” sort */
  newness: number;
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
