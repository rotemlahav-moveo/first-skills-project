import type { FilterSelections, ShopProduct, SortOption } from './types';

function matchesPriceRange(price: number, label: string): boolean {
  switch (label) {
    case 'Under $50':
      return price < 50;
    case '$50 - $100':
      return price >= 50 && price <= 100;
    case '$100 - $200':
      return price > 100 && price <= 200;
    case 'Over $200':
      return price > 200;
    default:
      return false;
  }
}

export function filterProducts(products: ShopProduct[], selections: FilterSelections): ShopProduct[] {
  return products.filter((product) => {
    const categories = selections.Category ?? [];
    if (categories.length > 0 && !categories.includes(product.category.categoryName)) {
      return false;
    }

    const sizes = selections.Size ?? [];
    if (sizes.length > 0 && !product.sizes.some((s) => sizes.includes(s))) {
      return false;
    }

    const colors = selections.Color ?? [];
    if (colors.length > 0 && !colors.includes(product.color)) {
      return false;
    }

    const priceRanges = selections['Price Range'] ?? [];
    if (priceRanges.length > 0 && !priceRanges.some((label) => matchesPriceRange(product.price, label))) {
      return false;
    }

    const brands = selections.Brand ?? [];
    if (brands.length > 0 && !brands.includes(product.brand)) {
      return false;
    }

    return true;
  });
}

export function sortProducts(products: ShopProduct[], sort: SortOption): ShopProduct[] {
  const copy = [...products];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'newest':
      return copy.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case 'featured':
    default:
      return copy;
  }
}
