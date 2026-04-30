type ProductMediaSectionProps = {
  imageUrl: string;
  name: string;
};

export function ProductMediaSection({ imageUrl, name }: ProductMediaSectionProps) {
  return (
    <section className="w-full">
      <div className="aspect-[4/5] w-full overflow-hidden border border-gray-200 bg-gray-100">
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      </div>
    </section>
  );
}
