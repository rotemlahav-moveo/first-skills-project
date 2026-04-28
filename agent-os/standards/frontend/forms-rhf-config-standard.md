# frontend/forms-rhf-config-standard

## Rule
All frontend forms and form-like controls must use React Hook Form with Zod validation and render fields from configuration arrays.

## Requirements
- Use `react-hook-form` as the single source of truth for form state and submission.
- Use Zod schemas with `@hookform/resolvers/zod` for validation.
- Define all field inputs in typed configuration arrays; do not hardcode per-field JSX blocks in page components.
- Render fields through shared reusable form components from `libs/`.
- Keep API calls, navigation, and page-level side effects in page/section components.
- Keep reusable field types, renderers, and primitives in `libs/` when reused across frontend areas.

## Validation and Error Handling
- Validation errors must be surfaced inline per field.
- Form-level async errors (for example API failures) must be shown in a dedicated error area.
- Disable controls while submitting to prevent duplicate requests.
- Use explicit, user-friendly validation copy.

## Styling
- Use existing UI styling conventions (Tailwind-first, spacing rhythm, focus states, and typography).
- Reuse established input/select/label/button visual patterns for consistency.
- Avoid introducing parallel form style systems per feature.

## Exception Process
- If a form cannot use config-driven rendering (for example highly custom interactive layouts), document the reason in the feature spec and keep RHF + Zod unless a stronger constraint exists.

## Checklist
- Does the form use `useForm` from React Hook Form?
- Is validation defined with a Zod schema and resolver?
- Are fields declared in a typed config array?
- Are fields rendered by shared reusable form renderer/components?
- Are field and form-level errors shown consistently?
