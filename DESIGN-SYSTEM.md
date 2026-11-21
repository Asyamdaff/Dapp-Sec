# Portfolio Source Code & Design System Audit

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Complete Project Directory Structure](#2-complete-project-directory-structure)
3. [Typography Specification](#3-typography-specification)
4. [Color Palette](#4-color-palette)
5. [Layout & Spacing Specification](#5-layout--spacing-specification)
6. [Responsive Design Specification](#6-responsive-design-specification)
7. [Component Architecture](#7-component-architecture)
8. [Section-by-Section Visual Specification](#8-section-by-section-visual-specification)
9. [Animation & Interaction Inventory](#9-animation--interaction-inventory)
10. [Asset Inventory](#10-asset-inventory)
11. [Accessibility & Technical Review](#11-accessibility--technical-review)
12. [Consolidated Design System Reference](#12-consolidated-design-system-reference)
13. [Issues Requiring Attention](#13-issues-requiring-attention)

---

## Legend

Every value in this document carries one of these markers:

| Marker | Meaning |
|---|---|
| **[C]** | Confirmed by reading the source code |
| **[F]** | Framework default (Tailwind CSS v3.4 or Next.js), not defined by the project |
| **[I]** | Inferred from CSS cascade or framework behavior. Verify in the browser |
| **[B]** | Requires browser inspection. Cannot be determined from source alone |

---

## 1. Executive Summary

This audit is read-only. No project files were modified, rewritten, or generated.

**Current state.** The portfolio is a Next.js 14 App Router site using React 18, TypeScript, and Tailwind CSS 3.4. It is a single-page site with seven content sections (Hero, About, Skills, Experience, Projects, Certifications, Contact), plus a navigation header, footer, and metadata routes. It is dark-only, uses Inter and JetBrains Mono, and has a restrained palette of charcoal-black, deep navy, and sky-blue accents.

**Known discrepancy.** The certificate update from the previous step is not in the project. `components/CertificateThumbnail.tsx` does not exist, `public/` is empty, and `lib/content.ts` still holds the original four certification entries with no `issued`, `expires`, or `image` fields. The Certifications section therefore shows names and issuers only, with no thumbnails or dates. This document describes the code as it currently exists.

**Other findings:**

- Placeholder text renders in the UI: the SOC Analyst L1 employer and dates, and the contact values.
- The `prefers-reduced-motion` rule does not stop the infinite hero scroll-cue animation (see [§11](#11-accessibility--technical-review)).
- Several small muted labels fall below WCAG AA contrast (see [§11](#11-accessibility--technical-review)).
- `npm run lint` will fail or prompt for setup because no ESLint configuration or ESLint package is present.
- The footer is defined inline in `app/page.tsx`. There is no separate `Footer` component.

---

## 2. Complete Project Directory Structure

```
portfolio/
├── .gitignore                  [C] node_modules, .next, out, *.tsbuildinfo, next-env.d.ts, .env*.local, .DS_Store
├── README.md                   [C] Setup, placeholder checklist, deploy notes
├── package.json                [C] Dependencies and scripts
├── tsconfig.json               [C] Strict TypeScript, "@/*" → "./*" path alias
├── next.config.mjs             [C] reactStrictMode: true, poweredByHeader: false
├── postcss.config.mjs          [C] tailwindcss + autoprefixer
├── tailwind.config.ts          [C] Theme extension: colors, fonts, letter-spacing, keyframes
├── public/                     [C] Exists, empty (0 files). No favicon, images, or font files
├── app/
│   ├── layout.tsx              [C] Root layout: fonts, metadata, viewport, JSON-LD, .js class script
│   ├── page.tsx                [C] Page composition, skip link, <main>, footer
│   ├── globals.css             [C] Tailwind directives, base/components layers, reveal and reduced-motion CSS
│   ├── opengraph-image.tsx     [C] Generated 1200×630 PNG via next/og ImageResponse
│   ├── robots.ts               [C] Allow all, sitemap pointer
│   └── sitemap.ts              [C] Single URL entry (root)
├── components/
│   ├── Nav.tsx                 [C] Client. Fixed header, scroll state, progress bar, active section, mobile menu
│   ├── Hero.tsx                [C] Server. Introduction, headline, bio, CTAs, scroll cue
│   ├── About.tsx               [C] Server. Paragraphs and focus list
│   ├── Section.tsx             [C] Server. Shared editorial frame (index column, title, content slot)
│   ├── Reveal.tsx              [C] Client. IntersectionObserver fade-in wrapper with polymorphic `as` prop
│   ├── Skills.tsx              [C] Server. Grouped skill rows
│   ├── Experience.tsx          [C] Server. Timeline list
│   ├── Projects.tsx            [C] Server. Numbered project rows with tags
│   ├── Certifications.tsx      [C] Server. Four-cell grid (names and issuers only)
│   └── Contact.tsx             [C] Server. CTA and link rows
└── lib/
    └── content.ts              [C] Single data source: site, nav, hero, about, skillGroups, experience, projects, certifications
```

### Files that do not exist

| Path | Status |
|---|---|
| `components/Footer.tsx` | Not present. Footer is inline in `app/page.tsx` [C] |
| `components/CertificateThumbnail.tsx` | Not present. Pending the previous update [C] |
| `public/certificates/*` | Not present. No images [C] |
| `app/icon.*`, `app/apple-icon.*` | Not present [C] |
| `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx` | Not present [C] |
| `.eslintrc*`, `eslint.config.*` | Not present [C] |
| `next.config.ts` | Not present. The project uses `next.config.mjs` [C] |

### Configuration

**`package.json` [C]**

| Package | Version |
|---|---|
| next | 14.2.15 |
| react / react-dom | 18.3.1 |
| tailwindcss | 3.4.6 |
| typescript | 5.5.3 |
| postcss | 8.4.39 |
| autoprefixer | 10.4.19 |
| @types/node / @types/react / @types/react-dom | 20.14.10 / 18.3.3 / 18.3.0 |

Scripts: `dev`, `build`, `start`, `lint` (`next lint`; see [§11](#11-accessibility--technical-review)).

**`tsconfig.json` [C]:** target ES2017, `strict: true`, `moduleResolution: "bundler"`, `jsx: "preserve"`, `incremental: true`, path alias `@/*`, Next.js plugin.

**`tailwind.config.ts` [C]:**

- `content`: `./app`, `./components`, `./lib`.
- Custom colors: `ink`, `charcoal`, `navy`, `accent`, `accentDeep` (see [§4](#4-color-palette)).
- Custom font families: `sans` → `var(--font-sans)`, `mono` → `var(--font-mono)`.
- Custom letter-spacing: `tightest: -0.04em`.
- Custom keyframes: `drop`.
- No custom `screens`. Default breakpoints apply [F].
- No plugins.

### CSS architecture

`app/globals.css` has three parts:

1. **`@layer base`:** `html`, `body`, `::selection`, `:focus-visible`.
2. **`@layer components`:** `.eyebrow`, `.display`, `.btn-primary`, `.btn-ghost`, `.hairline`, `.link-line`.
3. **Unlayered:** `.js .reveal` states and reduced-motion overrides.

There is no CSS Modules or CSS-in-JS. Styling is utility-first Tailwind with the component classes above.

### Component dependency graph

```
app/layout.tsx
└── app/page.tsx
    ├── Nav (client)
    ├── Hero ─────────────► Reveal (client); lib/content: hero, experience, site
    ├── About ────────────► Section, Reveal; lib/content: about
    ├── Skills ───────────► Section, Reveal; lib/content: skillGroups
    ├── Experience ───────► Section, Reveal; lib/content: experience
    ├── Projects ─────────► Section, Reveal; lib/content: projects
    ├── Certifications ───► Section, Reveal; lib/content: certifications
    ├── Contact ──────────► Section, Reveal; lib/content: site
    └── footer (inline) ──► lib/content: site

Section ──► Reveal
Nav ──────► lib/content: nav, site (does not use Reveal)
```

---

## 3. Typography Specification

### 3.1 Font families

| Family | Source | Loading | Weights | Assignment | Used for |
|---|---|---|---|---|---|
| **Inter** | Google Fonts via `next/font/google` [C] | Build-time, self-hosted by Next.js [F]. `subsets: ["latin"]`, `display: "swap"` | Not restricted in code. Variable font, so the full range is available [I]. Weights used in code: 400 (default) and 500 (`font-medium`). No 600 or 700 found [C] | CSS variable `--font-sans` on `<html>`, mapped to `fontFamily.sans` in Tailwind. Fallbacks: `system-ui`, `sans-serif` [C] | Headings, body, buttons, navigation |
| **JetBrains Mono** | Google Fonts via `next/font/google` [C] | Same as above | Not restricted in code. Variable font [I]. Used at default weight 400 only [C] | `--font-mono`, mapped to `fontFamily.mono`. Fallbacks: `ui-monospace`, `monospace` [C] | Eyebrows, index numbers, dates, tags, metadata labels, footer tagline |

No local font files, no `@font-face` declarations, and no font files in `public/` [C].

### 3.2 Body base

Applied in `@layer base` [C]:

- `font-sans`
- `text-[15px]`
- `leading-relaxed` (1.625 [F])
- `text-slate-400`
- `bg-ink`

### 3.3 Element specifications

Font-size and line-height values for Tailwind classes are Tailwind v3 defaults [F] unless marked otherwise. Letter-spacing for `.display` is `-0.04em` [C].

| Element | Font Family | Weight | Desktop Size | Mobile Size | Line Height | Letter Spacing | Source |
|---|---|---|---|---|---|---|---|
| Hero headline (`h1`) | Inter | 500 (`display` → `font-medium`) | `lg:text-[5.5rem]` = 88px | `text-[2.75rem]` = 44px; `sm:text-6xl` = 60px at ≥640px | Mobile: `leading-[1.02]`. ≥640px: effective 1 (from `text-6xl`) [I]. ≥1024px: `lg:leading-[0.98]` | `-0.04em` (`tracking-tightest`) | `Hero.tsx`, `globals.css` |
| Section headline (`h2`) | Inter | 500 | `md:text-[3.25rem]` = 52px | `text-3xl` = 30px; `sm:text-4xl` = 36px | Base 2.25rem; sm 2.5rem; md `leading-[1.08]` | `-0.04em` | `Section.tsx` |
| Card and job heading (`h3`) | Inter | 500 | `text-2xl` = 24px | `text-2xl` = 24px | 2rem [F] | Default | `Experience.tsx`, `Projects.tsx` |
| Skill group label (`h3`) | JetBrains Mono | 400 | 11px | 11px | Inherited | `0.18em` | `Skills.tsx` |
| Certification name | Inter | 400 | `text-lg` = 18px | 18px | 1.75rem [F] | Default | `Certifications.tsx` |
| About focus item | Inter | 400 | `text-sm` = 14px | 14px | 1.25rem [F] | Default | `About.tsx` |
| Hero name line | Inter | 400 | `md:text-xl` = 20px | `text-lg` = 18px | 1.75rem [F] | Default | `Hero.tsx` |
| About paragraphs | Inter | 400 | `md:text-xl` = 20px, `md:leading-relaxed` | `text-lg` = 18px, `leading-relaxed` | 1.625 [F] | Default | `About.tsx` |
| Hero bio | Inter | 400 | `md:text-lg` = 18px | `text-base` = 16px | 1.625 [F] | Default | `Hero.tsx` |
| Contact statement | Inter | 400 | `md:text-2xl` = 24px | `text-xl` = 20px | 1.625 | Default | `Contact.tsx` |
| Experience summary and bullets | Inter | 400 | 15px (body); bullets 14px (`text-sm`) | Same | 1.625 / 1.25rem+ [F] | Default | `Experience.tsx` |
| Project body | Inter | 400 | 15px | 15px | 1.625 | Default | `Projects.tsx` |
| Navigation links | Inter | 400 | `text-sm` = 14px | Hidden below 1024px; drawer uses `text-xl` = 20px | 1.25rem [F] | Default | `Nav.tsx` |
| Logo | Inter | 500 | `text-sm` = 14px | 14px | 1.25rem [F] | `tracking-tight` (-0.025em [F]) | `Nav.tsx` |
| Primary button | Inter | 500 | `text-sm` = 14px | 14px | 1.25rem [F] | Default | `.btn-primary` |
| Ghost button | Inter | 500 | `text-sm` = 14px | 14px | 1.25rem [F] | Default | `.btn-ghost` |
| Eyebrow | JetBrains Mono | 400 | 11px | 11px | Inherited | `0.22em` | `.eyebrow` |
| Index markers (e.g. "INDEX — 01", "02") | JetBrains Mono | 400 | `text-xs` = 12px | 12px | 1rem [F] | Default | `Section.tsx`, `Hero.tsx` |
| Hero metadata labels (Focus, Currently, INDEX) | JetBrains Mono | 400 | 11px | 11px | Inherited | `0.18em` to `0.22em` | `Hero.tsx` |
| Experience period | JetBrains Mono | 400 | `text-xs` = 12px | 12px | 1rem [F] | Default | `Experience.tsx` |
| Project title | Inter | 500 | `text-2xl` = 24px | 24px | 2rem [F] | Default | `Projects.tsx` |
| Project tags | JetBrains Mono | 400 | 11px | 11px | Inherited | Default | `Projects.tsx` |
| Certification issuer | Inter | 400 | `text-sm` = 14px | 14px | 1.25rem [F] | Default | `Certifications.tsx` |
| Contact link labels | JetBrains Mono | 400 | 11px | 11px | Inherited | `0.18em` | `Contact.tsx` |
| Contact link values | Inter | 400 | `md:text-lg` = 18px | `text-base` = 16px | Inherited | Default | `Contact.tsx` |
| Footer copyright | Inter | 400 | `text-xs` = 12px | 12px | 1rem [F] | Default | `page.tsx` |
| Footer tagline | JetBrains Mono | 400 | 12px | 12px | 1rem [F] | Default | `page.tsx` |

**Note:** Two sizes use custom arbitrary values rather than theme tokens: `text-[11px]` for all mono labels and `text-[15px]` for the body base. No `text-*` tokens are defined in the Tailwind theme [C].

---

## 4. Color Palette

### 4.1 Theme tokens (Tailwind extension) [C]

| Token | HEX | RGB | Class prefixes | Usage |
|---|---|---|---|---|
| `ink` | `#0a0b0e` | 10, 11, 14 | `bg-ink`, `text-ink`, `ring-offset-ink`, `bg-ink/80`, `bg-ink/95` | Primary background (body), button text on accent, nav blur background |
| `charcoal` | `#111318` | 17, 19, 24 | `bg-charcoal`, `hover:bg-charcoal` | Certification cell hover |
| `navy` | `#0b1424` | 11, 20, 36 | `bg-navy` | Defined; no current usage found in the Hero [C] |
| `accent` | `#7dd3fc` | 125, 211, 252 | `text-accent`, `bg-accent`, `border-accent`, `ring-accent`, `from-accent`, and others | Primary accent (sky-300 equivalent). Eyebrows, links, progress bar, primary button background |
| `accentDeep` | `#38bdf8` | 56, 189, 248 | Used only in the Hero radial gradient as `rgba(56,189,248,0.12)` | Atmospheric glow [C] |

### 4.2 Default Tailwind palette in use [F]

| Class | HEX | Usage |
|---|---|---|
| `text-white`, `bg-white` | `#ffffff` | Headings, primary text, primary button hover fill |
| `text-slate-300` | `#cbd5e1` | Hero name, nav drawer items |
| `text-slate-400` | `#94a3b8` | Base body text, nav links, tags, hero bio |
| `text-slate-500` | `#64748b` | Labels, periods, issuers, footer, contact labels |
| `text-slate-600` | `#475569` | Index numbers, scroll cue, hero metadata labels, project and certification numbers |
| `bg-slate-700` | `#334155` | Inactive timeline dot |

### 4.3 Opacity and transparency values [C]

| Value | Usage |
|---|---|
| `white/[0.05]` | Nav drawer row dividers |
| `white/[0.06]` | Nav bottom border (scrolled), footer top border |
| `white/[0.07]` | Hero vertical rule gradient |
| `white/[0.08]` | Hairline dividers (`.hairline`, `divide-y`, certification grid border and gap) |
| `white/10` | Ghost button border, project tag borders |
| `white/90` | Skill item text |
| `accent/0` | Progress bar gradient end stops |
| `accent/25` | `::selection` background |
| `accent/50` | Section and hero rule (`bg-accent/50`) |
| `accent/60` | `:focus-visible` ring |
| `accent/80` | Eyebrow text, experience organization |
| `accent/10` | Current-job timeline halo (`ring-accent/10`) |
| `accent/25` (hover) | Project tag border on row hover |
| `ink/80` | Nav background when scrolled |
| `ink/95` | Nav background when the drawer is open |
| `rgba(56,189,248,0.12)` | Hero glow gradient |

### 4.4 Gradients [C]

- **Hero glow:** `bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)]` on a 40rem circle, positioned with `-right-48` and `top-[15%]`.
- **Hero vertical rule:** `bg-gradient-to-b from-transparent via-white/[0.07] to-transparent`, shown from `md` upward.
- **Nav progress bar:** `bg-gradient-to-r from-accent/0 via-accent to-accent/0`, scaled horizontally with `transform`.

No background images are used [C].

### 4.5 Theme behavior

- **Dark only.** No light theme and no toggle [C].
- `viewport.colorScheme: "dark"` and `themeColor: "#0a0b0e"` are set in `layout.tsx` [C].
- No `prefers-color-scheme` queries [C].

### 4.6 Focus and hover colors [C]

**Focus:**

- `:focus-visible`: `outline-none`, `ring-2`, `ring-accent/60`, `ring-offset-2`, `ring-offset-ink`.
- Skip link on focus: `bg-accent`, `text-ink`.

**Hover:**

| Element | Default | Hover |
|---|---|---|
| Primary button | `bg-accent` | `bg-white` |
| Ghost button | `border-white/10`, text white | `border-accent/50`, text accent |
| Navigation links | slate-400 | white |
| Project title | white | accent |
| Skill items | white/90 | accent |
| Contact row value | white | accent |
| Certification cell | transparent | `bg-charcoal` |

---

## 5. Layout & Spacing Specification

### 5.1 Global layout values

| Property | Value | Class or source | Applied to |
|---|---|---|---|
| Max content width | 72rem = 1152px | `max-w-6xl` [F] | Nav, Hero, Section grid, hero scroll cue, footer |
| Horizontal padding (mobile) | 1.5rem = 24px | `px-6` [F] | Nav, Hero, Section, footer |
| Horizontal padding (≥768px) | 3rem = 48px | `md:px-12` [F] | Same |
| Section vertical padding (mobile) | 7rem = 112px | `py-28` [F] | Section |
| Section vertical padding (≥768px) | 10rem = 160px | `md:py-40` [F] | Section |
| Section scroll offset | 5rem = 80px | `scroll-mt-20` on sections; `scroll-padding-top: 5rem` on `html` [C] | Anchor navigation |
| Hero top padding | 8rem = 128px | `pt-32` [F] | Hero (clears fixed nav) |
| Hero bottom padding | 3rem = 48px | `pb-12` [F] | Hero |
| Hero minimum height | 100svh | `min-h-[100svh]` [C] | Hero |

### 5.2 Grid and column structures

| Component | Mobile | ≥768px (`md`) | Other |
|---|---|---|---|
| Section frame | 1 column, `gap-10` (2.5rem) | 12-column grid. Index `md:col-span-4` (sticky, `md:top-32`). Content `md:col-span-8`. `md:gap-x-12` (3rem) | Content top margin `mt-14` (3.5rem), `md:mt-16` (4rem) |
| Hero | 1 column, `gap-16` (4rem) | 12-column. Left `md:col-span-3`, right `md:col-span-9` | Vertically centered (`items-center`) |
| Skills row | Stacked, `gap-5` | `md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]` | Items `gap-x-8`, `gap-y-3` |
| Experience timeline | Stacked, `pl-8` | `md:pl-10` | 1px left border; dot at `-left-[5px]` |
| Projects row | Stacked, `gap-4` | `md:grid-cols-[3rem_minmax(0,1fr)]`, `md:gap-6` | Tags `gap-2` |
| Certifications grid | 1 column | `sm:grid-cols-2` (≥640px) | `gap-px` over `bg-white/[0.08]` (1px dividers) |
| About focus list | 1 column, `gap-8` | `sm:grid-cols-3` (≥640px) | `pt-10`, `mt-16` |
| Contact links | Full-width rows | Same | `py-6` per row |
| Hero scroll cue | Right-aligned (`justify-end`) | Left-aligned (`md:justify-start`) | `mt-16` |

### 5.3 Spacing scale (observed)

| Scale | Values used | Where |
|---|---|---|
| Gaps | `gap-1`, `gap-2`, `gap-2.5`, `gap-3`, `gap-4`, `gap-6`, `gap-7`, `gap-8`, `gap-16` | Tags, bullets, buttons, navigation, columns |
| Vertical rhythm | `mt-2` through `mt-20`; `space-y-1`, `space-y-3`, `space-y-6` | Titles, paragraphs, lists |
| Padding | `p-2`, `p-6`, `p-8`, `px-3`, `px-4`, `px-6`, `px-12`, `py-1` through `py-10` | Buttons, cells, rows |
| Largest vertical | `py-40` (160px) on sections; `pt-32` (128px) on the hero | Editorial breathing room |

### 5.4 Borders, dividers, and radii [C]

| Element | Border | Radius |
|---|---|---|
| `.hairline` | 1px top border, `white/[0.08]` | None |
| Skills and Projects lists | `divide-y` plus `border-y`, `white/[0.08]` | None |
| Certifications grid | 1px border `white/[0.08]`; `bg-white/[0.08]` gap | `rounded-2xl` = 1rem [F] |
| Primary button | None | `rounded-full` |
| Ghost button | 1px `white/10` | `rounded-full` |
| Project tags | 1px `white/10` | `rounded-full` |
| Navigation bar | 1px bottom `white/[0.06]` when scrolled | None |
| Timeline | 1px left border `white/[0.08]` | None |
| Hero and section rules | 1px `h-px w-10` `accent/50` | None |
| Timeline dot | None | `rounded-full` |

### 5.5 Positioning and z-index [C]

| Element | Positioning | z-index |
|---|---|---|
| Navigation header | `fixed inset-x-0 top-0` | `z-50` |
| Navigation progress bar | `absolute inset-x-0 bottom-0 h-px` inside the header | Inherits header |
| Skip link (on focus) | `fixed left-4 top-4` | `z-[60]` |
| Hero decorative layer | `absolute inset-0 -z-10` within an `isolate` parent | `-z-10` |
| Hero glow | `absolute -right-48 top-[15%]` | Within decorative layer |
| Section index (desktop) | `md:sticky md:top-32 md:self-start` | None |
| Hero content | `relative` | None |

### 5.6 Overflow [C]

- Hero: `overflow-hidden` (clips the glow).
- Certifications grid: `overflow-hidden` with `rounded-2xl` (clips grid corners).
- Hero scroll cue track: `overflow-hidden` (clips the moving bar).
- `html`: no global overflow rule.

---

## 6. Responsive Design Specification

### 6.1 Breakpoints in use [C]

Default Tailwind breakpoints are used. No custom `screens` are defined [F].

| Prefix | Minimum width | Used in code |
|---|---|---|
| `sm:` | 640px | Yes: Hero headline, Section title, Certifications grid, About focus grid |
| `md:` | 768px | Yes: most layout and typography changes |
| `lg:` | 1024px | Yes: navigation switches to desktop links; Hero headline size |
| `xl:` | 1280px | No |
| `2xl:` | 1536px | No |

Other responsive mechanisms:

- `hidden md:block` on the Hero vertical rule [C].
- `hidden lg:flex` on navigation links; `lg:hidden` on the hamburger and mobile menu [C].
- `aspect-ratio` and `object-fit` are not used. No images are rendered [C].

### 6.2 Behavior by viewport

**Mobile (below 640px)**

- Navigation shows the logo and hamburger. The drawer lists all six links at `text-xl` with `py-4` rows.
- Hero: single column, left metadata block above the headline. Text is left-aligned. Headline at 44px with `leading-[1.02]`. CTAs wrap (`flex-wrap`).
- Section: single column. Index and eyebrow sit above the title. Title at 30px.
- Skills: label above item list.
- Experience timeline: left-aligned with a dot on the border.
- Projects: number above title.
- Certifications: one column.
- Contact: full-width link rows, arrow at the right end of each row.
- Footer: stacked and centered.

**Tablet (640px to 1023px)**

- Certifications: two columns.
- About focus items: three columns.
- Section title grows to 36px (≥640px), then 52px (≥768px).
- Navigation still uses the drawer. The switch point is 1024px.
- Hero text remains left-aligned below 768px.

**Desktop (768px to 1023px)**

- Section split: index column (4 of 12) and content (8 of 12), with the index sticky at `top-32`.
- Hero: 3-of-12 left metadata, 9-of-12 right content. Text is right-aligned. The bio block is `ml-auto` with `max-w-xl`.
- Section vertical padding increases to 160px.
- Skills rows switch to a two-column grid.
- Projects rows switch to a number column (3rem) and a content column.
- Navigation still uses the drawer until 1024px.

**Large desktop (1024px and above)**

- Navigation shows desktop links with `gap-7`, replacing the hamburger.
- Hero headline grows to 88px with `leading-[0.98]`.
- Content width is capped at 1152px, with 48px gutters on each side, centered.

### 6.3 Component responsiveness

| Component | Font size changes | Spacing changes | Grid changes | Alignment changes | Visibility changes |
|---|---|---|---|---|---|
| Navigation | Links `text-sm`; drawer `text-xl` | Padding `py-5`, `px-6` → `md:px-12` | None | None | Links hidden below 1024px; hamburger hidden at 1024px and up |
| Hero | Headline 44 / 60 / 88px; bio 16 / 18px | Top 128px, bottom 48px; grid gap 16px mobile | 1 column → 12-column at md | Left-aligned mobile; right-aligned at md | Vertical rule hidden below md |
| Section | Title 30 / 36 / 52px | Padding 112px / 160px | 1 column → 12-column at md | Sticky index at md | None |
| About | Paragraphs 18 / 20px | None | Focus list 1 → 3 columns at sm | None | None |
| Skills | Items 18 / 20px | Item gap | 1 → 2 columns at md | None | None |
| Experience | Role 24px | Left padding `pl-8` → `md:pl-10` | None | None | None |
| Projects | Title 24px | Gap `gap-4` → `md:gap-6` | 1 → 2 columns at md | None | None |
| Certifications | Name 18px | Cell padding `p-8` | 1 → 2 columns at sm | None | None |
| Contact | Statement 20 / 24px; values 16 / 18px | `mt-20` before links | None | None | None |
| Footer | 12px | None | 1 → 2 columns at md | Centered → spread | None |

**Image sizing:** No images are rendered yet. The thumbnail sizing from the previous update is not in the project [C].

---

## 7. Component Architecture

### 7.1 `app/layout.tsx` [C]

- **Purpose:** Root HTML shell, fonts, metadata, viewport, and JSON-LD Person schema.
- **Props and data:** `children`. Reads `site` from `lib/content.ts`.
- **Markup:** `<html lang="en">`. `<head>` contains an inline script that adds the `js` class to `<html>`. `<body>` contains a JSON-LD `<script>` and the children.
- **Styling:** Font variable classes on `<html>`.
- **Responsive, interaction, animation:** None.

### 7.2 `app/page.tsx` [C]

- **Purpose:** Composes the sections. Renders the skip link, navigation, `<main>`, and footer.
- **Markup:** Skip link (`sr-only`, visible on focus), `<Nav />`, `<main id="main">`, `<footer>`.
- **Footer contents:** `© {year} {site.name}` and a mono tagline.
- **Styling:** Footer `border-t border-white/[0.06] px-6 py-8 text-xs text-slate-500 md:px-12`.

### 7.3 `components/Nav.tsx` [C] (client)

- **Purpose:** Fixed header with logo, desktop links, mobile drawer, scroll progress, and active-section highlighting.
- **Data:** `nav` and `site` from `lib/content.ts`.
- **Markup:** `<header>` > `<nav aria-label="Primary">` > logo link `<a href="#top">`, desktop link list, hamburger `<button>`. Progress bar `<div aria-hidden>`. Drawer `<ul id="mobile-menu">` when open.
- **State:** `scrolled` (boolean, true when `scrollY > 24`), `open` (boolean), `active` (string, e.g. `#about`).
- **Logic:**
  - Scroll listener throttled with `requestAnimationFrame`. Updates `scrolled` and sets progress `transform: scaleX(y / max)` directly on the DOM node.
  - Resize listener calls the same update.
  - `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"` sets `active`.
  - Escape key closes the drawer.
- **Styling:**
  - Header: `fixed inset-x-0 top-0 z-50`. When scrolled or open: `border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl`. Otherwise `border-transparent`.
  - Header transition: `transition-[background-color,border-color] duration-500`.
  - Logo: `text-sm font-medium tracking-tight text-white`. Dot in `text-accent`, `group-hover:translate-x-0.5`.
  - Links: `link-line pb-0.5 text-sm`. `aria-current="location"` when active.
  - Drawer: `bg-ink/95 backdrop-blur-xl px-6 pb-8 pt-2`.
- **Responsive:** Desktop links hidden below 1024px. Hamburger hidden at 1024px and up.

### 7.4 `components/Hero.tsx` [C] (server)

- **Purpose:** Introduction with an asymmetric, right-aligned layout.
- **Data:** `experience` (to find the current role), `hero`, `site`.
- **Child components:** `Reveal` (multiple).
- **Markup:** `<section id="top" aria-labelledby="hero-title">`. Decorative layer (`aria-hidden`). Two-column grid: left `<Reveal>` containing a `<dl>` (Focus list, Currently); right `<div>` containing the eyebrow, name, `<h1 id="hero-title">`, bio, and CTAs. Scroll cue `<a href="#about">` with an animated bar.
- **Styling:**
  - Glow: `absolute -right-48 top-[15%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)]`.
  - Vertical rule: `absolute bottom-0 left-[25%] top-0 hidden w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent md:block`.
  - Primary CTA: `.btn-primary group`. Secondary CTA: `.btn-ghost group`. Arrows: `group-hover:translate-x-1`, `duration-500`.
- **Interactions:** CTAs link to `#projects` and `#contact`. Scroll cue links to `#about`.

### 7.5 `components/Section.tsx` [C] (server)

- **Purpose:** Shared editorial frame used by six sections.
- **Props:** `id`, `index`, `eyebrow`, `title`, `children`.
- **Markup:** `<section id aria-labelledby>`. Grid with a left `<Reveal>` containing the index, a 40px accent rule (`h-px w-10 bg-accent/50`), and the eyebrow. Right side: `<Reveal><h2 id="{id}-title">`, followed by the content wrapper.
- **Styling:**
  - Section: `scroll-mt-20 px-6 py-28 md:px-12 md:py-40`.
  - Index column: `md:col-span-4 md:sticky md:top-32 md:self-start`.
  - Title: `display text-3xl sm:text-4xl md:text-[3.25rem] md:leading-[1.08]`.
  - Content wrapper: `mt-14 md:mt-16`.

### 7.6 `components/Reveal.tsx` [C] (client)

- **Purpose:** Scroll-triggered fade-in. Polymorphic element through the `as` prop.
- **Props:** `as` (default `"div"`), `children`, `delay` (milliseconds), `className`.
- **Logic:**
  - If `prefers-reduced-motion` matches, or `IntersectionObserver` is unavailable, the element becomes visible immediately.
  - Otherwise it observes the element with `threshold: 0.12` and `rootMargin: "0px 0px -8% 0px"`, sets visible once, and disconnects.
- **Markup:** `<Tag class="reveal [is-visible]">`. Applies `transitionDelay` when `delay` is nonzero.
- **Used by:** Hero, Section, About, Skills, Experience, Projects, Certifications, Contact.

### 7.7 `components/About.tsx` [C] (server)

- **Purpose:** Narrative and focus areas.
- **Data:** `about.paragraphs`, `about.focus`.
- **Markup:** Paragraphs, each wrapped in `<Reveal>`. Then a `<ul>` of focus items, each with an animated rule.
- **Styling:**
  - Paragraphs: `space-y-6 text-lg leading-relaxed md:text-xl md:leading-relaxed`.
  - Focus list: `mt-16 grid gap-8 border-t border-white/[0.08] pt-10 sm:grid-cols-3`.
  - Rule: `mb-5 block h-px w-8 bg-accent/60`, hover `w-16 bg-accent`, `duration-700`.

### 7.8 `components/Skills.tsx` [C] (server)

- **Purpose:** Grouped technical skills.
- **Data:** `skillGroups`.
- **Markup:** `<ul divide-y border-y>` > `<Reveal as="li">` per group > `<h3>` label and nested `<ul>` of items.
- **Styling:**
  - Row: `grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-baseline`.
  - Item: `cursor-default text-lg text-white/90 transition-colors duration-300 hover:text-accent md:text-xl`.

### 7.9 `components/Experience.tsx` [C] (server)

- **Purpose:** Career timeline.
- **Data:** `experience` (role, org, period, current, summary, points).
- **Markup:** `<ol>` > `<Reveal as="li">` per job, with timeline dot, period, role `<h3>`, organization, summary, and bullet `<ul>`.
- **Styling:**
  - Item: `relative grid gap-4 border-l border-white/[0.08] pb-16 pl-8 last:pb-0 md:pl-10`.
  - Dot: `absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full`.
  - Current job: `bg-accent ring-4 ring-accent/10`. Past job: `bg-slate-700`.

### 7.10 `components/Projects.tsx` [C] (server)

- **Purpose:** Numbered project rows.
- **Data:** `projects` (title, tags, body).
- **Markup:** `<ul divide-y border-y>` > `<Reveal as="li" className="group ...">` with number, `<h3>`, body, and tag `<ul>`.
- **Styling:**
  - Row: `group grid gap-4 py-10 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6`.
  - Number: `font-mono text-xs text-slate-600 group-hover:text-accent md:pt-2`.
  - Tags: `rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-400`, hover `group-hover:border-accent/25`.

### 7.11 `components/Certifications.tsx` [C] (server, original version)

- **Purpose:** Certification list.
- **Data:** `certifications` (name and issuer only).
- **Markup:** `<ul class="grid gap-px overflow-hidden rounded-2xl border ... bg-white/[0.08] sm:grid-cols-2">` > `<Reveal as="li" className="bg-ink">` > `<div class="group flex h-full items-center justify-between gap-6 p-8 hover:bg-charcoal">` with name, issuer, and index number.
- **Styling:**
  - Name: `text-lg text-white`.
  - Issuer: `mt-1 text-sm text-slate-500`.
  - Index: `font-mono text-xs text-slate-600 group-hover:text-accent`.
- **Not present:** Thumbnails, dates, lightbox, and `CertificateThumbnail` [C].

### 7.12 `components/Contact.tsx` [C] (server)

- **Purpose:** Call to action and contact links.
- **Data:** `site`.
- **Markup:** Statement `<p>`, primary CTA `<a href="mailto:...">`, and a `<ul divide-y border-y>` of three link rows (email, LinkedIn, GitHub).
- **Derived values:** The LinkedIn and GitHub display text strips the protocol and `www.` from the URL [C].
- **Styling:**
  - Statement: `max-w-xl text-xl leading-relaxed text-white md:text-2xl md:leading-relaxed`.
  - Row: `group flex items-center justify-between gap-6 py-6`.
  - Label: `font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500`.
  - Value: `text-base text-white group-hover:text-accent md:text-lg`, with the `.link-line` underline animation.
- **External links:** LinkedIn and GitHub use `target="_blank"` and `rel="noopener noreferrer"` [C].

### 7.13 `lib/content.ts` [C]

- **Exports:** `site`, `nav`, `hero`, `about`, `skillGroups`, `experience`, `projects`, `certifications`.
- **Placeholder values that appear in the UI:**
  - `site.url`: `https://example.com`.
  - `site.email`: `your.email@example.com`.
  - `site.linkedin` and `site.github`: URLs ending in `your-handle`.
  - `experience[1].org`: `[PLACEHOLDER: Company]`.
  - `experience[1].period`: `[PLACEHOLDER: Dates]`.

---

## 8. Section-by-Section Visual Specification

| # | Section | Id | Index | Eyebrow | Heading | Layout | Background | Interactions |
|---|---|---|---|---|---|---|---|---|
| — | Hero | `top` | "INDEX — 01" (left metadata) | "Security Engineer" | "Securing endpoints, strengthening operations, and reducing exposure across complex environments." | Asymmetric. Right-aligned text on md and up. 3 / 9 split | Radial glow, vertical rule, `min-h-[100svh]` | CTA hover, scroll cue |
| 02 | About | `about` | "02" | "About" | "Engineering controls, shaped by the SOC floor." | Sticky index, content column | Ink | Focus rule expands on hover |
| 03 | Skills | `skills` | "03" | "Technical Skills" | "Technologies and tools I use across enterprise security environments." | Sticky index, two-column rows | Ink | Items turn accent on hover |
| 04 | Experience | `experience` | "04" | "Experience" | "Where the work has taken me." | Timeline | Ink | Staggered reveal |
| 05 | Projects | `projects` | "05" | "Projects" | "Selected security engineering work." | Numbered rows | Ink | Title turns accent; tags highlight on row hover |
| 06 | Certifications | `certifications` | "06" | "Certifications" | "Credentials that back up the practice." | One column, then two-column cells | Ink; cells hover charcoal | Cell background and number accent on hover |
| 07 | Contact | `contact` | "07" | "Contact" | "Open to security engineering conversations." | Statement plus bordered link list | Ink | Row value turns accent; arrow nudges |

### Section design notes

- **Section order** matches `app/page.tsx` [C]: Hero, About, Skills, Experience, Projects, Certifications, Contact. The footer follows.
- **Relationship to the system:** Every section uses the same `Section` frame, so index numbers, eyebrows, title scale, and vertical rhythm are consistent. The index and eyebrow form a fixed left column. The title sets a large editorial anchor on the right.
- **Divider rhythm:** Skills, Projects, and Contact use `border-y` with row dividers. Experience uses a left-side timeline line. Certifications uses a 1px-gap grid inside a rounded border. Each divider style matches its content type.
- **Background:** All sections use `bg-ink` inherited from the body. There are no section-level background colors or images [C].

---

## 9. Animation & Interaction Inventory

### 9.1 Scroll reveal

- **Source:** `components/Reveal.tsx`, `app/globals.css` (`.js .reveal`, `.js .reveal.is-visible`) [C].
- **Initial state (JavaScript enabled):** `opacity: 0`, `transform: translate3d(0, 20px, 0)`.
- **Visible state:** `opacity: 1`, `transform: none`.
- **Transition:** `opacity 1s` and `transform 1s`, both `cubic-bezier(0.2, 0.7, 0.2, 1)` [C].
- **Trigger:** `IntersectionObserver`, `threshold: 0.12`, `rootMargin: "0px 0px -8% 0px"`, once per element [C].
- **Delays used:** 0, 60, 80, 100, 120, 150, 200, 300, 400, and 500 ms, applied through inline `transitionDelay` [C].
- **`will-change`:** `opacity, transform` while hidden; `auto` once visible [C].
- **No-JavaScript fallback:** The `js` class is set by an inline script in `<head>`. Without JavaScript, content stays visible [C].

### 9.2 Hero scroll cue

- **Markup:** A 2.5rem-tall, 1px-wide track (`h-10 w-px`) containing an accent bar (`h-1/2`) with `animate-[drop_2.4s_ease-in-out_infinite]` [C].
- **Keyframes (`tailwind.config.ts`):** `drop` moves from `translateY(-100%)` at 0% to `translateY(200%)` at 60% and 100% [C].
- **Behavior:** The bar enters from above the track, travels through it, and exits below before the loop restarts. The track is `overflow-hidden`, so only the portion inside the track is visible [I].

### 9.3 Navigation

- **Scroll state:** A `requestAnimationFrame`-throttled scroll listener sets `scrolled` at a 24px threshold [C].
- **Header transition:** `transition-[background-color,border-color] duration-500` [C].
- **Progress bar:** `transform: scaleX(...)` updated directly. `origin-left`. The bar has no CSS transition of its own [C].
- **Active section:** `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"` [C].
- **Mobile drawer:** Toggled by state. No open or close animation. Escape closes it. No focus trap, no focus return, no body scroll lock [C].

### 9.4 Hover interactions [C]

| Element | Properties | Duration | Easing |
|---|---|---|---|
| Primary button | `bg-accent` → `bg-white` (`transition-colors`) | 500ms | Tailwind default [F] |
| Button arrow | `translate-x-1` | 500ms | Tailwind default |
| Ghost button | Border and text color | 500ms | Tailwind default |
| Navigation link underline | `background-size` 0 → 100% | 0.6s | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| Navigation link color | slate-400 → white | 0.4s | `ease` |
| Logo dot | `translate-x-0.5` | 500ms | Tailwind default |
| Skill items | `text-accent` | 300ms | Tailwind default |
| Project title | `text-accent` | 500ms | Tailwind default |
| Project tags | Border `accent/25` | 500ms | Tailwind default |
| About focus rule | Width `w-8` → `w-16`; color | 700ms | Tailwind default |
| Certification cell | `bg-charcoal` | 500ms | Tailwind default |
| Certification number | `text-accent` | 500ms | Tailwind default |
| Contact row value | `text-accent` | 500ms | Tailwind default |
| Contact arrow | `translate-x-1` | 500ms | Tailwind default |
| Contact value underline | `.link-line` background-size | 0.6s | `cubic-bezier(0.2, 0.7, 0.2, 1)` |

**Easing note:** Classes such as `transition-colors` use Tailwind's default timing function, `cubic-bezier(0.4, 0, 0.2, 1)` [F]. This is inferred from the framework, so verify in the browser [I].

**Touch behavior:** Hover effects are not gated by `@media (hover: hover)`. On touch devices, hover states can stick after a tap [I]. Verify on a device [B].

### 9.5 Intersection Observer usage [C]

1. `Reveal.tsx`: one observer per revealed element, disconnected after first visibility.
2. `Nav.tsx`: one observer on all navigation section targets for active-link tracking, disconnected on unmount.

### 9.6 CSS keyframes [C]

- `drop` (defined in `tailwind.config.ts`).
- No other keyframes are defined in `globals.css`.

---

## 10. Asset Inventory

| Asset | Type | Status | Dimensions and format | Referenced in |
|---|---|---|---|---|
| `public/` directory | Folder | Exists, empty [C] | None | None |
| Favicon | Icon | Not present [C]. Next.js serves its default | None | None |
| Apple touch icon and app icons | Icon | Not present [C] | None | None |
| Logo | Image | Not present. The logo is text ("Asyam." with a dot) [C] | None | `Nav.tsx` |
| Hamburger icon | Inline SVG | Present [C] | 20×20, stroke 1.5, `currentColor` | `Nav.tsx` |
| Inter | Font | Loaded from Google Fonts at build time [C] | Variable, Latin subset | `layout.tsx` |
| JetBrains Mono | Font | Loaded from Google Fonts at build time [C] | Variable, Latin subset | `layout.tsx` |
| OpenGraph image | Generated | Present via `app/opengraph-image.tsx` [C] | 1200×630 PNG | Referenced automatically in metadata by Next.js [F] |
| Certificate images | Images | Not present. Folder does not exist [C] | None | Not referenced yet |
| Project images | Images | Not present [C] | None | None |
| Other media | None | None [C] | None | None |

**Notes:**

- The OpenGraph image uses `sans-serif` because Inter is not available inside `ImageResponse` in this implementation [C].
- `next/image` is not used. When certificate or project images are added, specify width and height, or use `next/image`, to avoid layout shift [I].

---

## 11. Accessibility & Technical Review

### 11.1 Semantic HTML [C]

- **Strengths:** `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<section>` elements with `aria-labelledby`, `<footer>`, `<ol>` for experience, `<dl>` in the hero, and lists for skills and projects.
- **Note:** `<Reveal as="li">` is used inside `<ul>` and `<ol>`, which is valid. The hero `<dl>` contains `<dd>` elements with `<p>` children, which is also valid.

### 11.2 Heading hierarchy [C]

- One `<h1>` (hero). Each section has an `<h2>`. Items use `<h3>`. The footer has no heading.
- About and Contact use `<p>` for their lead statements, not headings. This is acceptable.

### 11.3 ARIA and labels [C]

- Sections use `aria-labelledby` pointing to their `<h2>`.
- Navigation has `aria-label="Primary"` and `aria-current="location"` on the active link.
- Hamburger has `aria-expanded`, `aria-controls="mobile-menu"`, and an `sr-only` label that toggles between "Open menu" and "Close menu".
- Decorative elements use `aria-hidden`: arrows, rules, progress bar, dots, scroll bar, and certification numbers.
- **Contact external links:** `target="_blank"` with `rel="noopener noreferrer"`. The link text does not tell the user the link opens in a new tab. Consider adding visually hidden text [I].

### 11.4 Keyboard navigation [C]

- **Skip link:** `sr-only`, visible on focus, links to `#main`.
- **Focus rings:** Global `:focus-visible` with `ring-2 ring-accent/60 ring-offset-2 ring-offset-ink`.
- **Mobile drawer:** Escape closes it. Focus does not move into the drawer when it opens, and does not return to the trigger when it closes. Tab order inside the drawer follows the DOM, but the drawer does not trap focus.

### 11.5 Focus states [C]

- The global ring applies to buttons and links.
- Verify ring visibility on the accent-filled primary button in the browser [B].

### 11.6 Color contrast [I, approximate]

Ratios below are calculated from the hex values. Verify with a contrast checker in the browser [B].

| Pair | Approximate ratio | WCAG AA, normal text (4.5:1) |
|---|---|---|
| `text-white` on `ink` | ~19:1 | Pass |
| `text-slate-300` on `ink` | ~12:1 | Pass |
| `text-slate-400` on `ink` (body) | ~7.7:1 | Pass |
| `text-accent` on `ink` | ~11.8:1 | Pass |
| `text-slate-500` on `ink` | ~4.1:1 | **Fail** for normal text. Affects 11–12px labels, issuers, periods, contact labels, and footer |
| `text-slate-600` on `ink` | ~2.6:1 | **Fail**. Affects index numbers, hero labels, scroll cue, project numbers, and certification numbers |
| `ink` text on `accent` (primary button) | ~11.8:1 | Pass |

**Impact:** The 11px mono labels in `slate-600` are the most serious contrast issue, because they are both small and low-contrast. The `slate-500` labels also fall below AA for normal-sized text.

### 11.7 Images and alt attributes

- No images are in the project yet [C]. The certificate thumbnails from the previous update include `alt` text, but that code is not in the project.

### 11.8 Reduced-motion support [C]

- **CSS:** `@media (prefers-reduced-motion: reduce)` sets `html { scroll-behavior: auto }`, disables reveal transitions, and sets `animation-duration` and `transition-duration` to `0.01ms !important` on all elements.
- **JavaScript:** `Reveal` checks `matchMedia` and sets visible immediately.
- **Issue:** The override shortens `animation-duration` but does not change `animation-iteration-count`. The hero scroll cue uses `infinite`, so it keeps looping, very rapidly. This may cause a flicker or jitter rather than a stopped indicator [I]. Verify in the browser [B]. A standard fix is to set `animation: none` for the scroll cue under reduced motion, or set `animation-iteration-count: 1`.
- Hover transitions also collapse to 0.01ms. This is acceptable.

### 11.9 Responsive accessibility [C]

- Text is sized in rem and px. The body is 15px, the smallest body size. Many labels are 11px.
- **Touch targets:** The hamburger uses `p-2` around a 20px icon, roughly 36px total. This is below the 44px recommended size [I].
- Drawer links use `py-4`, which gives adequate target height [C].

### 11.10 Color-only meaning

- The current job and past jobs are distinguished by dot color (`accent` vs `slate-700`) and the ring. The hero says "Currently" in text, but the timeline itself does not label the current job in text [C]. Consider adding a text label.

### 11.11 SEO metadata [C]

- `metadataBase`, `title` with template, `description`, `keywords`, `authors`, `creator`, `alternates.canonical: "/"`, `openGraph` (type profile, locale en_US), `twitter` (summary_large_image), `robots` with `googleBot` directives, and `formatDetection` disabled.
- JSON-LD `Person` with `name`, `jobTitle`, `url`, `email`, `sameAs`, and `knowsAbout` [C].
- `robots.ts` and `sitemap.ts` both use `site.url` [C].
- **Issue:** `site.url` is still `https://example.com` [C]. All absolute URLs depend on this value, so replace it before launch.
- The sitemap has one URL, which is appropriate for a single-page site.

### 11.12 Performance-related implementation [C]

- **Fonts:** `next/font/google` with `display: "swap"`, self-hosted at build time. Good.
- **Scroll handling:** `requestAnimationFrame` throttle plus direct DOM style updates for the progress bar. Good.
- **`will-change`:** Applied only during reveal transitions. Good.
- **Backdrop blur:** `backdrop-blur-xl` on the sticky navigation can add GPU cost on lower-end devices [I].
- **Hero glow:** Implemented as a radial gradient, which is cheaper than a blurred element [C].
- **Hero:** `min-h-[100svh]` with `overflow-hidden`. Good.
- **Images:** None yet, so no image optimization applies.

### 11.13 Next.js best practices [C]

**In place:**

- Server Components by default. Client components are limited to `Nav` and `Reveal`.
- `metadataBase` set. Metadata API used.
- `opengraph-image.tsx` uses `next/og`.
- `reactStrictMode: true`.
- `poweredByHeader: false`.
- `lang="en"` set on `<html>`.

**Missing:**

- No ESLint configuration, so `npm run lint` will prompt for setup or fail [C].
- No `app/not-found.tsx` or `app/error.tsx` [C].
- No favicon or app icon [C].
- No `next/image` (not needed yet).

### 11.14 Other observations

- `Certifications.tsx` is a server component. The thumbnail dialog from the previous update would need to be a client component.
- Placeholder values render in the UI. Verify each before launch [C].

---

## 12. Consolidated Design System Reference

### 12.1 Typography

- **Families:** Inter (sans, `--font-sans`) and JetBrains Mono (mono, `--font-mono`). Both loaded via `next/font/google`, both variable.
- **Weights in use:** 400 (default) and 500 (`font-medium`) [C].
- **Heading scale:**
  - Hero h1: 44 / 60 / 88px, responsive.
  - Section h2: 30 / 36 / 52px.
  - Card h3: 24px.
  - Subheading: 18px (`text-lg`).
- **Body scale:** 15px base; 14px (`text-sm`); 16px (`text-base`); 18px (`text-lg`); 20px (`text-xl`); 24px (`text-2xl` for card headings; `md:text-2xl` for the contact statement).
- **Mono scale:** 11px (labels, eyebrows, tags); 12px (index numbers, periods, footer). Letter-spacing 0.18em to 0.22em for labels.
- **Tracking:** Display headings `-0.04em`. Labels `+0.18em` to `+0.22em`. Logo `-0.025em` (framework default).
- **Leading:** Body `leading-relaxed` (1.625). Display headings 1.02 to 1.08, or 1 at some breakpoints.

### 12.2 Colors

- **Primary background:** `ink` `#0a0b0e`.
- **Secondary background:** `charcoal` `#111318` (hover states only).
- **Navy:** `#0b1424`. Defined but not used in the current layout.
- **Accent:** `accent` `#7dd3fc`. Secondary accent `accentDeep` `#38bdf8` (glow only).
- **Text palette:**
  - Primary: white `#ffffff`.
  - Strong secondary: slate-300 `#cbd5e1`.
  - Body: slate-400 `#94a3b8`.
  - Labels: slate-500 `#64748b`.
  - Decorative and muted: slate-600 `#475569`.
- **Borders and surfaces:**
  - Hairlines: white at 8% (`white/[0.08]`).
  - Subtle borders: white at 6% (navigation and footer).
  - Button and tag borders: white at 10%.
- **Overlays:** `ink/80` (navigation when scrolled), `ink/95` (drawer).
- **Gradients:** Hero glow (`accentDeep` at 12%); progress bar (accent).

### 12.3 Spacing

- **Container:** `max-w-6xl` = 1152px, centered.
- **Horizontal padding:** 24px mobile; 48px at md and up.
- **Section padding:** 112px mobile; 160px at md and up.
- **Section gaps:** 40px mobile; 48px horizontal at md and up.
- **Content top margin:** 56px mobile; 64px at md and up.
- **Hero:** 128px top, 48px bottom, 64px grid gap.
- **Component gaps:** 4px to 32px range, with 64px for the hero grid and 80px above the contact links (`mt-20`).

### 12.4 Components

- **Buttons:** Primary (`btn-primary`) and ghost (`btn-ghost`). Both `rounded-full`, `px-6 py-3`, `text-sm font-medium`, with arrow nudge on hover.
- **Navigation:** Fixed header, progress line, underline-animated links, mobile drawer.
- **Cards:** None in the traditional sense. Certifications uses a bordered grid of cells. Projects and Experience use rows and timeline items.
- **Section headers:** Shared `Section` frame with index, rule, eyebrow, and h2.
- **Dividers:** `.hairline`, `divide-y`, `border-y`, and grid `gap-px`. All at 8% white.
- **Tags:** Mono, 11px, `rounded-full`, 10% white border.
- **Interactive elements:** Color shifts, underline animations, arrow nudges, focus ring.

### 12.5 Responsive

- **Breakpoints in use:** `sm` (640px), `md` (768px), `lg` (1024px).
- **Mobile:** Single column, drawer navigation, left-aligned hero, stacked content.
- **Tablet:** Two-column certifications, three-column About focus at sm and up, drawer navigation still active.
- **Desktop (md):** 12-column editorial layout, sticky section indices, right-aligned hero, two-column skills and projects.
- **Large (lg):** Full desktop navigation, largest hero headline.

### 12.6 Motion

- **Reveal:** Opacity and translate, 1s, `cubic-bezier(0.2, 0.7, 0.2, 1)`, staggered through delay.
- **Hover:** Color transitions at 300 to 500ms. Accent underline at 0.6s. Rule expansion at 700ms.
- **Navigation:** Header background at 500ms. Link underline at 0.6s.
- **Scroll cue:** `drop` keyframe, 2.4s, `ease-in-out`, infinite.
- **Reduced motion:** Disables reveal and collapses durations to 0.01ms. The scroll cue keyframe still loops (see [§11.8](#118-reduced-motion-support-c)).
- **Conventions:** Long durations (500ms and up) for color and layout changes; short (300ms) for small text color. Custom cubic-bezier only for reveal and underline.

---

## 13. Issues Requiring Attention

| Priority | Issue | Location | Status |
|---|---|---|---|
| High | Certificate update from the previous step is not in the project | `components/Certifications.tsx`, `lib/content.ts`, `components/CertificateThumbnail.tsx`, `public/certificates/` | Not applied [C] |
| High | Low-contrast 11px `slate-600` labels (~2.6:1) | Hero, section indices, Projects, Certifications, Contact, scroll cue | Estimated from hex values [I] |
| High | Placeholder text rendered in the UI | `lib/content.ts` (experience, site) | Present [C] |
| Medium | Reduced motion does not stop the infinite scroll-cue keyframe | `app/globals.css`, `components/Hero.tsx` | Likely [I]; verify [B] |
| Medium | `npm run lint` has no ESLint configuration | `package.json` | Confirmed [C] |
| Medium | Mobile drawer has no focus management or scroll lock | `components/Nav.tsx` | Confirmed [C] |
| Medium | `slate-500` labels slightly below AA for normal text (~4.1:1) | Multiple | Estimated [I] |
| Low | Hover effects apply on touch devices | All hover classes | [I] |
| Low | Hamburger tap target about 36px | `components/Nav.tsx` | [I] |
| Low | Current job indicated only by dot color | `components/Experience.tsx` | Confirmed [C] |
| Low | OpenGraph image does not use Inter | `app/opengraph-image.tsx` | Confirmed [C] |
| Low | `site.url` is a placeholder, affecting canonical URL and sitemap | `lib/content.ts` | Confirmed [C] |
| Low | No favicon or app icon | `public/` | Confirmed [C] |
| Low | No `not-found` or `error` route | `app/` | Confirmed [C] |

### Values requiring browser inspection [B]

- Computed `line-height` at each breakpoint for the hero headline.
- Rendered `transition-timing-function` for Tailwind's default transitions.
- Rendered contrast of all muted text.
- Touch target sizes.
- Sticky index behavior alongside the fixed header.
- Reduced-motion behavior of the scroll cue.
- Hover behavior on touch devices.
