import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '../components/SectionHeading';

export function MembershipSection() {
  const testimonials = [
    { name: 'Customer A', quote: 'Great quality and fast shipping!' },
    { name: 'Customer B', quote: 'Love the selection and prices.' },
    { name: 'Customer C', quote: 'Best online fashion store!' },
  ];

  return (
    <section className="border-b border-gray-300 py-16 md:py-24" id="membership" aria-labelledby="membership-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <SectionHeading center title="What Our Customers Say" />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-gray-300 bg-gray-50 shadow-none">
              <CardContent className="p-8">
                <p className="mb-6 text-gray-700">&quot;{testimonial.quote}&quot;</p>
                <p className="text-gray-900">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
