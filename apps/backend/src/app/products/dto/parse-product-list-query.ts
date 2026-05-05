import {
  PRODUCT_LIST_SORT_VALUES,
  type ProductListSort,
  type ProductsListQueryArgs,
} from '../../../../../../libs/shared/products-contracts/src';

function normalizeMulti(value: unknown): string[] | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    const values = value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    return values.length > 0 ? values : undefined;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? [trimmed] : undefined;
  }
  return undefined;
}

// parsePositiveInt is a helper function to parse a positive integer from a value (page and limit for pagination)
function parsePositiveInt(value: unknown): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string' && typeof raw !== 'number') {
    return undefined;
  }
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return undefined;
  }
  return parsed;
}

function parseSort(value: unknown): ProductListSort | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return (PRODUCT_LIST_SORT_VALUES as readonly string[]).includes(trimmed)
    ? (trimmed as ProductListSort)
    : undefined;
}

/** Maps Nest/Express `req.query` for GET /products into {@link ProductsListQueryArgs}. */
export function parseProductListQuery(raw: Record<string, unknown>): ProductsListQueryArgs {
  const result: ProductsListQueryArgs = {};

  if (typeof raw['department'] === 'string') {
    const department = raw['department'].trim().toLowerCase();
    if (department.length > 0) {
      result.department = department;
    }
  }

  const sort = parseSort(raw['sort']);
  if (sort && sort !== 'featured') {
    result.sort = sort;
  }

  const page = parsePositiveInt(raw['page']);
  if (page) {
    result.page = page;
  }
  const limit = parsePositiveInt(raw['limit']);
  if (limit) {
    result.limit = limit;
  }

  const category = normalizeMulti(raw['category']);
  if (category) {
    result.category = category;
  }
  const size = normalizeMulti(raw['size']);
  if (size) {
    result.size = size;
  }
  const color = normalizeMulti(raw['color']);
  if (color) {
    result.color = color;
  }
  const priceRange = normalizeMulti(raw['priceRange']);
  if (priceRange) {
    result.priceRange = priceRange;
  }
  const brand = normalizeMulti(raw['brand']);
  if (brand) {
    result.brand = brand;
  }

  return result;
}
