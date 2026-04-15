import { Card, CardContent } from '@/components/ui/card';

type ProductCardProps = {
  name: string;
  category: string;
  price: string;
  accent: string;
};

export function ProductCard({ name, category, price, accent }: ProductCardProps) {
  return (
    <Card className="product-card">
      <div className="product-swatch" style={{ background: accent }} aria-hidden />
      <CardContent>
        <p className="product-category">{category}</p>
        <h3>{name}</h3>
        <p className="product-price">{price}</p>
      </CardContent>
    </Card>
  );
}
