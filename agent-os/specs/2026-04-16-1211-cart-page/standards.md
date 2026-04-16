# Standards for Cart Page

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
