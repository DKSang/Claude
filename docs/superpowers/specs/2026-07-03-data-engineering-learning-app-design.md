# Data Engineering Learning App — Design Spec (Phase A)

> Web app học lý thuyết Data Engineering, xây trên codebase Next.js 16 + shadcn/ui + Tailwind v4 hiện có (Anthropic design system). Phase A: Content + Reading UI.

---

## 1. Tổng quan

### 1.1 Mục tiêu

Biến 8 file markdown lý thuyết Data Engineering (tiếng Việt, ~2.640 dòng) từ repo `Fundemental-Data-Eng/docs` thành web app học trực quan, sinh động, dễ hiểu và nhớ lâu hơn. Nội dung xoay quanh **Data Engineering Lifecycle**: Generation → Storage → Ingestion → Transformation → Serving, với ví dụ xuyên suốt "Climate & Smart Agriculture Việt Nam".

### 1.2 Phạm vi (Phase A — Content + Reading UI)

Phase này chỉ làm:
- Convert markdown → JSON structured
- Render bài học với UI đẹp, bám sát design system hiện tại
- Layout sidebar + content (option A)
- Navigation theo module/section
- Lifecycle diagram tĩnh (SVG, không tương tác)

**Không bao gồm trong phase này:** AI features (Socratic checkpoint, Feynman grading, reverse mode), interactive diagrams (click node → panel), DuckDB WASM playground, knowledge graph tracking. Các tính năng đó thuộc các phase sau, mỗi phase có spec riêng.

### 1.3 Đối tượng người dùng

Một người (chính là tác giả) tự học Data Engineering. Giao diện tiếng Việt. Sử dụng trên desktop chủ yếu, nhưng cần responsive cho mobile.

### 1.4 Nguồn nội dung

8 file markdown trong `C:\Users\dksan\Code\Fundemental-Data-Eng\docs\`:

| File | Module | Dòng |
|---|---|---|
| `module-00-introduction.md` | 0 — Nhập môn | 293 |
| `module-00-source-systems.md` | 0 — Source Systems | 166 |
| `module-00-storage-systems.md` | 0 — Storage Systems | 436 |
| `module-01-ingestion.md` | 1 — Ingestion | 579 |
| `module-02-modeling.md` | 2 — Modeling & Transformation | 647 |
| `module-03-orchestration.md` | 3 — Orchestration | 475 |
| `module-04-streaming.md` | 4 — Streaming | 274 |
| `module-05-enterprise.md` | 5 — Enterprise | 268 |

*(File sách gốc `Fundamentals of Data Engineering (Reis, JoeHousley, Matt) (Z-Library) (1).md` 4588 dòng — KHÔNG convert, chỉ dùng 8 file module.)*

Nội dung phong phú: bảng so sánh, code blocks (text/sql), blockquote tips, analogies (vd "rửa bát nhà hàng" cho batch vs stream), markers 🆕 cho phần bổ sung, ví dụ xuyên suốt "Climate & Smart Agriculture Việt Nam".

> **Lưu ý cấu trúc module:** 8 file đại diện cho 6 module khái niệm (0–5), trong đó Module 0 có 3 file con (introduction, source-systems, storage-systems). Trong JSON, mỗi file là 1 entry riêng (8 module entries total). Trang chủ hiển thị 8 thẻ. Sidebar nhóm theo số module (Module 0: 3 items, Module 1–5: mỗi cái 1 item).

---

## 2. Design System hiện có (bám sát 100%)

Codebase đã có sẵn một design system hoàn chỉnh lấy từ Anthropic. Toàn bộ app mới **phải dùng đúng các token này**, không thêm màu/font/spacing mới.

### 2.1 Fonts

| Font | Biến CSS | Vai trò | File |
|---|---|---|---|
| Anthropic Sans | `--font-sans` / `--font-anthropic-sans` | Body text, UI labels, buttons | `public/fonts/AnthropicSans-Roman-Web.woff2` + Italic |
| Anthropic Serif | `--font-serif` / `--font-anthropic-serif` | Headings (h1–h6) | `public/fonts/AnthropicSerif-Roman-Web.woff2` + Italic |
| Anthropic Mono | `--font-mono` / `--font-anthropic-mono` | Code blocks, inline code | `public/fonts/AnthropicMono-Roman-Web.woff2` + Italic |

Fonts load qua `next/font/local` trong `layout.tsx`. **Không thay đổi cách load.** Headings mặc định dùng serif (đã set trong `@layer base`: `h1–h6 { font-family: var(--font-serif) }`).

### 2.2 Color Palette (Light theme — `:root`)

| Token | Giá trị | Vai trò |
|---|---|---|
| `--background` / `--bg-primary` | `#faf9f5` | Nền chính (warm cream) |
| `--foreground` / `--fg-primary` | `#141413` | Text chính (near-black) |
| `--bg-secondary` | `#f5f4ed` | Nền sidebar, card nhẹ |
| `--bg-tertiary` | `#f0eee6` | Nền hover, muted |
| `--fg-secondary` | `#30302e` | Text phụ |
| `--fg-tertiary` | `#5e5d59` | Text tertiary (tips, captions) |
| `--border-tertiary` | `#e8e6dc` | Border nhẹ (header, divider) |
| `--border-secondary` | `#d1cfc5` | Border vừa |
| `--border-primary` | `#b0aea5` | Border đậm |
| `--text-accent` / `--ring` | `#d97757` | Accent clay (link hover, focus ring) |
| `--selection-bg` | `rgba(217,119,87,0.5)` | Text selection |

