import { z } from 'zod';
import { FilterSectionTitle, SortOption } from './types';

// Tuple used by Zod enum so sort values stay strictly typed.
const sortValues: [SortOption, ...SortOption[]] = [
  SortOption.featured,
  SortOption.priceAsc,
  SortOption.priceDesc,
  SortOption.newest,
];

// RHF + Zod form schema for the whole shop filters/sort form state.
export const shopFiltersFormSchema = z.object({
  sort: z.enum(sortValues),
  filters: z.object({
    [FilterSectionTitle.Category]: z.array(z.string()),
    [FilterSectionTitle.Size]: z.array(z.string()),
    [FilterSectionTitle.Color]: z.array(z.string()),
    [FilterSectionTitle.PriceRange]: z.array(z.string()),
    [FilterSectionTitle.Brand]: z.array(z.string()),
  }),
});

// Input type accepted by RHF before/while schema parsing.
export type ShopFiltersFormInput = z.input<typeof shopFiltersFormSchema>;
// Output type after schema parsing/validation.
export type ShopFiltersFormValues = z.output<typeof shopFiltersFormSchema>;
