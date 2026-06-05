# OmniCode Project Instructions

## Project Purpose & Architecture

OmniCode is a **Next.js 14+** application that serves as an interactive guide and comparison tool for tech specifications (laptops, components, etc.). It features:

- **Static site generation** with dynamic routes for guide categories
- **Command palette** for quick navigation and actions
- **Decision engine** for spec recommendations
- **AI advisor** integration (with graceful fallback)
- **Comparison tools** and interactive wizards

**Architecture**: App Router (`src/app/`), component-based UI with Tailwind CSS, data-driven guides from JSON files.

## Important Files & Modules

### Core Data
- `guide.json`, `guide2.json`, `guide3.json` — Guide content data
- `src/lib/data/guide-repository.ts` — Data access layer (all `get*` functions)

### Key Components
- `src/app/guides/[category]/page.tsx` — Dynamic guide pages (uses `generateStaticParams`)
- `src/components/command-palette/` — Command palette system (search, registry, workflow, history)
- `src/components/compare/comparison-tool.tsx` — Side-by-side comparison
- `src/components/interactive/recommendation-wizard.tsx` — Guided recommendation flow
- `src/components/navigation/` — TopNav, ThemeToggle, BrandLogo
- `src/components/ui/` — Reusable UI primitives (Card, Badge, Stepper, Tabs, Accordion, etc.)

### Business Logic
- `src/lib/decision/decision-engine.ts` — Spec recommendation algorithm
- `src/lib/ai/contracts.ts` — AI advisor interface (with `NotConfiguredAIAdvisor` fallback)
- `src/hooks/useComparison.ts` — Comparison state hook

### Utilities
- `src/lib/utils.ts` — `cn()`, `kebabCase()`, `levenshtein()`

## Coding Conventions

- **TypeScript** — Strict mode, prefer explicit types over `any`
- **React** — Functional components with hooks, no class components
- **Imports** — Use absolute imports from `src/` (e.g., `import { cn } from '@/lib/utils'`)
- **CSS** — Tailwind CSS utility classes; avoid custom CSS unless necessary
- **Error handling** — Use `ErrorBoundary` component for UI errors; graceful degradation for AI features
- **Accessibility** — Include `aria-*` attributes, keyboard navigation support (`Kbd` component)
- **File naming** — kebab-case for files, PascalCase for components, camelCase for utilities

## Validation Commands

```bash
npm run lint    # ESLint check
npm run typecheck  # TypeScript type checking
```

Always run both before committing. Fix all lint and type errors.

## Risks & Things to Avoid

- **Do not modify** `.omnicode/` directory contents (Chroma DB, operations log, prompt history)
- **Do not remove** `NotConfiguredAIAdvisor` — it's the intentional fallback when no AI API key is set
- **Avoid breaking** the command palette's `AsyncSearchEngine` or `CommandRegistry` — they're central to navigation
- **Don't hardcode** guide data paths; always use the repository functions in `guide-repository.ts`
- **Preserve** the `generateStaticParams` pattern for dynamic routes (SSG compatibility)
- **Keep** the `ErrorBoundary` wrapping around any component that might throw
- **Don't add** new dependencies without updating `package.json` and `package-lock.json`
- **Avoid** inline styles; use Tailwind classes or the `cn()` utility for conditional classes
