import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { FilterSectionTitle, FilterSelections } from '../types';

type FilterSection = {
  title: FilterSectionTitle;
  options: string[];
};

const filterSections: FilterSection[] = [
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

type ShopFiltersPanelProps = {
  selections: FilterSelections;
  onToggleOption: (section: FilterSectionTitle, option: string, checked: boolean) => void;
  onClearAll: () => void;
};

export function ShopFiltersPanel({ selections, onToggleOption, onClearAll }: ShopFiltersPanelProps) {
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

  function isChecked(section: FilterSectionTitle, option: string): boolean {
    return (selections[section] ?? []).includes(option);
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
              <div className="space-y-3">
                {section.options.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-gray-300"
                      checked={isChecked(section.title, option)}
                      onChange={(event) =>
                        onToggleOption(section.title, option, event.target.checked)
                      }
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
