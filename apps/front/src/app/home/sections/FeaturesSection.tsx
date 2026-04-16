import { SectionHeading } from '../components/SectionHeading';

const categories = [
  { name: 'Women', slug: 'women' },
  { name: 'Men', slug: 'men' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Sale', slug: 'sale' },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-gray-300 py-16 md:py-24" id="collections" aria-labelledby="collections-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <SectionHeading
          title="Shop by Category"
          description="Find your next look by browsing our most popular categories."
        />
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <a key={category.slug} href="#featured-products" className="group">
              <div className="mb-4 aspect-square border border-gray-300 bg-gray-200 transition-colors group-hover:bg-gray-300" />
              <h3 className="text-center text-gray-900">{category.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
