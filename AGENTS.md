# Agent Guidelines for Abril Torres Frontend

## Commands
- **Build**: `astro build` or `bun run build`
- **Dev server**: `astro dev` or `bun run dev`
- **Preview**: `astro preview` or `bun run preview`
- **Type check**: `astro check` (run after changes)
- **Lint/Test**: No linting or testing configured - add ESLint/Prettier/Vitest if needed

## Environment Variables
Configure social media links in `.env` file:
- `PUBLIC_INSTAGRAM_URL`: Instagram profile URL
- `PUBLIC_FACEBOOK_URL`: Facebook page URL
- `PUBLIC_EMAIL_URL`: Contact email (mailto: format)

## Code Style
- **Components**: PascalCase naming (.astro for Astro, .jsx for React)
- **Imports**: Group by type (Astro imports first, then React, then components)
- **Styling**: Tailwind CSS v4 with custom design tokens and CSS variables
- **Colors**: Use semantic color variables (--primary, --background, --foreground, etc.)
- **Typography**: Inria Serif font family (local fonts from /public/fonts/)
- **TypeScript**: Strict config enabled, explicit types required
- **HTML**: Semantic, accessible markup with Tailwind classes and ARIA labels
- **Error handling**: Use try/catch for async operations, proper error states in React
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for CSS classes
- **Language**: Spanish text for UI strings (Collecciones, Sostenibilidad, Contacto)