**Brand colors (extension tokens):**

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-clay` | `#d97757` | Accent chính |
| `--color-clay-interactive` | `#c96442` | Hover/active accent |
| `--color-cactus` | `#bcd1ca` | Success / "hoàn thành" |
| `--color-mineral` | `#629987` | Success text |
| `--color-peach` | `#ebc9b7` | Highlight nhẹ |
| `--color-sky` | `#6a9bcc` | Info / "đang học" |
| `--color-fig` | `#c46686` | Warning / "cần ôn" |
| `--color-error` | `#b53333` | Error |

> **Quy tắc:** Không thêm màu hex mới. Nếu cần trạng thái mới, dùng brand colors có sẵn: `--color-cactus`/`--color-mineral` cho success, `--color-sky` cho in-progress, `--color-fig` cho warning.

### 2.3 Typography Scale (fluid clamp)

Tất cả kích thước text dùng CSS variable có sẵn, không hardcode `font-size`:

| Token | Min → Max | Dùng cho |
|---|---|---|
| `--text-display-1` | 42px → 72px | Hero title (trang chủ) |
| `--text-h1` | 34px → 52px | Module title |
| `--text-h2` | 30px → 44px | Section heading (## trong markdown) |
| `--text-h3` | 28px → 36px | Subsection heading (###) |
| `--text-h4` | 23px → 32px | Sub-subsection (####) |
| `--text-body-large-1` | 22px → 24px | Lead paragraph |
| `--text-body-1` | 19px → 20px | Body text (mặc định, 20px/32px line-height) |
| `--text-body-2` | 17px | Compact body |
| `--text-body-3` | 15px | UI labels, nav items |
| `--text-caption` | 12px | Caption, metadata |
| `--text-micro` | 10px | Micro labels |

Body mặc định: `font-size: 20px; line-height: 32px` (set trong `@layer base`).

### 2.4 Spacing Scale

| Token | Giá trị |
|---|---|
| `--space-0-25` | 4px |
| `--space-0-5` | 8px |
| `--space-0-75` | 12px |
| `--space-1` | 16px |
| `--space-1-5` | 24px |
| `--space-2` | 28px → 32px (fluid) |
| `--space-2-5` | 32px → 40px (fluid) |
| `--space-3` | 40px → 48px (fluid) |
| `--space-4` | 52px → 64px (fluid) |
| `--space-5` | 64px → 80px (fluid) |
| `--space-6` | 72px → 96px (fluid) |

### 2.5 Radius Scale

| Token | Giá trị |
|---|---|
| `--radius-x-small` | 4px |
| `--radius-small` | 8px |
| `--radius-main` | 12px (mặc định `--radius`) |
| `--radius-large` | 16px |
| `--radius-x-large` | 16px → 24px (fluid) |
| `--radius-xx-large` | 16px → 32px (fluid) |

### 2.6 Container & Layout

| Token | Giá trị |
|---|---|
| `--container-max` | 90rem (1440px) |
| `--container-margin` | 32px → 64px (fluid) |

### 2.7 Easing

| Token | Giá trị |
|---|---|
| `--ease-expo-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

### 2.8 Component Patterns (từ code hiện có)

- **"use client"** ở đầu file cho component có state/interaction
- **`cn()`** từ `@/lib/utils` để merge Tailwind classes
- **Inline styles** với CSS variables cho giá trị từ design tokens (pattern: `style={{ color: "var(--fg-primary)" }}`)
- **Tailwind utilities** cho layout (flex, grid, gap, responsive)
- **Icons** từ `@/components/icons` (SVG components) hoặc `lucide-react`
- **`Link`** từ `next/link` cho navigation

---

## 3. Kiến trúc ứng dụng

### 3.1 Route Structure (Next.js App Router)

```
src/app/
  layout.tsx          # Root layout (giữ nguyên fonts + globals.css, đổi metadata)
  page.tsx            # Trang chủ: hero + lifecycle diagram + module grid
  learn/
    layout.tsx        # Layout cho trang học: sidebar + content area
    page.tsx          # Redirect → module đầu tiên (module-00-introduction)
    [moduleId]/
      page.tsx        # Trang đọc module: sidebar sections + content
```

### 3.2 Data Flow

```
Fundemental-Data-Eng/docs/*.md
  ↓ (build-time script: scripts/convert-docs.mjs)
src/data/curriculum.json    # Structured JSON: modules → sections → blocks
  ↓ (import trong server components)
[moduleId]/page.tsx         # Render sidebar + content từ JSON
```

**Convert script** (`scripts/convert-docs.mjs`) chạy tại build time qua `prebuild` npm script. Đọc markdown từ `../Fundemental-Data-Eng/docs/`, parse thành JSON, ghi ra `src/data/curriculum.json`. Markdown gốc vẫn là single source of truth — chạy lại script để cập nhật nội dung.

Script dùng Node.js built-in (không thêm dependency). Parse markdown thủ công: tách theo heading level, nhận diện block types (paragraph, table, code block, blockquote, list). Không dùng thư viện markdown parser bên ngoài trong phase A để giữ đơn giản và kiểm soát output JSON.

### 3.3 Component Structure

```
src/components/
  learn/
    LearnSidebar.tsx        # Sidebar điều hướng module/section (client)
    LearnContent.tsx        # Render nội dung bài học từ JSON blocks (server)
    LearnHeader.tsx         # Top bar compact (client — mobile drawer toggle)
    blocks/                 # Render cho từng loại content block
      HeadingBlock.tsx      # h2, h3, h4
      ParagraphBlock.tsx    # Text thường, có bold/italic/inline-code
      TableBlock.tsx        # Markdown table
      CodeBlock.tsx         # Code block (```text, ```sql)
      ListBlock.tsx         # ul/ol
      BlockquoteBlock.tsx   # Tip/note (blockquote)
      BlockRenderer.tsx     # Switch trên block.type → render đúng component
  LifecycleDiagram.tsx     # SVG tĩnh: 5 giai đoạn lifecycle
  ModuleCard.tsx           # Thẻ module cho trang chủ
  LearnHeader.tsx          # Header mới cho learning app (compact)
  Footer.tsx               # Footer đơn giản (thay thế)
  ui/                      # shadcn/ui primitives (giữ nguyên)
  icons.tsx                # SVG icons (giữ nguyên + thêm mới khi cần)
```

### 3.4 Types

```typescript
// src/types/curriculum.ts

export type InlineSpan =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "italic"; text: string }
  | { type: "code"; text: string }
  | { type: "link"; text: string; href: string };

export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "blockquote"; variant: "tip" | "note"; spans: InlineSpan[] }
  | { type: "list"; ordered: boolean; items: InlineSpan[][] };

export interface Section {
  id: string;
  number: number;
  title: string;
  blocks: Block[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  sourceFile: string;
  sections: Section[];
}

export interface Curriculum {
  modules: Module[];
}
```

---

## 4. Layout chi tiết

### 4.1 Trang chủ (`/`)

Thay thế hoàn toàn nội dung clone claude.com. Cấu trúc:

```
┌─────────────────────────────────────────────┐
│ LearnHeader (fixed, compact)                  │
├─────────────────────────────────────────────┤
│                                               │
│  HERO: "Data Engineering Lifecycle"           │
│  Tiêu đề serif lớn + mô tả ngắn               │
│  LifecycleDiagram (SVG 5 giai đoạn)           │
│                                               │
├─────────────────────────────────────────────┤
│  MODULE GRID (3 cột desktop, 1 cột mobile)    │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ 0. Nhập│ │0. Source│ │0. Storage           │
│  │ môn    │ │ Systems │ │ Systems             │
│  └────────┘ └────────┘ └────────┘            │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ 1. Inge│ │ 2. Mode│ │ 3. Orche             │
│  │ stion  │ │ ling   │ │ stration             │
│  └────────┘ └────────┘ └────────┘            │
│  ┌────────┐ ┌────────┐                         │
│  │ 4. Stre│ │ 5. Ente│                         │
│  │ aming  │ │ rprise │                         │
│  └────────┘ └────────┘                         │
├─────────────────────────────────────────────┤
│ Footer (đơn giản)                             │
└─────────────────────────────────────────────┘
```

**Hero section:**
- Padding-top: `var(--section-space-page-top)` (để room cho fixed header)
- Title: `--text-display-1`, font-serif, color `var(--fg-primary)`, max-width 800px, leading tight
- Subtitle: `--text-body-large-1`, color `var(--fg-tertiary)`, max-width 600px, margin-top `var(--space-1-5)`
- LifecycleDiagram ngay dưới, margin-top `var(--space-4)`

**ModuleCard:**
- Background: `var(--card)` (#ffffff) với border `1px solid var(--border-tertiary)`
- Border-radius: `var(--radius-large)` (16px)
- Padding: `var(--space-1-5)` (24px)
- Module number label: `--text-caption`, uppercase, color `var(--text-accent)`, letter-spacing 0.5px
- Module title: `--text-h4`, font-serif, color `var(--fg-primary)`, margin-top `var(--space-0-5)`
- Module description: `--text-body-3`, color `var(--fg-tertiary)`, 2 dòng max (line-clamp-2)
- Hover: border → `var(--border-secondary)`, box-shadow `0 2px 8px rgba(0,0,0,0.04)`, transition `0.2s var(--ease-expo-out)`
- Click → `/learn/[moduleId]`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap `var(--space-1-5)`

### 4.2 Trang học (`/learn/[moduleId]`)

Layout sidebar + content (option A):

```
┌──────────────────────────────────────────────────┐
│ LearnHeader (fixed top, compact)                   │
├──────────┬───────────────────────────────────────┤
│          │  Breadcrumb: Module 1 › Ingestion       │
│ SIDEBAR  │                                          │
│ (sticky) │  ╔═══════════════════════════════════╗  │
│          │  ║  H1: Bài 1: Ingestion              ║  │
│ Module 0 │  ║  (serif, --text-h1)                ║  │
│  § Nhập  │  ╚═══════════════════════════════════╝  │
│  § Source│                                          │
│  § Storage│  ## 1. Ingestion là gì?                 │
│          │  (serif, --text-h2, border-bottom)       │
│ Module 1 │                                          │
│ ▸§ Ing...│  Body text (--text-body-1, 20px/32px)   │
│  § Batch │                                          │
│  § Schema│  > 💡 Tip: Hãy xem ingestion như...     │
│          │    (blockquote, bg --bg-tertiary)        │
│ Module 2 │                                          │
│  § ...   │  ┌─────────────────────────────────┐    │
│          │  │ Generation → Storage → Ingest.. │    │
│          │  └─────────────────────────────────┘    │
│          │    (code block, font-mono, --bg-tertiary)│
│          │                                          │
│          │  ← Module trước    Module sau →          │
├──────────┴───────────────────────────────────────┤
│ Footer                                              │
└──────────────────────────────────────────────────┘
```

**Sidebar (`LearnSidebar.tsx` — "use client"):**
- Width: 280px (fixed), sticky full-height (`position: sticky; top: 56px; height: calc(100vh - 56px)`)
- Background: `var(--bg-secondary)` (#f5f4ed)
- Border-right: `1px solid var(--border-tertiary)`
- Scrollable nội bộ: `overflow-y: auto`, custom scrollbar (thin, `var(--border-secondary)`)
- **Two-level structure:**
  - **Level 1 — Module group header** (6 groups: Module 0–5): `--text-caption`, uppercase, color `var(--fg-tertiary)`, margin-top `var(--space-1-5)`, padding `8px 16px`. Click để expand/collapse file entries trong group.
  - **Level 2 — File entry** (8 total, nhóm trong module group): `--text-body-3` (15px), padding `8px 16px 8px 24px` (indent), color `var(--fg-secondary)`, `border-left: 3px solid transparent`. Click → navigate `/learn/[moduleId]`.
  - **Active file entry**: expanded thêm section items. Background `var(--bg-tertiary)`, border-left `3px solid var(--text-accent)`, color `var(--fg-primary)`, font-weight 500.
  - **Section item** (chỉ hiện dưới active file entry): `--text-body-3`, padding `6px 16px 6px 36px` (indent thêm), color `var(--fg-tertiary)`, click → scroll to section.
  - **Active section**: color `var(--text-accent)`, font-weight 500.
- Hover (non-active file entry): background `rgba(0,0,0,0.03)`, color `var(--fg-primary)`
- State: `useState` cho `expandedGroups: Set<number>` (mặc định chứa group của module hiện tại), `activeSection: string`

**Content area (`LearnContent.tsx` — server component):**
- Max-width: `720px` (optimal reading width, centered với `mx-auto`)
- Padding: `var(--space-2-5)` top, `var(--space-2)` sides
- Background: `var(--bg-primary)`
- Module H1: `--text-h1`, font-serif, color `var(--fg-primary)`, margin-bottom `var(--space-2)`
- Module subtitle: `--text-body-large-2`, color `var(--fg-tertiary)`, margin-bottom `var(--space-3)`

**Mobile (≤768px):**
- Sidebar ẩn mặc định, hamburger menu mở drawer overlay (z-50, backdrop blur)
- Content full-width, padding giảm xuống `var(--space-1)`
- Drawer: slide-in từ trái, width 280px, background `var(--bg-secondary)`, overlay `rgba(0,0,0,0.3)`

### 4.3 LearnHeader (compact)

Thay thế Header hiện tại. Đơn giản hơn:
- Fixed top, height 56px, z-20
- Background: `var(--bg-primary)` với border-bottom `0.8px solid var(--border-tertiary)`
- Left: Logo/title "Data Engineering" (serif, `--text-body-1`, color `var(--fg-primary)`)
- Right: Link "Trang chủ" (`--text-body-3`, color `var(--fg-secondary)`, hover `var(--text-accent)`) + link GitHub repo (icon)
- Mobile: thêm hamburger button bên trái (Lucide `Menu` icon, 24px) để toggle sidebar drawer

---

## 5. Content Block Rendering

Markdown convert ra JSON với block types (xem §3.4). Mỗi block type có component render riêng.

### 5.1 BlockRenderer

Switch component nhận `Block`, render đúng component theo `block.type`:

```typescript
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": return <HeadingBlock {...block} />;
    case "paragraph": return <ParagraphBlock {...block} />;
    case "table": return <TableBlock {...block} />;
    case "code": return <CodeBlock {...block} />;
    case "blockquote": return <BlockquoteBlock {...block} />;
    case "list": return <ListBlock {...block} />;
  }
}
```

### 5.2 HeadingBlock

| Markdown | Level | CSS | Style |
|---|---|---|---|
| `##` | 2 | `--text-h2`, font-serif | border-bottom `1px solid var(--border-tertiary)`, padding-bottom `var(--space-0-5)`, margin-top `var(--space-4)`, margin-bottom `var(--space-1-5)`, `scroll-margin-top: 80px` |
| `###` | 3 | `--text-h3`, font-serif | margin-top `var(--space-3)`, margin-bottom `var(--space-1)`, `scroll-margin-top: 80px` |
| `####` | 4 | `--text-h4`, font-serif | margin-top `var(--space-2-5)`, margin-bottom `var(--space-0-75)`, `scroll-margin-top: 80px` |

Mỗi heading có `id` (slug từ text) để sidebar anchor link hoạt động. `scroll-margin-top: 80px` để heading không bị fixed header che khi scroll-to.

### 5.3 ParagraphBlock

- Font: `var(--font-sans)`, size `var(--text-body-1)` (20px), line-height 32px
- Color: `var(--fg-secondary)` (#30302e) — hơi tối hơn fg-primary để dịu mắt khi đọc dài
- Margin-bottom: `var(--space-1)` (16px)
- **Spans** (inline formatting — `InlineSpan[]`):
  - **Bold**: font-weight 600, color `var(--fg-primary)`
  - *Italic*: font-style italic
  - `inline code`: font `var(--font-mono)`, size 0.875em, background `var(--bg-tertiary)`, padding `2px 6px`, border-radius `var(--radius-x-small)`, color `var(--text-accent)`
  - [link]: color `var(--text-accent)`, underline, hover `var(--color-clay-interactive)`

### 5.4 TableBlock

- Width: 100%, border-collapse
- Wrapper: `overflow-x: auto` (responsive scroll trên mobile <640px), border-radius `var(--radius-small)`, border `1px solid var(--border-tertiary)`
- Header row: background `var(--bg-tertiary)`, font-weight 600, color `var(--fg-primary)`, text-align left, padding `10px 14px`, font-size `var(--text-body-3)`, border-bottom `1px solid var(--border-tertiary)`
- Body rows: border-top `1px solid var(--border-tertiary)`, padding `10px 14px`, font-size `var(--text-body-3)`, color `var(--fg-secondary)`
- Header cell: `white-space: nowrap` để header không wrap
- Body cell: cho phép wrap bình thường

### 5.5 CodeBlock

- Background: `var(--bg-tertiary)` (#f0eee6) — warm tone, không phải dark theme
- Font: `var(--font-mono)`, size `var(--text-body-3)` (15px), line-height 24px
- Color: `var(--fg-secondary)`
- Padding: `var(--space-1)` (16px)
- Border-radius: `var(--radius-small)` (8px)
- Border: `1px solid var(--border-tertiary)`
- Overflow-x: auto cho code dài
- **Không syntax highlighting** trong phase A (chỉ mono font, uniform color). Syntax highlighting có thể thêm sau nếu cần.
- Language label: góc trên phải, `--text-micro`, color `var(--fg-tertiary)`, uppercase, position absolute
- `white-space: pre` để giữ formatting

### 5.6 BlockquoteBlock

Markdown blockquote (`>`) trong docs luôn là tip/note. Render thành callout:

- Background: `rgba(235, 201, 183, 0.12)` (--color-peach với opacity thấp)
- Border-left: `3px solid var(--text-accent)` (clay)
- Border-radius: `var(--radius-small)`, trừ border-left (sharp — `border-top-right-radius`, `border-bottom-right-radius` only)
- Padding: `var(--space-1)` (16px) all sides, padding-left `var(--space-1-5)` (24px)
- Font: `var(--font-sans)`, size `var(--text-body-2)` (17px), color `var(--fg-secondary)`, line-height 28px
- Margin: `var(--space-1-5)` top/bottom
- Icon: Lucide `Lightbulb` (16px), color `var(--text-accent)`, inline-flex bên trái text, margin-right `var(--space-0-5)`
- Variant detection: nếu text bắt đầu bằng "Tip:" → variant "tip" (lightbulb icon). Nếu bắt đầu bằng "Lưu ý:" → variant "note" (Lucide `Info` icon). Default: "tip".

### 5.7 ListBlock

- Unordered: `list-style: disc`, marker color `var(--text-accent)`, `::marker { color: var(--text-accent) }`
- Ordered: `list-style: decimal`, marker color `var(--text-accent)`, font-weight 500, `::marker { color: var(--text-accent) }`
- Padding-left: `var(--space-1-5)` (24px)
- Item spacing: `var(--space-0-25)` (4px) giữa items (`li + li { margin-top: 4px }`)
- Font: `var(--font-sans)`, size `var(--text-body-1)`, color `var(--fg-secondary)`, line-height 32px
- Nested list: padding-left thêm `var(--space-1)`, marker style đổi (circle cho ul level 2, `lower-alpha` cho ol level 2)
- Mỗi item là `InlineSpan[]` (cho phép bold/inline-code trong list items)

---

## 6. LifecycleDiagram (SVG tĩnh)

Sơ đồ 5 giai đoạn Data Engineering Lifecycle, hiển thị trên trang chủ và đầu mỗi module (trong content area, sau module H1).

### 6.1 Cấu trúc

```
[Generation] → [Storage] → [Ingestion] → [Transformation] → [Serving]
```

5 node dạng pill/rounded-rect, nối bằng arrow, nằm ngang (desktop ≥768px) hoặc dọc (mobile <768px).

### 6.2 Data

```typescript
const LIFECYCLE_STAGES = [
  { vi: "Sinh dữ liệu", en: "Generation", moduleId: "module-00-source-systems" },
  { vi: "Lưu trữ", en: "Storage", moduleId: "module-00-storage-systems" },
  { vi: "Nạp dữ liệu", en: "Ingestion", moduleId: "module-01-ingestion" },
  { vi: "Biến đổi", en: "Transformation", moduleId: "module-02-modeling" },
  { vi: "Phục vụ", en: "Serving", moduleId: "module-05-enterprise" },
] as const;
```

### 6.3 Style

- Mỗi node: background `var(--card)`, border `1px solid var(--border-tertiary)`, border-radius `var(--radius-large)`, padding `12px 20px`, text-align center
- Node label (Vietnamese): font-serif, `--text-body-3`, color `var(--fg-primary)`, font-weight 500
- Node sublabel (English): `--text-caption`, color `var(--fg-tertiary)`, margin-top 2px
- Arrow: stroke `var(--border-secondary)`, strokeWidth 1.5, arrowhead marker (SVG `<marker>`)
- Active node (khi `activeModuleId` prop match): border `var(--text-accent)`, background `rgba(217,119,87,0.08)`
- Desktop: flex row, items center, gap `var(--space-0-5)`, arrows là SVG line giữa nodes
- Mobile: flex column, arrows xoay 90° (pointing down)
- Component là `"use client"` nếu cần active state, hoặc server component nếu chỉ render tĩnh (trang chủ không cần active)

### 6.4 Reuse

Dùng lại pattern từ `MindMapGraph.tsx` hiện có (SVG + CSS variables + `cn()`). Tuy nhiên diagram này đơn giản hơn nhiều — chỉ 5 node tuyến tính, không cần hover logic phức tạp trong phase A.

---

## 7. Navigation

### 7.1 Sidebar → Content

- Click section trong sidebar → scroll đến section tương ứng trong content (anchor link `href="#section-id"`, browser native scroll)
- `scroll-margin-top: 80px` trên mỗi heading để tránh bị fixed header che
- Active section highlight theo scroll position: `IntersectionObserver` theo dõi tất cả heading elements, set `activeSection` state khi heading vào viewport
- Click module header → toggle expand/collapse section list (`expandedModules` state)

### 7.2 Prev/Next

Cuối mỗi module content:
- Container: flex justify-between, margin-top `var(--space-5)`, padding-top `var(--space-3)`, border-top `1px solid var(--border-tertiary)`
- "← Module trước" (left align) — link về module trước đó
- "Module sau →" (right align) — link tới module tiếp theo
- Style: `--text-body-3`, color `var(--fg-secondary)`, hover `var(--text-accent)`, font-weight 500
- Module đầu tiên (module-00-introduction): chỉ có "Module sau →"
- Module cuối (module-05-enterprise): chỉ có "← Module trước"
- Link text bao gồm module title: "← Module 0: Nhập môn" / "Module 2: Modeling →"

### 7.3 Breadcrumb

Đầu content area (trước module H1):
- Format: "Module 1 · Ingestion"
- Style: `--text-caption`, color `var(--fg-tertiary)`, separator `·` color `var(--border-primary)`, margin-bottom `var(--space-1)`
- Không clickable trong phase A (chỉ display)

---

## 8. Responsive Breakpoints

Tailwind v4 default breakpoints (mobile-first):

| Breakpoint | Width | Layout |
|---|---|---|
| <768px | Mobile | Sidebar drawer, content full-width, module grid 1 cột, diagram dọc |
| ≥768px (md) | Tablet | Sidebar visible, content 720px, module grid 2 cột |
| ≥1024px (lg) | Desktop | Full layout, module grid 3 cột |
| ≥1440px | Wide | Container max 90rem centered |

---

## 9. Thay thế nội dung clone claude.com

### 9.1 Xóa

- `src/components/Header.tsx` → thay bằng `LearnHeader.tsx`
- `src/components/Footer.tsx` → thay bằng footer đơn giản
- `src/components/HeroSection.tsx` → xóa
- `src/components/ProblemSolversSection.tsx` → xóa
- `src/components/HowToUseSection.tsx` → xóa
- `src/components/KeepThinkingSection.tsx` → xóa
- `src/components/ModelsSection.tsx` → xóa
- `src/app/page.tsx` → viết lại (trang chủ module grid)

### 9.2 Giữ

- `src/components/MindMapGraph.tsx` — giữ để tham khảo pattern SVG (có thể reuse cho knowledge map phase sau)
- `src/components/icons.tsx` — giữ (SVG icons có thể dùng lại)
- `src/components/ui/` — giữ (shadcn primitives)
- `src/lib/utils.ts` — giữ (cn utility)
- `src/app/globals.css` — giữ nguyên (design tokens)
- `src/app/layout.tsx` — giữ nguyên fonts, chỉ đổi metadata (title/description)
- `public/fonts/` — giữ nguyên

### 9.3 Metadata mới

```typescript
export const metadata: Metadata = {
  title: "Data Engineering Lifecycle — Học lý thuyết DE",
  description: "Khóa học lý thuyết Data Engineering: lifecycle, ingestion, modeling, orchestration, streaming, enterprise.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-touch-icon.png",
  },
};
```

---

## 10. Convert Script (scripts/convert-docs.mjs)

### 10.1 Yêu cầu

- Node.js script (`.mjs`), chạy bằng `node scripts/convert-docs.mjs`
- Không thêm dependency ngoài (dùng built-in `fs`, `path`)
- Đọc tất cả `module-XX-*.md` từ `../Fundemental-Data-Eng/docs/` (sắp xếp theo số module)
- Bỏ qua file sách gốc (`Fundamentals of Data Engineering...md`)
- Output: `src/data/curriculum.json`

### 10.2 Parsing logic

1. Đọc file, tách thành lines
2. **Module metadata**: lấy từ H1 (`# Bài X: Title`). Parse số module và title. Subtitle lấy từ phần trong ngoặc đơn hoặc dòng mô tả đầu tiên.
3. **Sections**: tách theo `## ` (heading level 2). Mỗi section có title từ `## ` và blocks bên trong.
4. **Blocks** trong mỗi section:
   - `### `, `#### ` → heading block (level 3, 4)
   - ` ```lang ... ``` ` → code block (language = lang)
   - `> ` → blockquote block
   - `| ... |` (consecutive lines) → table block (parse headers + rows)
   - `- ` hoặc `* ` → unordered list block
   - `1. ` → ordered list block
   - Dòng trống → separator (bỏ qua)
   - Dòng text thường → paragraph block
5. **Inline spans** trong paragraph/list/blockquote: parse `**bold**`, `*italic*`, `` `code` ``, `[text](url)`
6. **Section ID**: slug từ title (lowercase, thay dấu tiếng Việt, thay space bằng `-`)
7. **Summary**: đoạn text đầu tiên sau H1 (trước section ## đầu tiên), giới hạn 150 ký tự

### 10.3 npm script

```json
{
  "scripts": {
    "prebuild": "node scripts/convert-docs.mjs",
    "convert-docs": "node scripts/convert-docs.mjs"
  }
}
```

`prebuild` chạy tự động trước `next build`. `convert-docs` để chạy thủ công khi dev.

---

## 11. Roadmap các phase sau

| Phase | Tính năng | Spec riêng |
|---|---|---|
| B | Interactive diagrams: click node → panel giải thích, so sánh AI-generated | Sau phase A |
| C | AI features: Socratic checkpoint, Feynman grading, reverse mode (qua FreeLLMAPI tại localhost:4000) | Sau phase B |
| D | DuckDB WASM playground: SQL chạy thật trên browser | Sau phase C |
| E | Knowledge graph + progress tracking: bản đồ tri thức liên module, gợi ý ôn | Sau phase D |

Mỗi phase là 1 spec → plan → implementation cycle độc lập. Phase A phải hoàn thành và ổn định trước khi bắt đầu phase B.

---

## 12. Testing & Verification

### 12.1 Build verification

- `npm run convert-docs` → `src/data/curriculum.json` tạo thành công, 8 modules, không lỗi parse
- `npm run typecheck` → không lỗi TypeScript
- `npm run lint` → không lỗi ESLint
- `npm run build` → build thành công (prebuild chạy convert-docs tự động)

### 12.2 Visual verification

- Trang chủ: hero + lifecycle diagram + 6 module cards hiển thị đúng
- Trang `/learn/module-00-introduction`: sidebar + content render đúng
- Tất cả block types hiển thị đúng: heading, paragraph (bold/italic/code), table, code block, blockquote, list
- Responsive: mobile drawer hoạt động, table scroll ngang, diagram dọc
- Design tokens: mọi màu/font/spacing dùng CSS variables, không hardcode

### 12.3 Content verification

- 8 modules render đầy đủ, không thiếu section
- Code blocks giữ formatting (whitespace, indentation)
- Tables render đúng số cột/hàng
- Blockquotes hiển thị icon đúng (Tip vs Lưu ý)
- Vietnamese text hiển thị đúng (đấu tiếng Việt)
