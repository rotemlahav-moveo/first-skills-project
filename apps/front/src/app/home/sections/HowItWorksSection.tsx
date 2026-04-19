import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';

const featuredProducts = [
  { name: 'Product Name 1', category: 'Featured', price: '$89.99', accent: '#e5e7eb' },
  { name: 'Product Name 2', category: 'Featured', price: '$129.99', accent: '#d1d5db' },
  { name: 'Product Name 3', category: 'Featured', price: '$69.99', accent: '#e5e7eb' },
  { name: 'Product Name 4', category: 'Featured', price: '$149.99', accent: '#d1d5db' },
];

export function HowItWorksSection() {
  return (
    <section className="border-b border-gray-300 py-16 md:py-24" id="featured-products" aria-labelledby="products-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <SectionHeading title="Featured Products" />
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((item) => (
            <ProductCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
