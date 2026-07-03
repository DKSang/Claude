Create a Next.js 16 (App Router, React 19, TypeScript strict) + Tailwind CSS v4 + shadcn/ui learning platform called "Data Engineering Lifecycle". The page has 3 route types: Landing page (/), Learn index (/learn redirect), and Module reader (/learn/[moduleId]). Use lucide-react for icons. The design is warm, editorial, and clean — modeled pixel-for-pixel on claude.com's computed styles. Light theme only, warm cream background, Anthropic Serif for headings, Anthropic Sans for body.

FONTS

Load three local fonts via next/font/local in layout.tsx (weights: 300 800, normal + italic):

Anthropic Sans (src: public/fonts/AnthropicSans-Roman-Web.woff2 + Italic) -- global default body font, UI labels, nav links
Anthropic Serif (src: public/fonts/AnthropicSerif-Roman-Web.woff2 + Italic) -- all headings (h1–h6), lifecycle diagram labels
Anthropic Mono (src: public/fonts/AnthropicMono-Roman-Web.woff2 + Italic) -- code blocks, inline code

Each font gets a CSS variable via next/font: --font-anthropic-sans, --font-anthropic-serif, --font-anthropic-mono. In globals.css @theme inline, link them:

--font-sans: var(--font-anthropic-sans), "Anthropic Sans", Arial, sans-serif;
--font-serif: var(--font-anthropic-serif), "Anthropic Serif", Georgia, serif;
--font-mono: var(--font-anthropic-mono), "Anthropic Mono", ui-monospace, monospace;

In @layer base, set body to font-family: var(--font-sans), font-size: 20px, line-height: 32px. Set h1–h6 to font-family: var(--font-serif), font-weight: 500.

COLOR SYSTEM

Background: #faf9f5 (var(--bg-primary)) globally, warm cream
Card background: #ffffff (var(--card))
Sidebar background: #f5f4ed (var(--bg-secondary))
Tertiary background: #f0eee6 (var(--bg-tertiary)) — code blocks, table headers, hover states
Primary text: #141413 (var(--fg-primary)) — headings, bold text
Secondary text: #30302e (var(--fg-secondary)) — body paragraphs, table cells
Tertiary text: #5e5d59 (var(--fg-tertiary)) — subtitles, captions, breadcrumbs, footer
Accent (clay): #d97757 (var(--text-accent)) — links, focus ring, blockquote border, module number labels, inline code
Accent interactive: #c96442 (var(--color-clay-interactive)) — hover states
Border tertiary: #e8e6dc (var(--border-tertiary)) — card borders, table borders, dividers
Border secondary: #d1cfc5 (var(--border-secondary)) — lifecycle diagram arrows, hover borders
Blockquote background: rgba(235, 201, 183, 0.12) — peach tint at 12% opacity
Active lifecycle node: background rgba(217,119,87,0.08), border var(--text-accent)
Selection: background rgba(217,119,87,0.5), color var(--fg-primary)

Brand status colors (for future phases): cactus #bcd1ca, mineral #629987, sky #6a9bcc, fig #c46686, error #b53333

CUSTOM CSS UTILITIES (globals.css)

