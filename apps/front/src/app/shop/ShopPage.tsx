import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SiteFooter } from '../home/components/SiteFooter';
import { SiteHeader } from '../home/components/SiteHeader';
import { useCart } from '../cart/CartContext';
import { filterProducts, sortProducts } from './filterProducts';
import {
  defaultShopFiltersFormValues,
  shopFiltersFormSchema,
  toFilterSelections,
  type ShopFiltersFormInput,
  type ShopFiltersFormValues,
} from './formConfig';
import { SHOP_PRODUCTS } from './mockProducts';
import { ShopFiltersPanel } from './components/ShopFiltersPanel';
import { ShopPageHeaderSection } from './sections/ShopPageHeaderSection';
import { ShopProductsSection } from './sections/ShopProductsSection';
import type { ShopProduct } from './types';

const pageTitle = 'All Products';

function defaultSizeForCart(product: ShopProduct): string {
  const preferred = product.sizes.find((size) => size === 'M');
  return preferred ?? product.sizes[0] ?? 'M';
}

export function ShopPage() {
  const { addToCart } = useCart();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { control, watch, setValue } = useForm<ShopFiltersFormInput, undefined, ShopFiltersFormValues>({
    resolver: zodResolver(shopFiltersFormSchema),
    defaultValues: defaultShopFiltersFormValues,
  });
  const sort = watch('sort');
  const filters = watch('filters');
  const selections = useMemo(() => toFilterSelections(filters), [filters]);

  const filtered = useMemo(() => filterProducts(SHOP_PRODUCTS, selections), [selections]);
  const sortedProducts = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const clearFilters = useCallback(() => {
    setValue('filters', defaultShopFiltersFormValues.filters);
  }, [setValue]);

  const handleAddToCart = useCallback(
    (product: ShopProduct) => {
      addToCart({
        id: product.id,
        name: product.name,
        color: product.color,
        size: defaultSizeForCart(product),
        price: product.price,
        imageUrl: product.imageUrl,
      });
    },
    [addToCart],
  );

  return (
    <>
      <SiteHeader />
      <main className="bg-white py-8">
        <div className="mx-auto w-full max-w-[1440px] px-8">
          <ShopPageHeaderSection
            title={pageTitle}
            control={control}
            onOpenMobileFilters={() => setShowMobileFilters(true)}
          />

          <div className="flex gap-8">
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24">
                <ShopFiltersPanel
                  control={control}
                  onClearAll={clearFilters}
                />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <ShopProductsSection products={sortedProducts} onAddToCart={handleAddToCart} />
            </div>
          </div>
        </div>

        {showMobileFilters && (
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            role="presentation"
            onClick={() => setShowMobileFilters(false)}
          >
            <div
              className="absolute inset-y-0 left-0 max-h-full w-80 max-w-full overflow-y-auto bg-white"
              role="dialog"
              aria-label="Filters"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Close
                  </button>
                </div>
                <ShopFiltersPanel
                  control={control}
                  onClearAll={clearFilters}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
