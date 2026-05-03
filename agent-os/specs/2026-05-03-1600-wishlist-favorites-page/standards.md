# Standards for Wishlist / Favorites

The following standards apply to this work.

---

## Exception: redux-rtk-query-api-standard

Wishlist persistence uses **cookies and React context only** — there is no backend wishlist HTTP API in this iteration. RTK Query remains the standard for **product catalog** requests (`useGetProductsQuery`, `useGetProductByIdQuery`). This exception is documented per the standard’s Exception Process.

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
- Is auth/error handling centralized in shared base API logic?

---

## global/extract-repeated-literals-to-enums

# global/extract-repeated-literals-to-enums

## Rule
When a literal value (string/number) is repeated across configs, schemas, or logic branches, extract it to a shared enum or enum-like `const` map and reuse it from one source of truth.

## Requirements
- Identify repeated domain literals (for example form kinds, input types, statuses, section keys, sort keys).
- Define them in a shared location close to the domain boundary (feature `types` or shared `libs` package).
- Reference the enum/const value everywhere instead of duplicating raw literals.
- Keep names explicit and stable (for example `FormFieldKind.select` rather than `'select'`).
- Preserve type safety by deriving union types from enum-like maps when needed.

## Why
- Prevents typo-driven bugs from inconsistent literals.
- Makes refactors safer and faster.
- Improves discoverability and autocomplete.
- Reduces hidden coupling between schema, UI config, and business logic.

## Examples
- Preferred: `kind: FormFieldKind.select`, `inputType: InputType.email`.
- Preferred: shared filter/sort keys referenced in schema, defaults, and config from one map.
- Avoid: repeating `'select'`, `'price-asc'`, `'Category'` across multiple files.
