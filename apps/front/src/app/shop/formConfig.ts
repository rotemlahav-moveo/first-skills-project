import { z } from 'zod';
import type { FormFieldConfig } from '@shared/form-system';
import type { FilterSectionTitle, FilterSelections, SortOption } from './types';

type FilterSectionConfig = {
  title: FilterSectionTitle;
  options: string[];
};

// Source-of-truth for all shop filter sections and their options.
export const filterSections: FilterSectionConfig[] = [
  {
    title: 'Category',
    options: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes'],
  },
  {
    title: 'Size',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    title: 'Color',
    options: ['Black', 'White', 'Gray', 'Blue', 'Red'],
  },
  {
    title: 'Price Range',
    options: ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
  },
  {
    title: 'Brand',
    options: ['Brand A', 'Brand B', 'Brand C', 'Brand D'],
  },
];

export const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  newest: 'Newest',
};

// Tuple used by Zod enum so sort values stay strictly typed.
const sortValues: [SortOption, ...SortOption[]] = ['featured', 'price-asc', 'price-desc', 'newest'];

// RHF + Zod form schema for the whole shop filters/sort form state.
export const shopFiltersFormSchema = z.object({
  sort: z.enum(sortValues),
  filters: z.object({
    Category: z.array(z.string()),
    Size: z.array(z.string()),
    Color: z.array(z.string()),
    'Price Range': z.array(z.string()),
    Brand: z.array(z.string()),
  }),
});

// Input type accepted by RHF before/while schema parsing.
export type ShopFiltersFormInput = z.input<typeof shopFiltersFormSchema>;
// Output type after schema parsing/validation.
export type ShopFiltersFormValues = z.output<typeof shopFiltersFormSchema>;

// Initial values used when the page loads or filters are reset.
export const defaultShopFiltersFormValues: ShopFiltersFormInput = {
  sort: 'featured',
  filters: {
    Category: [],
    Size: [],
    Color: [],
    'Price Range': [],
    Brand: [],
  },
};

// Generic checkbox-group field configs generated from `filterSections`.
// Each section becomes one RHF field at path: filters.<sectionTitle>.
export const shopFilterFieldConfigs: FormFieldConfig<ShopFiltersFormInput>[] = filterSections.map(
  (section) => ({
    kind: 'checkbox-group',
    name: `filters.${section.title}`,
    label: '',
    options: section.options.map((option) => ({ value: option, label: option })),
  }),
);

// Generic select field configs for desktop and mobile sort controls.
export const shopSortFieldConfigs: FormFieldConfig<ShopFiltersFormInput>[] = [
  {
    kind: 'select',
    name: 'sort',
    label: 'Sort by',
    options: (Object.keys(sortLabels) as ShopFiltersFormInput['sort'][]).map((key) => ({
      value: key,
      label: sortLabels[key],
    })),
    containerClassName: 'hidden items-center gap-2 md:flex',
    labelClassName: 'text-sm text-gray-700',
  },
  {
    kind: 'select',
    name: 'sort',
    label: 'Sort products',
    options: (Object.keys(sortLabels) as ShopFiltersFormInput['sort'][]).map((key) => ({
      value: key,
      label: `Sort by: ${sortLabels[key]}`,
    })),
    containerClassName: 'grid gap-2 md:hidden',
    labelClassName: 'sr-only',
  },
];

// Convert RHF filter object into the domain shape used by `filterProducts`.
// Empty arrays are removed to keep selections compact.
export function toFilterSelections(filters: ShopFiltersFormInput['filters']): FilterSelections {
  const entries = Object.entries(filters) as [FilterSectionTitle, string[] | undefined][];
  return entries.reduce<FilterSelections>((result, [section, options]) => {
    const nextOptions = options ?? [];
    if (nextOptions.length > 0) {
      result[section] = nextOptions;
    }
    return result;
  }, {});
}
