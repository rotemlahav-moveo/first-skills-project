# Standards for Shop Pagination Navigation

The following standards apply to this work.

---

## frontend/redux-rtk-query-api-standard

# frontend/redux-rtk-query-api-standard

## Rule
All frontend backend-API calls must be implemented through Redux Toolkit Query (RTK Query) and not through feature-local `fetch`/`axios` wrappers.

## Requirements
- Use a shared Redux API base (for example `baseApi`) as the single entry point for backend calls.
- Define feature endpoints via `baseApi.injectEndpoints(...)`.
- Consume data and mutations through generated RTK Query hooks in UI components.
- Keep backend call concerns (headers, auth token handling, refresh, retries, base URL) centralized in the shared API base layer.
- Do not introduce new ad-hoc HTTP client wrappers in feature folders for backend calls.

## Project Structure Guidance
- Keep Redux store and shared API infrastructure under `apps/front/src/app/reduxStore/`.
- Keep feature endpoint declarations close to their feature modules (for example `apps/front/src/app/auth/api.ts`) while still using the shared base API.
- Register only the shared base API reducer and middleware in the Redux store.

## Error Handling and Auth
- Normalize API error handling so UI gets predictable error shapes/messages.
- Use centralized auth handling (token injection and refresh-on-401) in the shared base API layer.
- Avoid duplicating auth/refresh logic per feature endpoint file.

## Exception Process
- If a call is not a backend API request (for example static asset fetch from same bundle context), document the reason in the feature spec.
- Any non-RTK backend call pattern requires explicit approval and migration follow-up.

## Checklist
- Does the feature use `baseApi.injectEndpoints(...)`?
- Are UI components using generated RTK Query hooks?
- Is reducer/middleware wired from shared base API only?
- Is there no new feature-local raw `fetch`/`axios` backend wrapper?
- Is auth/error handling centralized in shared API base logic?

---

## global/shared-code-in-libs

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

---

## global/keep-tsx-clean-from-logic

# global/keep-tsx-clean-from-logic

## Rule
Keep TSX focused on rendering. Move non-trivial logic out of JSX into named functions, callbacks, hooks, selectors, or utilities.

## Requirements
- Do not place multi-step logic directly inside JSX props like `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `className`, or conditional render blocks.
- Extract event handlers into named callbacks (for example `handleAddToCart`, `handleSubmit`, `handleCardKeyDown`).
- Extract derived values and branching decisions into variables or memoized selectors before `return`.
- Prefer custom hooks or utility functions for reusable UI behavior instead of duplicating inline logic.
- Keep inline JSX expressions simple and declarative (data binding, simple ternary, direct prop wiring).
- Use clear naming that expresses intent (`navigateToProduct`, `removeFavorite`) instead of anonymous inline functions with embedded business logic.

## Why
- Improves readability by separating rendering from behavior.
- Reduces duplicate logic and makes reuse easier.
- Simplifies testing because logic is available through named units.
- Makes component diffs smaller and safer during future changes.

## Examples
- Preferred: `onClick={handleAddToCart}` with logic extracted to `const handleAddToCart = useCallback(...)`.
- Preferred: compute `const isDisabled = ...` before JSX and pass `disabled={isDisabled}`.
- Avoid: long inline anonymous functions and nested conditionals directly inside TSX.
