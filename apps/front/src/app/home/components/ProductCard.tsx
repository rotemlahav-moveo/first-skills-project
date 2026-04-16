import { Card, CardContent } from '@/components/ui/card';

type ProductCardProps = {
  name: string;
  category: string;
  price: string;
  accent: string;
};

export function ProductCard({ name, category, price, accent }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-gray-300 bg-white shadow-none transition hover:bg-gray-50">
      <div className="mb-3 aspect-[3/4] border-b border-gray-300" style={{ background: accent }} aria-hidden>
        <div className="flex h-full items-center justify-center text-sm text-gray-600">Product Image</div>
      </div>
      <CardContent className="grid gap-2 p-4 pt-0">
        <p className="text-xs uppercase tracking-wide text-gray-600">{category}</p>
        <h3 className="text-sm text-gray-900 md:text-base">{name}</h3>
        <p className="text-sm text-gray-700">{price}</p>
      </CardContent>
    </Card>
  );
}
