# Standards for Marketing Homepage

No formal standards are currently listed in `agent-os/standards/index.yml`.

For this spec, the following lightweight standards apply.

---

## 1) Semantic Structure and Accessibility

- Use semantic landmarks: `header`, `main`, section-level headings, and `footer`.
- Maintain logical heading hierarchy (`h1` once, then `h2` per major section).
- Ensure CTA buttons/links have clear, descriptive text.
- Prefer accessible color contrast and readable text sizing.

---

## 2) Conversion-Oriented Content Structure

- Present the core value proposition in the hero section above the fold.
- Include at least one primary CTA near the hero and one reinforcing CTA near page end.
- Keep copy concise and benefits-focused for faster clothing discovery.

---

## 3) Responsive and MVP-Friendly Implementation

- Build mobile-first layout with graceful scaling to tablet and desktop.
- Avoid introducing new UI frameworks or heavy dependencies in v1.
- Keep page composition simple and maintainable in the existing Nx React app structure.

---

## 4) Product Alignment

- Reflect roadmap priorities: homepage discovery and auth entry points.
- Maintain messaging consistency with mission: efficient online clothes discovery and purchase.
