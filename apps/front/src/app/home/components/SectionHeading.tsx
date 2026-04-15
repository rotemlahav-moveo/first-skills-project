type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, description, center = false }: SectionHeadingProps) {
  return (
    <header className={center ? 'fashion-section-heading fashion-section-heading-center' : 'fashion-section-heading'}>
      {eyebrow ? <p className="fashion-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="fashion-section-description">{description}</p> : null}
    </header>
  );
}
