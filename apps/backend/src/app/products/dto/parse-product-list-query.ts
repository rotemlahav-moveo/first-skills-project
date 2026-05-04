import {
  parseProductsListQueryArgs,
  type ProductsListQueryArgs,
} from '@shared/products-contracts';

/** Maps Nest/Express `req.query` for GET /products into {@link ProductsListQueryArgs}. */
export function parseProductListQuery(raw: Record<string, unknown>): ProductsListQueryArgs {
  return parseProductsListQueryArgs({
    department: raw['department'],
    sort: raw['sort'],
    category: raw['category'],
    size: raw['size'],
    color: raw['color'],
    priceRange: raw['priceRange'],
    brand: raw['brand'],
  });
}
