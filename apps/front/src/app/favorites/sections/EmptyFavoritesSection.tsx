import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EmptyFavoritesSection() {
  return (
    <section className="py-16">
      <Card className="mx-auto max-w-xl">
        <CardHeader className="items-center text-center">
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <Heart className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl text-gray-900">No favorites yet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          <p className="text-gray-600">
            Start adding products to your favorites to see them here. Browse our collection and save items you love.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link to="/shop">Browse products</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
