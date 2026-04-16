import { SectionHeading } from '../components/SectionHeading';

const moods = [
  'Weekend Street',
  'Office Statement',
  'Party Ready',
  'Minimal Essentials',
  'Resort Layers',
  'Monochrome Icons',
];

export function HowItWorksSection() {
  return (
    <section
      className="section mood-section"
      id="moods"
      aria-labelledby="moods-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Shop by vibe"
          title="Pick a mood, get a full look"
          description="Jump into pre-styled outfits built around your moment."
        />
        <ul className="mood-list">
          {moods.map((mood) => (
            <li key={mood}>{mood}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
