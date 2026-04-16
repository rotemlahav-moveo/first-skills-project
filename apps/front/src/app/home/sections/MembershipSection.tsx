import { Sparkles, Truck, WandSparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

export function MembershipSection() {
  return (
    <section className="section alt-section" id="membership" aria-labelledby="membership-title">
      <div className="container">
        <SectionHeading
          eyebrow="Membership"
          title="Perks built for frequent shoppers"
          description="Get extra value with fast shipping and early trend access."
        />
        <div className="grid three-col benefits-grid">
          <article className="card">
            <Sparkles aria-hidden />
            <h3>Early access drops</h3>
            <p>Preview weekly collections before public launch.</p>
          </article>
          <article className="card">
            <Truck aria-hidden />
            <h3>Priority shipping</h3>
            <p>Get same-day dispatch on every order.</p>
          </article>
          <article className="card">
            <WandSparkles aria-hidden />
            <h3>AI style refresh</h3>
            <p>Receive monthly outfit recommendations based on your favorites.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
