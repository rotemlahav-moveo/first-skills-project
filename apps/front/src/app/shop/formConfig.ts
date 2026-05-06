import { FormFieldKind, type FormFieldConfig } from '@shared/form-system';
import type { ShopFiltersFormInput } from './formSchema';
import { FilterSectionTitle, SortOption } from './types';

type FilterSectionConfig = {
  title: FilterSectionTitle;
  options: string[];
};

// Source-of-truth for all shop filter sections and their options.
export const filterSections: FilterSectionConfig[] = [
  {
    title: FilterSectionTitle.Category,
    options: ['Tops', 'Bottoms', 'Dresses', 'Outwear', 'Shoes'],
  },
  {
    title: FilterSectionTitle.Size,
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    title: FilterSectionTitle.Color,
    options: ['Black', 'White', 'Gray', 'Blue', 'Red'],
  },
  {
    title: FilterSectionTitle.PriceRange,
    options: ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
  },
  {
    title: FilterSectionTitle.Brand,
    options: [
      'Urban Basics',
      'North Tailor',
      'Pulse',
      'Denim Co',
      'StreetForm',
      'Coastline',
      'Rebel Wear',
      'Stride',
      'Bloom & Co',
      'CityLine',
      'Élan',
      'CarryAll',
      'TimeCraft',
    ],
  },
];

export const sortLabels: Record<SortOption, string> = {
  [SortOption.featured]: 'Featured',
  [SortOption.priceAsc]: 'Price: Low to High',
  [SortOption.priceDesc]: 'Price: High to Low',
  [SortOption.newest]: 'Newest',
};

// Initial values used when the page loads or filters are reset.
export const defaultShopFiltersFormValues: ShopFiltersFormInput = {
  sort: SortOption.featured,
  filters: {
    [FilterSectionTitle.Category]: [],
    [FilterSectionTitle.Size]: [],
    [FilterSectionTitle.Color]: [],
    [FilterSectionTitle.PriceRange]: [],
    [FilterSectionTitle.Brand]: [],
  },
};

// Generic checkbox-group field configs generated from `filterSections`.
// Each section becomes one RHF field at path: filters.<sectionTitle>.
export const shopFilterFieldConfigs: FormFieldConfig<ShopFiltersFormInput>[] = filterSections.map(
  (section) => ({
    kind: FormFieldKind.checkboxGroup,
    name: `filters.${section.title}`,
    label: '',
    options: section.options.map((option) => ({ value: option, label: option })),
  }),
);

// Generic select field configs for desktop and mobile sort controls.
export const shopSortFieldConfigs: FormFieldConfig<ShopFiltersFormInput>[] = [
  {
    kind: FormFieldKind.select,
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
    kind: FormFieldKind.select,
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
