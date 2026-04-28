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
