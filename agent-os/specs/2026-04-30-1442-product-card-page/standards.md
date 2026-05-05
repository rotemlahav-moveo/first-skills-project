# Standards for Product Card Page

The following standards apply to this work.

---

## frontend/new-section-component-hierarchy

# frontend/new-section-component-hierarchy

## Rule
Every newly added UI section must be implemented as a separate component.

## Requirements
- Do not build a new major section inline inside a page-level file.
- Create a dedicated component file for each new section.
- Place the component in a folder structure that reflects UI hierarchy and ownership.
- Keep parent/container components focused on composition and data flow.
- Keep section components focused on section rendering logic and local behavior.

## Architecture and Hierarchy Guidance
- Put shared and reusable sections in a shared feature/component area.
- Put page-specific sections close to their page/route module.
- Name folders and files consistently so parent-child relationships are easy to follow.
- Prefer explicit imports from parent -> section -> child components.

## Checklist
- Is the new section a separate component file?
- Is its location consistent with the project hierarchy?
- Is the parent component cleaner after extraction?
- Is the section reusable or clearly scoped to a single page?

## Additional Rule: Tailwind-First Styling
Frontend UI styling must use Tailwind utility classes in components as the default approach.

## CSS Requirements
- Prefer Tailwind utility classes directly in TSX/JSX for component and section styling.
- Keep custom CSS minimal and global-only (for example theme tokens, resets, and Tailwind base setup).
- Avoid creating or maintaining multiple feature-specific global CSS files when utilities can express the same styling.
- Remove obsolete custom CSS files after migration to Tailwind utilities.
- Do not leave dead stylesheet references in HTML or code after cleanup.

## CSS Checklist
- Is component/page styling implemented primarily with Tailwind utilities?
- Are remaining CSS files only for global concerns (theme/reset/base)?
- Were obsolete custom CSS files removed?
- Were build and lint checks run after styling changes?

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

## global/avoid-unnecessary-mapping-align-model-names

# Avoid Unnecessary Mapping And Align Model Names

## Rule
Avoid unnecessary object-to-object mapping when backend and frontend are both owned in the same codebase and no boundary transformation is needed.

## Requirements
- Prefer aligned naming across DB-mapped entities, DTO/contracts, and frontend usage (`id`, `name`, etc.) to reduce adapter code.
- Do not create mapper functions that only rename obvious fields without adding real transformation or protection value.
- Keep transformations only when they are required (for example: `numeric` to `number`, `Date` to ISO string, masking/removing sensitive fields, or intentional shape flattening).
- If a mapping layer exists, it must have clear purpose beyond naming differences.

## DTO And Entity Guidance
- Keep column names in the DB schema (`product_id`, `product_name`) mapped via decorators, while TypeScript property names stay API-friendly.
- Keep shared contracts in `libs/shared/*-contracts` aligned with the API response shape to avoid frontend re-mapping.
- If DTO and entity shapes are intentionally identical for a feature, keep one lightweight normalization step only for type/runtime conversion needs.

## Exceptions
- Public/external APIs where response contracts must be versioned and decoupled from persistence.
- Features with strict security boundaries where entity fields must never leak.
- Legacy modules where full rename would create disproportionate migration risk.

## Checklist
- Are entity/DTO/frontend names aligned for core fields?
- Is any remaining mapping doing necessary transformation only?
- Is there no frontend-only mapper that just renames fields?
- Are shared contracts the single source of truth for API shapes?
