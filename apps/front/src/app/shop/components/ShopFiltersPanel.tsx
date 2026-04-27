import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Control } from 'react-hook-form';
import { GenericFormInput } from '@shared/form-system';
import type { ShopFiltersFormInput } from '../formSchema';
import { filterSections, shopFilterFieldConfigs } from '../formConfig';

type ShopFiltersPanelProps = {
  control: Control<ShopFiltersFormInput>;
  onClearAll: () => void;
  isSubmitting?: boolean;
};

export function ShopFiltersPanel({ control, onClearAll, isSubmitting = false }: ShopFiltersPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Category: true,
    Size: true,
    Color: true,
    'Price Range': true,
    Brand: false,
  });

  function toggleSection(title: string) {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-gray-900">Filters</h2>
        <button type="button" onClick={onClearAll} className="text-sm text-gray-600 hover:text-gray-900">
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {filterSections.map((section) => (
          <div key={section.title} className="border-b border-gray-300 pb-6">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              className="mb-4 flex w-full items-center justify-between"
            >
              <span className="text-sm text-gray-900">{section.title}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  openSections[section.title] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections[section.title] && (
              <GenericFormInput
                control={control}
                isSubmitting={isSubmitting}
                fields={shopFilterFieldConfigs.filter((field) => field.name === `filters.${section.title}`)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
