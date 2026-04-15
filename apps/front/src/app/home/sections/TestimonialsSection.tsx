import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '../components/SectionHeading';

export function TestimonialsSection() {
  return (
    <section className="section" aria-labelledby="stylist-notes-title">
      <div className="container">
        <SectionHeading
          eyebrow="Stylist notes"
          title="Why members love this drop"
          description="Fresh capsules designed for mix-and-match outfits."
        />
        <div className="grid two-col testimonial-grid">
          <Card>
            <CardHeader>
              <CardTitle>Color-first matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our stylists pair statement colors with neutral staples so each look feels bold but wearable.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fit confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Save your preferred cuts and sizes once, then get suggestions that match your exact silhouette.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
