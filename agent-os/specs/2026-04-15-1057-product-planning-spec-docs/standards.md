# Standards for Product Planning Spec Package

This work applies one indexed standard plus lightweight project-local conventions.

---

## lightweight/spec-package-structure

Every shaped feature spec should use:

`agent-os/specs/YYYY-MM-DD-HHMM-feature-slug/`

Required contents:
- `plan.md`
- `shape.md`
- `standards.md`
- `references.md`
- `visuals/` (can remain empty when no assets are provided)

Why it applies:
- Keeps specs consistently organized.
- Makes historical plans easy to scan chronologically.

---

## lightweight/shaping-minimum-context

Each `shape.md` should include:
- `Scope`
- `Decisions`
- `Context` (visuals, references, product alignment)
- `Constraints`
- `Standards Applied`

Why it applies:
- Preserves decision rationale.
- Reduces ambiguity before implementation begins.

---

## lightweight/mvp-alignment-check

Each `plan.md` and `shape.md` should explicitly state how work supports current MVP priorities in `agent-os/product/`.

Why it applies:
- Keeps planning tied to near-term delivery goals.
- Prevents well-documented but low-priority work from displacing MVP-critical tasks.

---

## frontend/new-section-component-hierarchy

Source standard:
- `agent-os/standards/frontend/new-section-component-hierarchy.md`

Rule summary:
- Every newly added UI section must be implemented as a separate component.
- New sections should be placed according to clear architecture and hierarchy.
- Parent components should compose sections rather than hold large inline section markup.

Why it applies:
- Keeps UI structure maintainable as the app grows.
- Improves readability and reuse by enforcing clean component boundaries.
- Makes ownership and hierarchy easier to understand across features.

---

## Reuse Guidance

When creating future specs:
- Reuse this exact file structure and section layout.
- Prefer indexed standards from `agent-os/standards/index.yml` when available.
- Use lightweight conventions only when an indexed standard does not yet exist.
