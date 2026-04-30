type ProductDescriptionSectionProps = {
  description: string;
};

export function ProductDescriptionSection({ description }: ProductDescriptionSectionProps) {
  return (
    <section className="border-t border-gray-200 pt-6">
      <h2 className="mb-3 text-base font-medium text-gray-900">Product details</h2>
      <p className="whitespace-pre-line text-sm leading-6 text-gray-700">{description}</p>
    </section>
  );
}
