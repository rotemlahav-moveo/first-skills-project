export function PricingSection() {
  return (
    <section className="section alt-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <h2 id="pricing-title">Simple pricing</h2>
        <div className="grid two-col">
          <article className="card">
            <h3>Free</h3>
            <p>Browse categories, discover products, and create wishlists.</p>
          </article>
          <article className="card">
            <h3>Plus</h3>
            <p>
              Unlock advanced recommendations and early access to new shopping
              experiences.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
