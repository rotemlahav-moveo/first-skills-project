# Cart Page Shape Spec

## Objective
Deliver an MVP editable cart page in the frontend app with local/mock state, section-based component architecture, and styling/structure consistent with existing home/auth patterns.

## Confirmed Inputs
- Scope: Editable cart (quantity changes, remove item, recalculated totals)
- Target: Frontend-only mock/local state (no backend/API changes)
- Visual source: Connected Figma project, best matching cart frame
- Reference patterns: Existing home/auth page composition
- Product alignment: MVP-first shopping cart experience
- Standards: `frontend/new-section-component-hierarchy`

## Task 1: Save Spec Documentation
Create `agent-os/specs/2026-04-16-1211-cart-page/` with:
- `plan.md`: this execution plan
- `shape.md`: scope, decisions, constraints, product alignment
- `standards.md`: include full content of `frontend/new-section-component-hierarchy`
- `references.md`: implementation references + key patterns
- `visuals/`: notes/screenshot links for selected Figma cart frame

## Task 2: Define Cart Route And Page Composition
- Add a new cart route and page entry in frontend routing.
- Create page-level composition file that imports section components instead of inlining major UI blocks.
- Keep page component focused on structure + state wiring only.

Primary reference files:
- `apps/front/src/app/home/HomePage.tsx`
- `apps/front/src/app/auth/components/AuthLayout.tsx`

## Task 3: Build Cart Sections As Dedicated Components
Create page-scoped section/components under cart feature area, e.g.:
- `sections/CartItemsSection` (list rendering)
- `components/CartItemRow` (item details + quantity/remove controls)
- `sections/CartSummarySection` (subtotal/fees/total + CTA)
- `sections/EmptyCartSection` (empty-state messaging + navigation CTA)

Constraints:
- Follow explicit parent -> section -> child hierarchy
- Tailwind utility classes first; avoid new feature-global CSS

## Task 4: Implement Frontend Mock Cart State And Behavior
- Define local/mock cart model and seed data (in-page or local feature state module)
- Implement handlers:
  - Increase/decrease quantity (with lower bound)
  - Remove line item
  - Compute derived totals (subtotal, optional shipping placeholder, final total)
- Render empty-state when cart becomes empty
- Keep logic centralized in page/container, pass minimal props to sections

## Task 5: Align UI To Figma + Validate
- Capture target cart frame details from connected Figma file (spacing, typography, layout behavior)
- Apply responsive behavior for mobile and desktop breakpoints
- Run frontend lint/build checks for changed frontend files
- Verify standard compliance:
  - New sections extracted into separate files
  - Tailwind-first styling
  - No dead CSS references introduced

## Expected Deliverables
- New cart page route and composed page shell
- Section/component hierarchy for cart UI
- Working editable cart interactions with mock state
- Documentation/spec artifacts under `agent-os/specs/2026-04-16-1211-cart-page/`

## Out Of Scope (This Iteration)
- Backend/API cart persistence
- Real auth/user cart merge behavior
- Checkout/payment processing
- Promo/coupon business logic
