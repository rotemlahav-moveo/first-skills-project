import { describe, expect, it } from 'vitest';
import { parseProductListQuery } from './parse-product-list-query';

describe('parseProductListQuery', () => {
  it('returns empty object for empty input', () => {
    expect(parseProductListQuery({})).toEqual({});
  });

  it('normalizes department and omits featured sort', () => {
    expect(parseProductListQuery({ department: '  Men ', sort: 'featured' })).toEqual({
      department: 'men',
    });
  });

  it('accepts valid sort and filters', () => {
    expect(
      parseProductListQuery({
        sort: 'price-asc',
        category: ['Tops', 'Bottoms'],
        color: 'Black',
      }),
    ).toEqual({
      sort: 'price-asc',
      category: ['Tops', 'Bottoms'],
      color: ['Black'],
    });
  });

  it('splits comma-separated multi filters into arrays', () => {
    expect(
      parseProductListQuery({
        category: 'Tops,Bottoms',
        color: 'Black,White',
      }),
    ).toEqual({
      category: ['Tops', 'Bottoms'],
      color: ['Black', 'White'],
    });
  });

  it('parses pagination and drops invalid values', () => {
    expect(parseProductListQuery({ page: '2', limit: '24' })).toEqual({ page: 2, limit: 24 });
    expect(parseProductListQuery({ page: '0', limit: '-1' })).toEqual({});
  });
});
