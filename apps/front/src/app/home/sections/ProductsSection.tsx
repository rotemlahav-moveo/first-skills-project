import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../../redux/productsApi/productsApi';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';

const FEATURED_LIMIT = 4;

export function ProductsSection() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const featuredProducts = useMemo(() => (products ?? []).slice(0, FEATURED_LIMIT), [products]);

  return (
    <section className="border-b border-gray-300 py-16 md:py-24" id="featured-products" aria-labelledby="products-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <SectionHeading title="Featured Products" />
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {isLoading ? (
          <p className="py-12 text-center text-sm text-gray-600">Loading featured products…</p>
        ) : isError ? (
          <p className="py-12 text-center text-sm text-red-600">Failed to load featured products.</p>
        ) : featuredProducts.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-600">No products available yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
