export function FeaturesSection() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="container">
        <h2 id="features-title">Features built for fast discovery</h2>
        <div className="grid three-col">
          <article className="card">
            <h3>Category-first browsing</h3>
            <p>
              Jump straight into tops, bottoms, footwear, and accessories with
              clear category pathways.
            </p>
          </article>
          <article className="card">
            <h3>Clean product previews</h3>
            <p>
              Compare options quickly with visual-first cards and key details
              surfaced immediately.
            </p>
          </article>
          <article className="card">
            <h3>Saved preferences</h3>
            <p>
              Keep your sizing and style context handy to make repeat purchases
              easier over time.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
