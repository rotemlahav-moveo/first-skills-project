import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/productsApi/productsApi';
import { SiteFooter } from '../home/components/SiteFooter';
import { SiteHeader } from '../home/components/SiteHeader';
import { useCart } from '../cart/CartContext';
import { defaultShopFiltersFormValues } from './formConfig';
import { shopFiltersFormSchema, type ShopFiltersFormInput, type ShopFiltersFormValues } from './formSchema';
import { ShopFiltersPanel } from './components/ShopFiltersPanel';
import { ShopPageHeaderSection } from './sections/ShopPageHeaderSection';
import { ShopProductsSection } from './sections/ShopProductsSection';
import {
  mapFormToUrl,
  parseUrlToApiArgs,
  parseUrlToForm,
  shopListQueriesEquivalent,
} from './shopSearchParams';
import type { ShopProduct } from './types';

const pageTitle = 'All Products';

// defaultSizeForCart is a helper function to get the default size for a product
function defaultSizeForCart(product: ShopProduct): string {
  const preferred = product.sizes.find((size) => size === 'M');
  return preferred ?? product.sizes[0] ?? 'M';
}

export function ShopPage() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const searchParamsRef = useRef(searchParams); // useRef to store the search params in a ref to avoid re-rendering the component unnecessarily
  searchParamsRef.current = searchParams;

  // convert the search params to a strig and convert it to a URLSearchParams object
  const searchParamsKey = searchParams.toString();
  const productsListArgs = useMemo(() => {
    const args = parseUrlToApiArgs(new URLSearchParams(searchParamsKey));
    return Object.keys(args).length > 0 ? args : undefined;
  }, [searchParamsKey]);
  const currentPage = productsListArgs?.page ?? 1;
  const currentLimit = productsListArgs?.limit ?? 20;

  const formSnapshot = useMemo(
    () => parseUrlToForm(new URLSearchParams(searchParamsKey)),
    [searchParamsKey],
  );

  const { data: productsResult, isLoading, isError } = useGetProductsQuery(productsListArgs);
  const products = useMemo(() => productsResult?.items ?? [], [productsResult]);
  const totalPages = productsResult?.totalPages ?? 1;
  const totalProducts = productsResult?.total ?? 0;

  // creating the form with the default values from formSnapshot
  const { control, watch, reset, setValue } = useForm<
    ShopFiltersFormInput,
    undefined,
    ShopFiltersFormValues
  >({
    resolver: zodResolver(shopFiltersFormSchema),
    defaultValues: formSnapshot, // set the default values for the form from the search params
  });

  useEffect(() => {
    reset(formSnapshot);
  }, [formSnapshot, reset]);

  // sync the form values with the search params when the form values change
  useEffect(() => {
    const sub = watch((raw) => {
      const parsed = shopFiltersFormSchema.safeParse(raw);
      if (!parsed.success) {
        return;
      }
      const currentParams = searchParamsRef.current;
      const dept = currentParams.get('department')?.trim().toLowerCase() || undefined;
      if (shopListQueriesEquivalent(currentParams, parsed.data, dept)) {
        return;
      }
      setSearchParams(mapFormToUrl(parsed.data, dept, 1, currentLimit), { replace: true });
    });
    return () => sub.unsubscribe();
  }, [watch, setSearchParams, currentLimit]);

  const clearFilters = useCallback(() => {
    setValue('filters', defaultShopFiltersFormValues.filters);
  }, [setValue]);

  const handleAddToCart = useCallback(
    (product: ShopProduct) => {
      addToCart({
        id: product.productId,
        name: product.productName,
        color: product.color,
        size: defaultSizeForCart(product),
        price: product.price,
        imageUrl: product.imageUrl,
      });
    },
    [addToCart],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      const page = Math.max(1, Math.min(nextPage, totalPages));
      if (page === currentPage) {
        return;
      }
      const nextParams = new URLSearchParams(searchParamsRef.current);
      if (page > 1) {
        nextParams.set('page', String(page));
      } else {
        nextParams.delete('page');
      }
      if (currentLimit > 0) {
        nextParams.set('limit', String(currentLimit));
      }
      setSearchParams(nextParams, { replace: false });
    },
    [currentLimit, currentPage, setSearchParams, totalPages],
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
                <ShopFiltersPanel control={control} onClearAll={clearFilters} />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {isLoading ? (
                <p className="py-12 text-center text-sm text-gray-600">Loading products…</p>
              ) : isError ? (
                <p className="py-12 text-center text-sm text-red-600">Failed to load products.</p>
              ) : (
                <ShopProductsSection
                  products={products}
                  totalProducts={totalProducts}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onAddToCart={handleAddToCart}
                />
              )}
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
                <ShopFiltersPanel control={control} onClearAll={clearFilters} />
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
