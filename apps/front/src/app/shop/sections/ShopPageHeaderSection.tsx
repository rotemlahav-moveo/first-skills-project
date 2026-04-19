import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SortOption } from '../types';

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  newest: 'Newest',
};

type ShopPageHeaderSectionProps = {
  title: string;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMobileFilters: () => void;
};

export function ShopPageHeaderSection({
  title,
  sort,
  onSortChange,
  onOpenMobileFilters,
}: ShopPageHeaderSectionProps) {
  return (
    <>
      <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-500" aria-hidden />
        <span className="text-gray-900">Shop</span>
      </nav>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl text-gray-900 md:text-4xl">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <label htmlFor="shop-sort" className="text-sm text-gray-700">
              Sort by:
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
              className="h-10 border border-gray-300 bg-white px-4 text-gray-900"
            >
              {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="flex h-10 items-center gap-2 border border-gray-900 px-4 text-gray-900 hover:bg-gray-50 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="mb-6 md:hidden">
        <label htmlFor="shop-sort-mobile" className="sr-only">
          Sort products
        </label>
        <select
          id="shop-sort-mobile"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="h-10 w-full border border-gray-300 bg-white px-4 text-gray-900"
        >
          {(Object.keys(sortLabels) as SortOption[]).map((key) => (
            <option key={key} value={key}>
              Sort by: {sortLabels[key]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
