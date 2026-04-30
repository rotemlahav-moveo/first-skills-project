import { Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

export function HowItWorksSection() {
  const steps: string[] = [
    'Browse quality fashion items',
    'Add items to favorites',
    'Easy checkout process',
    'Free shipping over $100',
  ];

  return (
    <section className="border-b border-gray-300 bg-gray-100 py-16 md:py-24" id="how-it-works" aria-labelledby="how-it-works-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <SectionHeading center title="How It Works" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center bg-gray-900 text-white">
                <Check className="h-8 w-8" />
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
