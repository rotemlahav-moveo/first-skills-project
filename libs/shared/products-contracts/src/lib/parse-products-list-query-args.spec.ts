import { describe, expect, it } from 'vitest';
import { parseProductsListQueryArgs } from './parse-products-list-query-args';

describe('parseProductsListQueryArgs', () => {
  it('returns empty object for empty input', () => {
    expect(parseProductsListQueryArgs({})).toEqual({});
  });

  it('normalizes department', () => {
    expect(parseProductsListQueryArgs({ department: '  Men ' })).toEqual({ department: 'men' });
  });

  it('accepts valid non-featured sort', () => {
    expect(parseProductsListQueryArgs({ sort: 'price-asc' })).toEqual({ sort: 'price-asc' });
  });

  it('drops invalid sort', () => {
    expect(parseProductsListQueryArgs({ sort: 'nope' })).toEqual({});
  });

  it('omits featured sort', () => {
    expect(parseProductsListQueryArgs({ sort: 'featured' })).toEqual({});
  });

  it('normalizes repeated category to array', () => {
    expect(parseProductsListQueryArgs({ category: ['Tops', 'Bottoms'] })).toEqual({
      category: ['Tops', 'Bottoms'],
    });
  });

  it('normalizes single string category', () => {
    expect(parseProductsListQueryArgs({ category: 'Tops' })).toEqual({ category: ['Tops'] });
  });

  it('maps size color priceRange brand keys', () => {
    expect(
      parseProductsListQueryArgs({
        size: 'M',
        color: 'Black',
        priceRange: ['Under $50', '$50 - $100'],
        brand: 'Brand A',
      }),
    ).toEqual({
      size: ['M'],
      color: ['Black'],
      priceRange: ['Under $50', '$50 - $100'],
      brand: ['Brand A'],
    });
  });
});
