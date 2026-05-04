import { describe, expect, it } from 'vitest';
import { buildProductsListQueryString } from './buildProductsListQueryString';

describe('buildProductsListQueryString', () => {
  it('returns empty string for undefined', () => {
    expect(buildProductsListQueryString(undefined)).toBe('');
  });

  it('serializes department and repeated categories', () => {
    const qs = buildProductsListQueryString({
      department: 'Men',
      category: ['Tops', 'Bottoms'],
    });
    expect(qs).toContain('department=men');
    expect(qs).toContain('category=Tops');
    expect(qs).toContain('category=Bottoms');
  });

  it('omits sort when featured', () => {
    expect(buildProductsListQueryString({ sort: 'featured' })).toBe('');
  });

  it('includes non-featured sort', () => {
    expect(buildProductsListQueryString({ sort: 'newest' })).toBe('sort=newest');
  });
});
