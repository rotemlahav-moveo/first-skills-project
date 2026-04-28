# Shared Code In `libs/` Standard

All shared code must be implemented in `libs/`.

## Rule

- If code is used by multiple apps/features, or intended for reuse, create or extend a library under `libs/`.
- Keep `apps/` code app-specific (route wiring, app composition, local UI flow, app-only adapters).
- Import shared code from library public entry points instead of duplicating code between apps.

## Shared vs App-Local

Shared (belongs in `libs/`):
- DTO/contracts used by frontend and backend.
- Domain rules, validation logic, shared utilities.
- Reusable UI primitives/components used across multiple app areas.

App-local (can stay in `apps/`):
- Page wiring and route composition specific to one app.
- Feature code with no reuse outside that app.
- App bootstrap/config that only one runtime needs.

## Deferred Enforcement (Not In This Step)

- This standard is documentation-only for now.
- Optional future enforcement can be added with Nx tags and `@nx/enforce-module-boundaries` constraints.
- Optional future migration can move existing duplicated shared code from `apps/` into `libs/` incrementally.
