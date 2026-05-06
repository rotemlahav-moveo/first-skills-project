import { describe, expect, it } from 'vitest';
import type { ShopFiltersFormInput } from './formSchema';
import { mapFormToUrl, parseUrlToApiArgs, shopListQueriesEquivalent } from './shopSearchParams';
import { FilterSectionTitle, SortOption } from './types';

const baseFormValues: ShopFiltersFormInput = {
  sort: SortOption.priceAsc,
  filters: {
    [FilterSectionTitle.Category]: ['Tops'],
    [FilterSectionTitle.Size]: [],
    [FilterSectionTitle.Color]: ['Black'],
    [FilterSectionTitle.PriceRange]: [],
    [FilterSectionTitle.Brand]: ['Nike'],
  },
};

describe('shopSearchParams', () => {
  it('parses page and limit from URL', () => {
    const params = new URLSearchParams(
      'department=men&sort=price-asc&page=2&limit=20&category=Tops&color=Black&brand=Nike',
    );

    expect(parseUrlToApiArgs(params)).toEqual({
      department: 'men',
      sort: 'price-asc',
      page: 2,
      limit: 20,
      category: ['Tops'],
      color: ['Black'],
      brand: ['Nike'],
    });
  });

  it('writes page and limit to URL when provided', () => {
    const params = mapFormToUrl(baseFormValues, 'men', 3, 20);

    expect(params.toString()).toContain('page=3');
    expect(params.toString()).toContain('limit=20');
  });

  it('treats URL and form as equivalent even if page differs', () => {
    const params = new URLSearchParams(
      'department=men&sort=price-asc&page=4&limit=20&category=Tops&color=Black&brand=Nike',
    );

    expect(shopListQueriesEquivalent(params, baseFormValues, 'men')).toBe(true);
  });
});
