import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EmptyCartSection() {
  return (
    <section className="py-16">
      <Card className="mx-auto max-w-xl">
        <CardHeader className="items-center text-center">
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <ShoppingBag />
          </div>
          <CardTitle className="text-2xl text-gray-900">Your cart is empty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          <p className="text-gray-600">
            Looks like you have not added anything yet. Discover new arrivals and add your favorite pieces.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link to="/">Shop new arrivals</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
