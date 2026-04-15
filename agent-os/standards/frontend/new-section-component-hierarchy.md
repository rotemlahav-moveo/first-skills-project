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

## Additional Rule: CSS Modularization
All frontend styles must be split into context-based CSS modules instead of large monolithic files.

## CSS Requirements
- Keep styles in a dedicated `src/styles/` directory with focused files (for example: `base.css`, `layout.css`, `home.css`, `auth.css`, `responsive.css`, `theme.css`).
- Use a single stylesheet entrypoint (for example `src/styles/index.css`) that imports the modular CSS files in a predictable order.
- Import only the stylesheet entrypoint from application code (for example from `main.tsx`).
- When migrating styles from legacy large files, move all selectors first, then delete the large files.
- Do not leave dead stylesheet references in HTML or code after migration.

## CSS Checklist
- Are styles split by context instead of grouped in one large file?
- Is there exactly one active CSS entrypoint import for app styles?
- Were legacy style files removed after successful migration?
- Were build and lint checks run after the stylesheet split?
