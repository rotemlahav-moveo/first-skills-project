import {
  PRODUCT_LIST_SORT_VALUES,
  type ProductListSort,
  type ProductsListQueryArgs,
} from './products-contracts';

/** Same keys as {@link ProductsListQueryArgs}; values are untyped (wire / URL). */
export type ProductsListQueryInput = Partial<Record<keyof ProductsListQueryArgs, unknown>>;

function normalizeMulti(value: unknown): string[] | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    const list = value
      .filter((item): item is string => typeof item === 'string')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return list.length > 0 ? list : undefined;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? [trimmed] : undefined;
  }
  return undefined;
}

function parseDepartment(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const normalized = value.trim().toLowerCase();
  return normalized.length > 0 ? normalized : undefined;
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

/** Sort for list args: omit `featured` (default) so URL, RTK, and backend stay aligned. */
function sortForListArgs(value: unknown): ProductListSort | undefined {
  const parsed = parseSort(value);
  return parsed && parsed !== 'featured' ? parsed : undefined;
}

/**
 * Normalizes list-query fields into {@link ProductsListQueryArgs}.
 * Used by the Nest `GET /products` parser and the shop URL → RTK pipeline.
 */
export function parseProductsListQueryArgs(input: ProductsListQueryInput): ProductsListQueryArgs {
  const result: ProductsListQueryArgs = {};
  const department = parseDepartment(input.department);
  if (department) {
    result.department = department;
  }
  const sort = sortForListArgs(input.sort);
  if (sort) {
    result.sort = sort;
  }
  const category = normalizeMulti(input.category);
  if (category) {
    result.category = category;
  }
  const size = normalizeMulti(input.size);
  if (size) {
    result.size = size;
  }
  const color = normalizeMulti(input.color);
  if (color) {
    result.color = color;
  }
  const priceRange = normalizeMulti(input.priceRange);
  if (priceRange) {
    result.priceRange = priceRange;
  }
  const brand = normalizeMulti(input.brand);
  if (brand) {
    result.brand = brand;
  }
  return result;
}
