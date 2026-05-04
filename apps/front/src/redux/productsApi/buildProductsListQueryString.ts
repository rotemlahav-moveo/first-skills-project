import type { ProductsListQueryArgs } from '@shared/products-contracts';

/** Builds a query string for GET /products with repeated keys for array facets. */
export function buildProductsListQueryString(args?: ProductsListQueryArgs): string {
  if (!args) {
    return '';
  }

  const usp = new URLSearchParams();

  if (args.department?.trim()) {
    usp.set('department', args.department.trim().toLowerCase());
  }

  if (args.sort && args.sort !== 'featured') {
    usp.set('sort', args.sort);
  }

  for (const value of args.category ?? []) {
    if (value.trim()) {
      usp.append('category', value.trim());
    }
  }
  for (const value of args.size ?? []) {
    if (value.trim()) {
      usp.append('size', value.trim());
    }
  }
  for (const value of args.color ?? []) {
    if (value.trim()) {
      usp.append('color', value.trim());
    }
  }
  for (const value of args.priceRange ?? []) {
    if (value.trim()) {
      usp.append('priceRange', value.trim());
    }
  }
  for (const value of args.brand ?? []) {
    if (value.trim()) {
      usp.append('brand', value.trim());
    }
  }

  return usp.toString();
}
