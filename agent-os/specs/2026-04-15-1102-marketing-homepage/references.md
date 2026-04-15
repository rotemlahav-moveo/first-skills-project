# References for Marketing Homepage

## Similar Implementations

No dedicated homepage feature references were provided by the user.

## Codebase Baseline Reviewed

### Frontend Routing Skeleton

- Location: `apps/front/src/app/app.tsx`
- Relevance: Defines current root route (`/`) and existing placeholder content.
- Key patterns: Use React Router route elements for homepage composition.

### Frontend App Entry

- Location: `apps/front/src/main.tsx`
- Relevance: Shows router mounting via `BrowserRouter`.
- Key patterns: Keep routing setup unchanged unless additional global providers are needed.

### Global Styles

- Location: `apps/front/src/styles.css`
- Relevance: Primary styling entry point for the frontend app today.
- Key patterns: Add homepage style system here for MVP unless structure grows enough to split files.

### Product Context

- Location: `agent-os/product/mission.md`
- Relevance: Defines product problem/solution and messaging direction.

- Location: `agent-os/product/roadmap.md`
- Relevance: Confirms MVP includes homepage with product categories and auth entry points.

- Location: `agent-os/product/tech-stack.md`
- Relevance: Confirms React frontend and overall stack constraints.
