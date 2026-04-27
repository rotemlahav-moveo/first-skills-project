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
