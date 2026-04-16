type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, description, center = false }: SectionHeadingProps) {
  return (
    <header className={center ? 'mb-8 text-center' : 'mb-8'}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-gray-600">{eyebrow}</p>
      ) : null}
      <h2 className="mb-4 text-2xl font-medium leading-tight text-gray-900 md:text-3xl">{title}</h2>
      {description ? (
        <p className={center ? 'mx-auto max-w-3xl text-gray-600' : 'max-w-3xl text-gray-600'}>{description}</p>
      ) : null}
    </header>
  );
}
