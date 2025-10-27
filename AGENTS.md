# Agent Guidelines for Abril Torres Frontend

## Commands
- **Build**: `astro build` or `bun run build`
- **Dev server**: `astro dev` or `bun run dev`
- **Preview**: `astro preview` or `bun run preview`
- **Type check**: `astro check` (run after changes)
- **No lint/test commands configured** - add ESLint/Prettier if needed

## Code Style
- **Components**: PascalCase naming, `.astro` extension
- **Imports**: Group by type (Astro imports first, then components)
- **Styling**: Tailwind CSS with custom design tokens
- **Colors**: Use CSS custom properties (--primary, --background, etc.)
- **Typography**: Cormorant Garamond serif font family
- **TypeScript**: Strict config enabled, use explicit types
- **HTML**: Semantic, accessible markup with Tailwind classes
- **Error handling**: No established patterns yet - use try/catch for async operations