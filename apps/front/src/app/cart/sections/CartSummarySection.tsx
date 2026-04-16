import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '../utils';

type CartSummarySectionProps = {
  subtotal: number;
  shipping: number;
  total: number;
  totalItems: number;
};

export function CartSummarySection({ subtotal, shipping, total, totalItems }: CartSummarySectionProps) {
  return (
    <section aria-labelledby="order-summary-heading">
      <Card className="sticky top-24">
        <CardHeader className="space-y-2">
          <CardTitle id="order-summary-heading" className="text-2xl text-gray-900">
            Order Summary
          </CardTitle>
          <p className="text-sm text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-2 text-gray-700">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-gray-700">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="h-px bg-gray-300" />
            <div className="flex items-center justify-between gap-2 text-base text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button size="lg" className="h-12 w-full" onClick={() => undefined}>
            Proceed to checkout <ArrowRight />
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 w-full">
            <Link to="/">Continue shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