Typography scale classes — plain CSS classes (NOT @layer utilities, which doesn't work in Tailwind v4). Each sets font-size to a CSS variable:

.text-display-1 { font-size: var(--text-display-1); }  — 42px→72px fluid
.text-display-2 { font-size: var(--text-display-2); }  — 36px→64px fluid (landing H1)
.text-h1 { font-size: var(--text-h1); }  — 34px→52px fluid (module H1, section H2 on landing)
.text-h2 { font-size: var(--text-h2); }  — 30px→44px fluid (content H2 from markdown ##)
.text-h3 { font-size: var(--text-h3); }  — 28px→36px fluid (content H3 from markdown ###)
.text-h4 { font-size: var(--text-h4); }  — 23px→32px fluid (content H4 from markdown ####)
.text-body-1 { font-size: var(--text-body-1); }  — 19px→20px fluid (body text)
.text-body-2 { font-size: var(--text-body-2); }  — 17px (blockquote text)
.text-body-3 { font-size: var(--text-body-3); }  — 15px (table cells, sidebar section links, footer, breadcrumb)
.text-caption { font-size: var(--text-caption); }  — 12px
.text-micro { font-size: var(--text-micro); }  — 10px (code language label)

All fluid clamp values use valid CSS: clamp(min, calc(base + Nvw), max). Invalid patterns like calc(rem + (number * length) / length) silently break — always use the base+Nvw form.

Card hover: a.block:hover { border-color: var(--border-secondary) !important; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }

Container: .container-anthropic { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-margin); }

FLUID CSS VARIABLES (all in :root, all use valid clamp(base+Nvw) syntax)

Typography: --text-display-1: clamp(2.625rem, calc(2.0893rem + 2.6786vw), 4.5rem); --text-display-2: clamp(2.25rem, calc(1.75rem + 2.5vw), 4rem); --text-h1: clamp(2.125rem, calc(1.8036rem + 1.6071vw), 3.25rem); --text-h2: clamp(1.875rem, calc(1.625rem + 1.25vw), 2.75rem); --text-h3: clamp(1.75rem, calc(1.6071rem + 0.7143vw), 2.25rem); --text-h4: clamp(1.4375rem, calc(1.2768rem + 0.8036vw), 2rem); --text-h5: clamp(1.25rem, calc(1.1607rem + 0.4464vw), 1.5625rem); --text-body-1: clamp(1.1875rem, calc(1.1696rem + 0.0893vw), 1.25rem); --text-body-large-1: clamp(1.375rem, calc(1.3393rem + 0.1786vw), 1.5rem)

Spacing: --space-1: 1rem; --space-1-5: 1.5rem; --space-2: clamp(1.75rem, calc(1.6786rem + 0.3571vw), 2rem); --space-3: clamp(2.5rem, calc(2.3571rem + 0.7143vw), 3rem); --space-4: clamp(3.25rem, calc(3.0357rem + 1.0714vw), 4rem); --space-5: clamp(4rem, calc(3.7143rem + 1.4286vw), 5rem); --section-space-main: clamp(6rem, calc(5.4286rem + 2.8571vw), 8rem)

Radius: --radius-large: 1rem; --radius-small: 0.5rem; --radius-x-small: 0.25rem

Container: --container-max: 90rem (1440px); --container-margin: clamp(2rem, calc(1.4286rem + 2.8571vw), 4rem)

Easing: --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1)

SECTION 1: LANDING PAGE (/)

Fixed header at top (LearnHeader component), height 84px, background var(--bg-primary), border-bottom 0.8px solid var(--border-tertiary). Padding 24px 32px. Left: "Data Engineering" link — font-family var(--font-sans), 20px, weight 400, color var(--fg-primary). Right: "Trang chủ" and "GitHub" links — 17px, var(--font-sans), color var(--fg-secondary). Mobile: hamburger button (lucide Menu, 22px, md:hidden) dispatches CustomEvent "toggle-sidebar".

Hero section: max-width 90rem, padding 12.5rem (200px) top, container-margin sides, 6rem bottom. Left-aligned content in a div max-width 42rem (672px).

H1 "Data Engineering Lifecycle": class text-display-2 (64px at desktop), font-family var(--font-serif), font-weight 500, line-height 1.1, color var(--fg-primary), margin-bottom 2.5rem (40px).

Subtitle paragraph: 20px, line-height 32px, font-family var(--font-sans), color var(--fg-tertiary) (#5e5d59), max-width 34rem (544px), margin 0. Text: "Học lý thuyết Data Engineering qua 5 giai đoạn vòng đời — từ nguồn dữ liệu đến phục vụ phân tích."

LifecycleDiagram below hero, margin-top var(--space-4).

Module grid section: max-width 90rem, padding 0 sides, var(--section-space-main) bottom. H2 "Khóa học": class text-h1 (52px), weight 500, line-height 1.2, color var(--fg-primary), margin-bottom var(--space-3). Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap var(--space-1) (16px).

ModuleCard (8 cards): Link, background var(--card), border 1px solid var(--border-tertiary), border-radius var(--radius-large) (16px), padding var(--space-1-5) (24px). Module number label: 15px, var(--font-sans), color var(--text-accent), weight 400, margin-bottom var(--space-0-5). H3 title: 19px, line-height 1.2, var(--font-serif), weight 500, color var(--fg-primary), margin 0 0 var(--space-0-75) 0. Summary: 17px, line-height 1.6, var(--font-sans), color var(--fg-tertiary), -webkit-line-clamp 3. Hover: border-color → var(--border-secondary), box-shadow 0 2px 12px rgba(0,0,0,0.04).

Footer: background var(--bg-primary), border-top 1px solid var(--border-tertiary), padding var(--space-2) sides. Two spans: 15px, var(--font-sans), color var(--fg-tertiary). Left: "Data Engineering Lifecycle — Học lý thuyết DE". Right: "Built with Next.js 16 + Anthropic Design System".

SECTION 2: MODULE READER (/learn/[moduleId])

Layout: LearnHeader (84px fixed) + flex row (padding-top 84px) with LearnSidebar (left) + main content (right) + Footer.

LearnSidebar ("use client"): width 280px, sticky top 84px, height calc(100vh - 84px), overflow-y auto, background var(--bg-secondary), border-right 1px solid var(--border-tertiary). Hidden on mobile (hidden md:block), toggled via CustomEvent listener.

Two-level structure:
- Module group headers (0–5): button, 15px, var(--font-sans), uppercase, letter-spacing 0.5px, color var(--fg-tertiary), padding 8px 16px. ChevronDown icon rotates -90deg when collapsed. aria-expanded set.
- Module entries: Link, 17px, var(--font-sans), padding 8px 16px 8px 24px. Active: color var(--fg-primary), weight 500, background var(--bg-tertiary), border-left 3px solid var(--text-accent). Inactive: color var(--fg-secondary), weight 400, border-left 3px solid transparent. aria-current="page" on active.
- Section links (under active module only): <a>, 15px, var(--font-sans), padding 6px 16px 6px 36px, color var(--fg-tertiary). Active section (IntersectionObserver scroll-spy, rootMargin -100px): color var(--text-accent), weight 500.

Main content (LearnContent, server component): max-width 720px, centered mx-auto. Padding-top var(--space-2-5), padding-bottom var(--space-5).

Breadcrumb: "Module N · Title", 15px, var(--font-sans), color var(--fg-tertiary), margin-bottom var(--space-1).

H1 (module title): class text-h1 (52px), var(--font-serif), weight 500, line-height 1.2, color var(--fg-primary), margin-bottom var(--space-0-5).

Subtitle: 20px, line-height 32px, var(--font-sans), color var(--fg-tertiary), margin 0 0 var(--space-3) 0.

LifecycleDiagram with activeModuleId prop, margin-bottom var(--space-4).

CONTENT BLOCK COMPONENTS (rendered from curriculum.json)

Each section renders blocks via BlockRenderer (switch on block.type). All blocks use var(--font-sans) for body and var(--font-serif) for headings.

HeadingBlock (## → h2, ### → h3, #### → h4):
- H2: class text-h2 (44px), border-bottom 1px solid var(--border-tertiary), padding-bottom 0.5rem, margin-top var(--space-4), margin-bottom var(--space-1-5), scroll-margin-top 100px, color var(--fg-primary), weight 500 (from base layer)
- H3: class text-h3 (36px), margin-top var(--space-3), margin-bottom var(--space-1), scroll-margin-top 100px
- H4: class text-h4 (32px), margin-top var(--space-2-5), margin-bottom var(--space-0-75), scroll-margin-top 100px
- Empty id: omit id attribute entirely

ParagraphBlock:
- <p>, var(--font-sans), font-size var(--text-body-1) (20px), line-height 32px, color var(--fg-secondary), margin-bottom var(--space-1)
- Empty spans array: return null
- Inline spans: bold (weight 600, color var(--fg-primary)), italic (<em>), inline code (var(--font-mono), 0.875em, background var(--bg-tertiary), padding 2px 6px, border-radius var(--radius-x-small), color var(--text-accent)), link (color var(--text-accent), underline; URL sanitized via /^(https?:|\/|#|mailto:)/ regex; external links get target="_blank" rel="noopener noreferrer")

TableBlock:
- Wrapper: overflow-x-auto, border-radius var(--radius-small), border 1px solid var(--border-tertiary)
- Empty headers: return null
- Header row: background var(--bg-tertiary), padding 10px 14px, font-size var(--text-body-3) (15px), weight 600, color var(--fg-primary), white-space nowrap, border-bottom 1px solid var(--border-tertiary)
- Body cells: padding 10px 14px, font-size var(--text-body-3) (15px), color var(--fg-secondary), border-top 1px solid var(--border-tertiary) (except first row)
- Jagged rows: map over headers, use row[j] ?? "" to pad missing cells

CodeBlock:
- Empty/whitespace code: return null
- Background var(--bg-tertiary), border 1px solid var(--border-tertiary), border-radius var(--radius-small), padding var(--space-1) (16px), overflow-x-auto
- <pre> white-space pre, <code> var(--font-mono), font-size var(--text-body-3) (15px), line-height 24px, color var(--fg-secondary)
- Language label (if not "text"): position absolute, top 8px right 12px, font-size var(--text-micro) (10px), color var(--fg-tertiary), uppercase, letter-spacing 0.5px
- No syntax highlighting (Phase A)

BlockquoteBlock:
- Empty spans: return null
- Background rgba(235,201,183,0.12), border-left 3px solid var(--text-accent), border-top-right-radius var(--radius-small), border-bottom-right-radius var(--radius-small), padding var(--space-1) var(--space-1) var(--space-1) var(--space-1-5), margin var(--space-1-5) 0
- Icon: lucide Lightbulb (variant "tip") or Info (variant "note"), 16px, color var(--text-accent), flex-shrink 0, margin-top 4px
- Text: var(--font-sans), font-size var(--text-body-2) (17px), line-height 28px, color var(--fg-secondary)

ListBlock:
- Empty items: return null
- <ul> or <ol>, var(--font-sans), font-size var(--text-body-1) (20px), line-height 32px, color var(--fg-secondary), padding-left var(--space-1-5) (24px)
- list-style: disc (ul) or decimal (ol)
- Item spacing: marginTop 4px for i > 0
- Inline spans: same as ParagraphBlock

Prev/Next navigation (bottom of content): flex justify-between, margin-top var(--space-5), padding-top var(--space-3), border-top 1px solid var(--border-tertiary). Links: 17px, var(--font-sans), color var(--fg-secondary), weight 400. ArrowLeft/ArrowRight icons 16px. First module: only "next". Last module: only "prev".

LIFECYCLE DIAGRAM (shared component)

5 stages in a linear flow: Sinh dữ liệu (Generation) → Lưu trữ (Storage) → Nạp dữ liệu (Ingestion) → Biến đổi (Transformation) → Phục vụ (Serving).

Each node: pill shape, background var(--card) (or rgba(217,119,87,0.08) if active), border 1px solid var(--border-tertiary) (or var(--text-accent) if active), border-radius var(--radius-large), padding 12px 20px, text-align center, min-width 120px.

Node label (Vietnamese): var(--font-serif), 17px, weight 500, color var(--fg-primary).
Node sublabel (English): 13px, var(--font-sans), color var(--fg-tertiary), margin-top 2px.

Arrows: SVG, stroke var(--border-secondary), strokeWidth 1.5. Horizontal on desktop (md:flex-row), vertical on mobile (flex-col). Arrowhead via SVG path.

DATA FLOW

Markdown files in ../Fundemental-Data-Eng/docs/module-XX-*.md → scripts/convert-docs.mjs (build-time, runs via prebuild npm script) → src/data/curriculum.json (Curriculum type: modules[] → sections[] → blocks[]). Server components import JSON directly. No runtime markdown parsing. Re-run `node scripts/convert-docs.mjs` or `npm run convert-docs` to update content.

JSON structure: { modules: [{ id, number, title, subtitle, summary, sourceFile, sections: [{ id, number, title, blocks: [Block] }] }] }
Block types: heading (level 2|3|4, text, id), paragraph (spans: InlineSpan[]), table (headers, rows), code (language, code), blockquote (variant tip|note, spans), list (ordered, items: InlineSpan[][])
InlineSpan types: text, bold, italic, code, link (text + href)

RESPONSIVE BREAKPOINTS

Tailwind v4 defaults (mobile-first):
- <768px (mobile): sidebar hidden (drawer toggle via hamburger), content full-width, module grid 1 col, lifecycle diagram vertical
- ≥768px (md): sidebar visible, module grid 2 cols, lifecycle diagram horizontal
- ≥1024px (lg): module grid 3 cols
- ≥1440px: container max 90rem centered

All fluid typography/spacing uses clamp(base+Nvw) — scales smoothly between 320px and 1440px viewport. No media-query font-size jumps.

ACCESSIBILITY

- Headings: weight 500 globally (base layer), serif font family
- Sidebar: aria-expanded on group toggle buttons, aria-current="page" on active module link
- Header: hamburger has aria-label="Toggle navigation"
- Links: external links get rel="noopener noreferrer", target="_blank"
- URL sanitization: link hrefs filtered via /^(https?:|\/|#|mailto:)/ — javascript: and data: URIs blocked
- Scroll offset: scroll-margin-top 100px on all headings/sections (accounts for 84px fixed header)
- Tables: no caption (Phase A limitation)

TECH STACK

Next.js 16 (App Router, React 19, TypeScript strict) — params is Promise, must await in dynamic pages. generateStaticParams pre-renders all module routes.
Tailwind CSS v4.2 — @theme inline for font/color tokens, plain CSS classes for typography utilities (NOT @layer utilities or @utility — both broken in v4 for this use case)
shadcn/ui (Radix primitives, cn() utility from @/lib/utils)
lucide-react (icons: ArrowLeft, ArrowRight, ChevronDown, Lightbulb, Info, Menu)
next/font/local (Anthropic Sans, Serif, Mono — woff2, weights 300-800, normal+italic)
Node.js ESM script for markdown→JSON conversion (no external deps, built-in fs/path)

CRITICAL GOTCHAS

1. Tailwind v4 @layer utilities does NOT generate CSS. Use plain .class {} declarations instead.
2. CSS clamp() with calc(rem + (number * length) / length) is INVALID — length/length produces unitless, + rem is type-mismatched. Always use calc(baseRem + Nvw) form.
3. next/font generates CSS variables like --font-anthropic-sans: "anthropicSans", NOT "Anthropic Sans". The @theme inline must reference var(--font-anthropic-sans) first, then fallback to the named font.
4. Next.js 16 params prop is a Promise — must `const { moduleId } = await params` in page components.
5. No hardcoded colors/fonts/spacing — always use var(--xxx) tokens.
6. No comments in code unless explicitly requested.
7. Vietnamese UI text — all labels, navigation, breadcrumbs in Vietnamese.
