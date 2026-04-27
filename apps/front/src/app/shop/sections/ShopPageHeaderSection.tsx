import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Control } from 'react-hook-form';
import { ConfigFormFields } from '@shared/form-system';
import { shopSortFieldConfigs, type ShopFiltersFormInput } from '../formConfig';

type ShopPageHeaderSectionProps = {
  title: string;
  control: Control<ShopFiltersFormInput>;
  onOpenMobileFilters: () => void;
};

export function ShopPageHeaderSection({
  title,
  control,
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
          <ConfigFormFields control={control} fields={[shopSortFieldConfigs[0]]} />
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
        <ConfigFormFields control={control} fields={[shopSortFieldConfigs[1]]} />
      </div>
    </>
  );
}
