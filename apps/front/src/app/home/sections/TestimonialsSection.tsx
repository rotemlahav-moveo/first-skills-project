export function TestimonialsSection() {
  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title">What shoppers say</h2>
        <div className="grid two-col">
          <blockquote className="quote">
            "I found a full outfit in minutes instead of browsing for an hour."
            <cite> Maya, early user</cite>
          </blockquote>
          <blockquote className="quote">
            "The category flow helps me get exactly what I need without
            distractions."
            <cite> Daniel, repeat customer</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
