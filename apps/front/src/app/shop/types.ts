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

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export type FilterSectionTitle = 'Category' | 'Size' | 'Color' | 'Price Range' | 'Brand';


/* FilterSelections =
{
  Category?: string[];
  Size?: string[];
  Color?: string[];
  "Price Range"?: string[];
  Brand?: string[];
} */
export type FilterSelections = Partial<Record<FilterSectionTitle, string[]>>;
