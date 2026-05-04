import { parseProductsListQueryArgs, type ProductsListQueryArgs } from '@shared/products-contracts';

import { buildProductsListQueryString } from '../../redux/productsApi/buildProductsListQueryString';
import type { ShopFiltersFormInput } from './formSchema';
import { FilterSectionTitle, SortOption } from './types';

// nonempty is a helper function to remove empty strings from an array
function nonempty(arr: string[] | undefined): string[] | undefined {
  const next = (arr ?? []).map((s) => s.trim()).filter((s) => s.length > 0);
  return next.length > 0 ? next : undefined;
}
/** URL search params → `GET /products` query shape (featured sort omitted). */
export function parseUrlToApiArgs(searchParams: URLSearchParams): ProductsListQueryArgs {
  return parseProductsListQueryArgs({
    department: searchParams.get('department'),
    sort: searchParams.get('sort'),
    category: searchParams.getAll('category'),
    size: searchParams.getAll('size'),
    color: searchParams.getAll('color'),
    priceRange: searchParams.getAll('priceRange'),
    brand: searchParams.getAll('brand'),
  });
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
  return new URLSearchParams(buildProductsListQueryString(mapFormToApiArgs(formValues, department)));
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
