import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';

const featuredProducts = [
  { name: 'Neon Drift Jacket', category: 'Outerwear', price: '$128', accent: 'linear-gradient(135deg,#ff6b6b,#ff8e53)' },
  { name: 'Pulse Pleat Skirt', category: 'Bottoms', price: '$84', accent: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
  { name: 'Daylight Knit Set', category: 'Matching Set', price: '$142', accent: 'linear-gradient(135deg,#22d3ee,#818cf8)' },
  { name: 'Metro Runner Sneaker', category: 'Footwear', price: '$98', accent: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
];

export function FeaturesSection() {
  return (
    <section className="section" id="collections" aria-labelledby="collections-title">
      <div className="container">
        <SectionHeading
          eyebrow="Curated collection"
          title="Explore our collections"
          description="Shop by Category"
        />
        <div className="product-grid">
          {featuredProducts.map((item) => (
            <ProductCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
