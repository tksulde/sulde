# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

No test runner is configured. The project uses `bun` as the package manager (bun.lock present).

## Architecture

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + MDX

### Project Layout

- `app/` — Next.js App Router. Routes include `/`, `/blog/*`, `/fancy`, `/marqee`, `/media`
- `app/data.ts` — Central content data (projects, work experience, blog posts, social links). This is the single source of truth for portfolio content
- `app/layout.tsx` — Root layout with ThemeProvider (next-themes), Geist fonts, Vercel Analytics/SpeedInsights
- `app/blog/` — MDX blog posts. Each post is a subdirectory with `page.mdx` and optional interactive React components
- `components/ui/` — Reusable UI components (shadcn/ui new-york style). Animation-heavy: morphing dialogs, magnetic cursors, text effects, marquee, spotlight
- `components/` — Page-level components (hero section, demo components)
- `hooks/` — Custom hooks (`useScreenSize`, `useClickOutside`)
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `mdx-components.tsx` — Custom MDX component overrides (Cover image component)

### Key Patterns

- **Server vs Client Components:** Pages and layouts are Server Components. Interactive UI (animations, theme switching, dialogs) uses `'use client'`
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss` plugin. CSS variables in oklch color space for theming. Dark mode via `next-themes` with class strategy
- **Component variants:** Class Variance Authority (CVA) for button variants etc. Always use the `cn()` helper for conditional classes
- **Animation:** Two motion libraries — `motion` (Motion Primitives, primary) and `framer-motion` (legacy). New animation work should prefer `motion`
- **shadcn/ui config:** `components.json` configures new-york style, zinc base color, lucide icons. Path aliases: `@/components`, `@/lib`, `@/hooks`
- **MDX:** Blog posts live in `app/blog/<slug>/page.mdx`. Can embed interactive React components. Next.js config enables `.md` and `.mdx` page extensions

### Blog Post Structure

Blog posts are located in `app/blog/<post-slug>/`:

```
app/blog/<post-slug>/
├── page.mdx              # Main blog content with MDX
├── react-loop.tsx        # (Optional) Interactive React components
├── opengraph-image.jpg   # (Optional) Social preview image
└── ...other assets
```

**Creating a new blog post:**

1. Create a new directory under `app/blog/<post-slug>/`
2. Create `page.mdx` with frontmatter metadata export
3. Import and use interactive components at the top of the MDX file
4. Add the blog post to `app/data.ts` in the `BLOG_POSTS` array

**Example MDX structure:**
```mdx
import { ReActLoop } from './react-loop.tsx'

export const metadata = {
  title: 'Post Title',
  description: 'Post description',
  alternates: { canonical: '/blog/post-slug' },
}

# Post Title

Content here...

<ReActLoop />

More content...
```

**Interactive component patterns:**
- Components must be in the same directory as `page.mdx`
- Use `'use client'` directive for interactivity
- Follow the existing animation patterns: play/pause controls, speed adjustment (0.5x, 1x, 1.5x, 2x)
- Use framer-motion for animations (AnimatePresence, motion components)
- Keep styling consistent: white background, gray-200 border, rounded-lg, shadow-sm
- Include step indicators and progress visualization

### Import Aliases

`@/*` maps to the project root (configured in tsconfig.json).

## Code Style

- Prettier: no semicolons, single quotes, trailing commas, 2-space indent, 80 char width
- Prettier plugin for Tailwind class sorting is active
- ESLint extends `next/core-web-vitals` + `next/typescript` + `prettier/recommended` + `mdx/recommended`
