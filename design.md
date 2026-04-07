# Design System

Design reference for the Sulde Portfolio. See `app/globals.css` for token definitions.

## Color System

Uses **OKLCH color space** for perceptually uniform colors. All colors are defined as CSS custom properties with light/dark variants.

### Core Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | white | zinc-950 | Page background |
| `--foreground` | zinc-950 | zinc-50 | Primary text |
| `--primary` | zinc-900 | zinc-200 | Headings, emphasis |
| `--primary-foreground` | zinc-50 | zinc-900 | Text on primary bg |
| `--secondary` | zinc-100 | zinc-800 | Secondary surfaces |
| `--muted` | zinc-100 | zinc-800 | Subdued backgrounds |
| `--muted-foreground` | zinc-500 | zinc-400 | Secondary text |
| `--accent` | zinc-100 | zinc-800 | Interactive highlights |
| `--border` | zinc-200 | white/10% | Borders, dividers |
| `--input` | zinc-200 | white/15% | Form inputs |
| `--ring` | zinc-400 | zinc-500 | Focus rings |
| `--destructive` | red | orange-red | Error states |

### Base Color

**Zinc** — neutral gray palette throughout. No brand accent color; the design relies on contrast and animation for visual interest.

### Dark Mode

- Provider: `next-themes` with `attribute="class"`, `defaultTheme="system"`
- Toggle: footer theme switcher using `AnimatedBackground` component
- Strategy: CSS variable swap via `.dark` class on `<html>`
- Tailwind: `@custom-variant dark (&:is(.dark *))` for v4 compatibility

## Typography

### Font Stack

| Font | Variable | Usage |
|------|----------|-------|
| **Geist** | `--font-geist` | Loaded but not directly applied via variable |
| **Geist Mono** | `--font-geist-mono` | Code blocks |
| **GeistPixelSquare** | (className) | Applied to `<body>` |
| **Inter Tight** | `--font-inter-tight` | Main content via `font-(--font-inter-tight)` |

### Scale

- **Body text:** `text-base` (16px) — zinc-600 light / zinc-400 dark
- **Section headings:** `text-lg font-medium` — zinc-950 light / zinc-50 dark
- **Subheadings:** `font-normal` (h4 level)
- **Small text:** `text-sm` — used in social link pills
- **Blog prose:** Tailwind Typography plugin with custom overrides:
  - `prose-h1:text-xl prose-h1:font-medium`
  - `prose-h2:text-lg prose-h2:font-medium prose-h2:mt-12`
  - `prose-gray dark:prose-invert`

### Tracking

Global `tracking-tight` on body + `antialiased` rendering.

## Layout

### Page Structure

```
max-w-3xl (768px) — centered content column
├── px-4 — horizontal padding
├── pt-20 — top padding for header clearance
├── min-h-screen flex-col — full viewport height
└── flex-1 — content grows to fill
```

### Section Spacing

- Between major sections: `space-y-24` (96px)
- Within sections: `space-y-2` (8px) for items, `mb-5` (20px) for section titles
- Blog list items: `space-y-0` with `-mx-3 px-3 py-3` for hover area

### Grid

- Projects: `grid grid-cols-1 sm:grid-cols-2 gap-6`
- Work experience: `flex flex-col space-y-2`
- Social links: `flex items-center space-x-3`

### Border Radius

Base `--radius: 0.625rem` (10px) with computed variants:
- `radius-sm`: 6px
- `radius-md`: 8px
- `radius-lg`: 10px (base)
- `radius-xl`: 14px

Common usage: `rounded-lg` for cards, `rounded-xl` for media, `rounded-2xl` for project containers, `rounded-full` for pills/buttons.

## Component Patterns

### Cards (Work Experience)

```
rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30  ← outer glow border
└── rounded-[15px] bg-white p-4 dark:bg-zinc-950        ← inner card
    └── Spotlight overlay                                  ← mouse-tracking effect
```

### Project Cards

```
rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50
└── video with rounded-xl, cursor-zoom-in
    └── MorphingDialog for fullscreen expand
```

### Social Link Pills

```
rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black
hover:bg-zinc-950 hover:text-zinc-50
dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700
└── Magnetic wrapper for mouse attraction
└── Arrow icon (SVG, 12px)
```

### Blog Links

```
AnimatedBackground (enableHover)
├── hover bg: rounded-lg bg-zinc-100 dark:bg-zinc-900/80
└── -mx-3 px-3 py-3 for extended hit area
```

### Buttons (shadcn)

CVA variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
Sizes: `default` (h-9 px-4 py-2), `sm` (h-8 px-3), `lg` (h-10 px-6), `icon` (h-9 w-9)

## Animation System

### Library: `motion` (from `motion/react`)

Primary animation library. `framer-motion` is kept for legacy blog components only.

### Page Entry Animation

Staggered fade-in-up with blur for all sections:

```typescript
// Container: staggers children by 150ms
{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }

// Each section: fades in, slides up, deblurs
{ hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }

// Duration: 0.3s per section
```

### Spring Configurations

| Component | Stiffness | Damping | Mass | Bounce |
|-----------|-----------|---------|------|--------|
| TextMorph | 280 | 18 | 0.2 | — |
| Magnetic | 26.7 | 4.1 | 0.2 | — |
| ScrollProgress | 200 | 50 | — | — |
| General transitions | — | — | — | 0 |

### Stagger Timing

| Mode | Delay |
|------|-------|
| Per character | 0.03s |
| Per word | 0.05s |
| Per line | 0.1s |
| Per section | 0.15s |

### Key Animation Components

- **TextEffect** — staggered text reveal (presets: blur, fade, scale, slide, fade-in-blur)
- **TextLoop** — cycling text with exit/enter transitions
- **TextMorph** — character-level spring morphing
- **MorphingDialog** — shared `layoutId` for smooth open/close
- **AnimatedBackground** — layout-animated hover/active indicator
- **ScrollProgress** — scroll-linked horizontal bar
- **Spotlight** — mouse-position blur gradient
- **Magnetic** — spring-based mouse attraction within configurable range
- **Marquee** — `useAnimationFrame` infinite scroll with drag + velocity

### Motion Best Practices

- Always use `type: 'spring', bounce: 0` for general transitions
- Use `layoutId` for shared element transitions (dialogs, tabs)
- Prefer `useSpring` over CSS transitions for physics-based movement
- Use `AnimatePresence` for exit animations
- Set `initial`, `animate`, `exit` variants for enter/leave patterns

## Responsive Behavior

### Breakpoints

Standard Tailwind breakpoints with `useScreenSize` hook for JS-level detection:
- `xs`: 0px
- `sm`: 640px — project grid becomes 2 columns
- `md`: 768px — dialog video height increases
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Adaptations

- Project grid collapses to single column
- Dialog videos use `h-[50vh]` on mobile, `md:h-[70vh]` on desktop
- Hero section adapts via `useScreenSize` breakpoint detection
- Content stays within `max-w-3xl` at all sizes

## Visual Effects

### Spotlight (Work Experience Cards)

Mouse-tracking radial gradient blur:
- Light: `from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl`
- Dark: `from-zinc-100 via-zinc-200 to-zinc-50`
- Size: 64px radius

### Underline Links

Animated underline on project names:
```
absolute bottom-0.5 left-0 h-[1px] w-full max-w-0
bg-zinc-900 transition-all duration-200
group-hover:max-w-full
```

### Blog Scroll Progress

Top-fixed gradient bar tracking scroll position:
- `h-0.5` height
- Spring-animated (`stiffness: 200, damping: 50`)
- Gradient: `from-yellow-300 via-orange-500 to-red-500`
