import {
  PRODUCT_LIST_SORT_VALUES,
  type ProductListSort,
  type ProductsListQueryArgs,
} from '@shared/products-contracts';

import type { ShopFiltersFormInput } from './formSchema';
import { FilterSectionTitle, SortOption } from './types';

// nonempty is a helper function to remove empty strings from an array
function nonempty(arr: string[] | undefined): string[] | undefined {
  const next = (arr ?? []).map((s) => s.trim()).filter((s) => s.length > 0);
  return next.length > 0 ? next : undefined;
}

function parseSort(value: string | null): ProductListSort | undefined {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  if (!(PRODUCT_LIST_SORT_VALUES as readonly string[]).includes(trimmed)) {
    return undefined;
  }
  return trimmed === 'featured' ? undefined : (trimmed as ProductListSort);
}

/** URL search params → `GET /products` query shape (featured sort omitted). */
export function parseUrlToApiArgs(searchParams: URLSearchParams): ProductsListQueryArgs {
  const department = searchParams.get('department')?.trim().toLowerCase();
  return {
    department: department ? department : undefined,
    sort: parseSort(searchParams.get('sort')),
    category: nonempty(searchParams.getAll('category')),
    size: nonempty(searchParams.getAll('size')),
    color: nonempty(searchParams.getAll('color')),
    priceRange: nonempty(searchParams.getAll('priceRange')),
    brand: nonempty(searchParams.getAll('brand')),
  };
}
/** URL search params → shop filter/sort form values. */
export function parseUrlToForm(searchParams: URLSearchParams): ShopFiltersFormInput {
  const args = parseUrlToApiArgs(searchParams);
  const sortEnum =
    args.sort !== undefined && (Object.values(SortOption) as string[]).includes(args.sort)
      ? (args.sort as SortOption)
      : SortOption.featured;

  return {
    sort: sortEnum,
    filters: {
      [FilterSectionTitle.Category]: args.category ?? [],
      [FilterSectionTitle.Size]: args.size ?? [],
      [FilterSectionTitle.Color]: args.color ?? [],
      [FilterSectionTitle.PriceRange]: args.priceRange ?? [],
      [FilterSectionTitle.Brand]: args.brand ?? [],
    },
  };
}
/** Shop form values → `GET /products` query shape. */
export function mapFormToApiArgs(
  formValues: ShopFiltersFormInput,
  department: string | null | undefined,
): ProductsListQueryArgs {
  return {
    department: department?.trim() ? department.trim().toLowerCase() : undefined,
    sort: formValues.sort === SortOption.featured ? undefined : formValues.sort,
    category: nonempty(formValues.filters[FilterSectionTitle.Category]),
    size: nonempty(formValues.filters[FilterSectionTitle.Size]),
    color: nonempty(formValues.filters[FilterSectionTitle.Color]),
    priceRange: nonempty(formValues.filters[FilterSectionTitle.PriceRange]),
    brand: nonempty(formValues.filters[FilterSectionTitle.Brand]),
  };
}
/** Shop form values → URL search params. */
export function mapFormToUrl(
  formValues: ShopFiltersFormInput,
  department: string | null | undefined,
): URLSearchParams {
  const args = mapFormToApiArgs(formValues, department);
  const params = new URLSearchParams();

  if (args.department) {
    params.set('department', args.department);
  }
  if (args.sort) {
    params.set('sort', args.sort);
  }
  for (const value of args.category ?? []) {
    params.append('category', value);
  }
  for (const value of args.size ?? []) {
    params.append('size', value);
  }
  for (const value of args.color ?? []) {
    params.append('color', value);
  }
  for (const value of args.priceRange ?? []) {
    params.append('priceRange', value);
  }
  for (const value of args.brand ?? []) {
    params.append('brand', value);
  }

  return params;
}
/** True when URL and form describe the same list query (including department). */
export function shopListQueriesEquivalent(
  searchParams: URLSearchParams,
  formValues: ShopFiltersFormInput,
  department: string | null | undefined,
): boolean {
  const fromUrl = parseUrlToApiArgs(searchParams);
  const fromForm = mapFormToApiArgs(formValues, department);
  return JSON.stringify(fromUrl) === JSON.stringify(fromForm);
}
