# Engineering Guidelines and Coding Standards

## 1. Anti-AI Slop & Writing Style Rules
- Do not use emojis anywhere in documentation, source code, comments, or communication.
- Do not use em-dashes ("— "). Use colons, hyphens with standard spaces (" - "), or parentheses instead.
- Maintain professional, concise, and structured technical documentation.

## 2. Frontend Component Architecture: Atomic Design
All frontend components must be organized strictly following the Atomic Design methodology:

```text
src/components/
├── atoms/        # Primitive, indivisible UI elements (Button, Badge, Input, Typography, IconWrapper, Avatar)
├── molecules/    # Combinations of atoms acting as a single unit (SearchBar, PeruChanCallout, ArticleCard, AuthorMeta, BreadcrumbNav)
├── organisms/    # Complex standalone UI sections (NavbarHeader, FooterSection, ArticleGrid, ArtworkViewer, TimelineStream)
├── templates/    # Page layout structures and grid skeletons without hardcoded data bindings
└── [app/ routes] # Next.js Server Components and route handlers delivering data to templates
```
