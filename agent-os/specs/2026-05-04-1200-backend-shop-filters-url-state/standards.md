# Standards — Backend shop filters + URL state

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

## backend/feature-structure

# Backend Feature Structure Standard

All new backend features in `apps/backend/src/app/` must follow a consistent folder layout.

## Required Structure

Each feature gets its own folder, for example `apps/backend/src/app/orders/`:

```text
orders/
  orders.module.ts
  controllers/
    orders.controller.ts
    orders.controller.spec.ts
  services/
    orders.service.ts
    orders.service.spec.ts
  dto/
    create-order.dto.ts
  entities/
    order.entity.ts
```

## Rules

1. Keep controllers in `controllers/` and services in `services/`.
2. Keep DTOs in `dto/` and TypeORM entities in `entities/`.
3. Keep tests next to their implementation files (`*.spec.ts`).
4. Feature module file stays at the feature root (`<feature>.module.ts`) and imports from subfolders.
5. `app.module.ts` should only compose feature modules and global infrastructure.

## Why

- Reduces module sprawl in root app files.
- Makes feature ownership and navigation predictable.
- Scales better as features grow and teams work in parallel.

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

---

## global/split-zod-schema-into-schema-files

# global/split-zod-schema-into-schema-files

## Rule
Declare Zod schemas in dedicated schema files (for example `formSchema.ts`), and keep UI/form config files focused on field configuration and presentation.

## Requirements
- Place all `z.object(...)` schema declarations in a dedicated schema file in the same feature folder.
- Export schema-derived types (`z.infer`, `z.input`, `z.output`) from the schema file.
- Import schema types into config/UI files instead of redefining them.
- Keep field configuration files free of direct schema declarations.
- Name files consistently (`*Schema.ts` or `*schema.ts`) within a feature.

## Why
- Separates validation concerns from UI configuration.
- Makes schemas easier to find, test, and reuse.
- Reduces file size and cognitive load in form config files.
- Prevents mixing domain validation logic with view-layer wiring.

## Examples
- Preferred: `formSchema.ts` exports `signInSchema` and `SignInFormValues`; `formConfig.tsx` only exports `signInFields`.
- Preferred: page component imports schema from schema file and fields from config file.
- Avoid: declaring `z.object(...)` directly inside form config/render files.
