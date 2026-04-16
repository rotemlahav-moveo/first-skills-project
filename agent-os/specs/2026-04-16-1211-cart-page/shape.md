# Cart Page - Shaping Notes

## Scope
Build an MVP editable cart page for the frontend app, including quantity updates, item removal, recalculated totals, and empty-state handling using frontend-only mock/local state.

## Decisions
- Prioritize a simple MVP cart UX over full checkout orchestration.
- Keep implementation frontend-only without API persistence.
- Use existing page composition patterns from home/auth areas.
- Structure the cart UI as separate section components.
- Use Tailwind utility classes as the primary styling method.

## Context
- Visuals: Connected Figma project, best matching cart frame to be referenced during implementation and QA.
- References:
  - `apps/front/src/app/home/HomePage.tsx`
  - `apps/front/src/app/home/sections/HeroSection.tsx`
  - `apps/front/src/app/auth/components/AuthLayout.tsx`
- Product alignment: Cart is explicitly listed in MVP roadmap and supports the mission of efficient online clothing purchase.

## Standards Applied
- `frontend/new-section-component-hierarchy` - requires section extraction, clear hierarchy, and Tailwind-first styling for new major UI sections.
