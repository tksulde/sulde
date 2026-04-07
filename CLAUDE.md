# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev       # Start dev server (Next.js)
bun run build     # Production build
bun run start     # Start production server
bun run lint      # ESLint
```

No test runner is configured. Package manager is **bun** (bun.lock present).

## Architecture

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + MDX
**Deployed on:** Vercel (analytics + speed insights integrated)
**Site URL:** https://sulde.space

### Project Layout

```
app/
├── layout.tsx          # Root layout: ThemeProvider, Geist fonts, Analytics
├── page.tsx            # Home page ('use client') — hero, projects, work, blog, connect
├── globals.css         # Tailwind v4 imports + OKLCH design tokens
├── data.ts             # Single source of truth: projects, work, blog posts, social links, email
├── header.tsx          # Nav header with TextEffect animation
├── footer.tsx          # Footer with TextLoop + theme switcher
├── robots.ts           # SEO robots configuration
├── sitemap.ts          # Dynamic sitemap generation
├── not-found.tsx       # Custom 404 page
├── error.tsx           # Error boundary page
├── blog/
│   ├── layout.tsx      # Blog layout: scroll progress bar, copy URL, prose styling
│   ├── agentic-ai/     # Blog post + interactive diagrams (ReActLoop, MultiAgent, AgentArchitecture)
│   ├── ai/             # Blog post + interactive demos (Tokenization, SelfAttention, LLM)
│   ├── stack/          # Blog post (MDX only)
│   └── web3/           # Blog post (MDX only)
├── fancy/              # CSS scroll animation demo
├── marqee/             # Marquee animation demo
└── media/              # Media between text demo

components/
├── ui/                 # Reusable animated UI (shadcn/ui new-york style)
│   ├── text-effect.tsx         # Staggered text (char/word/line, presets: blur/fade/scale/slide)
│   ├── text-loop.tsx           # Cycling text elements
│   ├── text-morph.tsx          # Spring-based character morphing
│   ├── morphing-dialog.tsx     # Layout-animated modal with shared layoutId
│   ├── animated-background.tsx # Hover/click background highlight
│   ├── scroll-progress.tsx     # Scroll-tracking progress bar
│   ├── spotlight.tsx           # Mouse-tracking blur spotlight
│   ├── magnetic.tsx            # Magnetic mouse attraction
│   ├── marquee.tsx             # Infinite scroll marquee (draggable, velocity-aware)
│   ├── media-between-text.tsx  # Media reveal between text labels
│   ├── button.tsx              # shadcn Button (CVA variants)
│   └── css-box.tsx             # CSS box component
├── hero-section.tsx    # Hero with MediaBetweenText (name + profile image)
├── fancy-scroll.tsx    # CSS scroll demo wrapper
├── marqee-demo.tsx     # Marquee demo wrapper
└── media-between-demo.tsx

hooks/
├── use-screen-size.ts  # Responsive breakpoint detection (xs–2xl)
└── use-click-outside.ts # Outside click detection

lib/
├── utils.ts            # cn() — clsx + tailwind-merge
└── constants.ts        # WEBSITE_URL = 'https://sulde.space'

mdx-components.tsx      # Custom MDX overrides: <Cover src alt caption />
```

### Key Patterns

- **Server vs Client Components:** Layouts are Server Components. The home page and interactive UI use `'use client'`
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`. Design tokens use OKLCH color space. Dark mode via `next-themes` (class strategy, system default)
- **Component variants:** CVA for button variants. Always use `cn()` for conditional classes
- **Animation:** Only `motion` (from `motion/react`). All components use this library. No framer-motion
- **Video hosting:** Project videos are hosted on Uploadthing (ufs.sh URLs)
- **Fonts:** Geist (sans, `--font-geist`) + Geist_Mono (`--font-geist-mono`), applied via CSS variable classes on `<body>`
- **shadcn/ui:** new-york style, zinc base, lucide icons. Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`
- **MDX:** Blog posts at `app/blog/<slug>/page.mdx`. Interactive React components co-located. Config enables `.md` and `.mdx` page extensions
- **Security headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy configured in `next.config.mjs`

### Blog Post Structure

```
app/blog/<post-slug>/
├── page.mdx              # MDX content with metadata export
├── component.tsx         # (Optional) Interactive 'use client' components
├── opengraph-image.jpg   # (Optional) Social preview image
└── ...assets
```

**Creating a new blog post:**
1. Create directory `app/blog/<post-slug>/`
2. Create `page.mdx` with metadata export and content
3. Add entry to `BLOG_POSTS` array in `app/data.ts`

**Example MDX:**
```mdx
import { MyComponent } from './my-component.tsx'

export const metadata = {
  title: 'Post Title',
  description: 'Post description',
  alternates: { canonical: '/blog/post-slug' },
}

# Post Title

Content here...

<MyComponent />
```

**Interactive component conventions:**
- Co-locate with `page.mdx` in the same directory
- Use `'use client'` directive
- Use `motion` library (from `motion/react`) for animations
- Include play/pause controls and speed selectors (0.5x, 1x, 1.5x, 2x) for animated demos
- Style: white bg, gray-200 border, rounded-lg, shadow-sm

### Import Aliases

`@/*` maps to the project root (tsconfig.json).

## Code Style

- **Prettier:** no semicolons, single quotes, trailing commas, 2-space indent, 80 char width, auto endOfLine
- **Prettier plugin:** `prettier-plugin-tailwindcss` for class sorting
- **ESLint:** `next/core-web-vitals` + `next/typescript` + `prettier/recommended` + `mdx/recommended` (flat config)
