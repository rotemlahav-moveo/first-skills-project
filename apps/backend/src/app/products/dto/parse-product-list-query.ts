import {
  PRODUCT_LIST_SORT_VALUES,
  parsePositiveInt,
  type ProductListSort,
  type ProductsListQueryArgs,
} from '../../../../../../libs/shared/products-contracts/src';

function normalizeMulti(value: unknown): string[] | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const splitAndNormalize = (rawValues: string[]): string[] => {
    return rawValues
      .flatMap((item) => item.split(','))
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };
  if (Array.isArray(value)) {
    const values = splitAndNormalize(value.filter((item): item is string => typeof item === 'string'));
    return values.length > 0 ? values : undefined;
  }
  if (typeof value === 'string') {
    const values = splitAndNormalize([value]);
    return values.length > 0 ? values : undefined;
  }
  return undefined;
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
