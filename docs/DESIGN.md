# DESIGN.md — Data Engineering Learning App

> Tài liệu thiết kế cho web app học lý thuyết Data Engineering, xây trên codebase Next.js 16 + shadcn/ui + Tailwind v4 hiện có (Anthropic design system).

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

> **Quy tắc:** Không thêm màu hex mới. Nếu cần trạng thái mới (ví dụ "đã hoàn thành"), dùng brand colors có sẵn: `--color-cactus`/`--color-mineral` cho success, `--color-sky` cho in-progress, `--color-fig` cho warning.

### 2.3 Typography Scale (fluid clamp)

Tất cả kích thước text dùng CSS variable có sẵn, không hardcode `font-size`:

| Token | Min → Max | Dùng cho |
|---|---|---|
| `--text-display-1` | 42px → 72px | Hero title (trang chủ) |
| `--text-display-2` | 36px → 64px | — |
| `--text-h1` | 34px → 52px | Module title |
| `--text-h2` | 30px → 44px | Section heading (## trong markdown) |
| `--text-h3` | 28px → 36px | Subsection heading (###) |
| `--text-h4` | 23px → 32px | Sub-subsection (####) |
| `--text-h5` | 20px → 25px | — |
| `--text-h6` | 16px → 19px | — |
| `--text-body-large-1` | 22px → 24px | Lead paragraph |
| `--text-body-1` | 19px → 20px | Body text (mặc định, 20px/32px line-height) |
| `--text-body-2` | 17px | Compact body |
| `--text-body-3` | 15px | UI labels, nav items |
| `--text-caption` | 12px | Caption, metadata |
| `--text-micro` | 10px | — |

Body mặc định: `font-size: 20px; line-height: 32px` (set trong `@layer base`).

### 2.4 Spacing Scale (fluid clamp)

| Token | Min → Max |
|---|---|
| `--space-0-25` | 4px (cố định) |
| `--space-0-5` | 8px |
| `--space-0-75` | 12px |
| `--space-1` | 16px |
| `--space-1-5` | 24px |
| `--space-2` | 28px → 32px |
| `--space-2-5` | 32px → 40px |
| `--space-3` | 40px → 48px |
| `--space-4` | 52px → 64px |
| `--space-5` | 64px → 80px |
| `--space-6` | 72px → 96px |
| `--section-space-small` | 64px → 96px |
| `--section-space-main` | 96px → 128px |

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
  layout.tsx          # Root layout (giữ nguyên fonts + globals.css)
  page.tsx            # Trang chủ: grid module cards + lifecycle overview
  learn/
    layout.tsx        # Layout cho trang học: sidebar + content area
    page.tsx          # Redirect → module đầu tiên (module-00-introduction)
    [moduleId]/
      page.tsx        # Trang đọc module: sidebar sections + content
```

### 3.2 Data Flow

```
Fundemental-Data-Eng/docs/*.md
  ↓ (build-time script: scripts/convert-docs.ts)
src/data/curriculum.json    # Structured JSON: modules → sections → blocks
  ↓ (import trong server components)
[moduleId]/page.tsx         # Render sidebar + content từ JSON
```

**Convert script** chạy tại build time (`prebuild` npm script). Đọc markdown từ `../Fundemental-Data-Eng/docs/`, parse, ghi ra `src/data/curriculum.json`. Markdown gốc vẫn là single source of truth — chạy lại script để cập nhật.

### 3.3 Component Structure

```
src/components/
  learn/
    LearnSidebar.tsx        # Sidebar điều hướng module/section
    LearnContent.tsx        # Render nội dung bài học từ JSON blocks
    LearnHeader.tsx         # Top bar khi trong module (compact)
    blocks/                 # Render cho từng loại content block
      HeadingBlock.tsx      # h2, h3, h4
      ParagraphBlock.tsx    # Text thường, có bold/italic/inline-code
      TableBlock.tsx        # Markdown table
      CodeBlock.tsx         # Code block (```text, ```sql)
      ListBlock.tsx         # ul/ol
      BlockquoteBlock.tsx   # Tip/note (blockquote)
  LifecycleDiagram.tsx     # SVG tĩnh: 5 giai đoạn lifecycle
  ModuleCard.tsx           # Thẻ module cho trang chủ
  Header.tsx               # (thay thế) Header mới cho learning app
  Footer.tsx               # (thay thế) Footer đơn giản
  ui/                      # shadcn/ui primitives (giữ nguyên)
  icons.tsx                # SVG icons (giữ nguyên + thêm mới khi cần)
```

---

## 4. Layout chi tiết

### 4.1 Trang chủ (`/`)

Thay thế hoàn toàn nội dung clone claude.com. Cấu trúc:

```
┌─────────────────────────────────────────────┐
│ Header (fixed, compact)                      │
├─────────────────────────────────────────────┤
│                                               │
│  HERO: "Data Engineering Lifecycle"           │
│  Tiêu đề serif lớn + mô tả ngắn               │
│  LifecycleDiagram (SVG 5 giai đoạn)           │
│                                               │
├─────────────────────────────────────────────┤
│  MODULE GRID (3 cột desktop, 1 cột mobile)    │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ Mod 0  │ │ Mod 1  │ │ Mod 2  │            │
│  │ Nhập   │ │ Inges  │ │ Model  │            │
│  │ môn    │ │ tion   │ │ ing    │            │
│  └────────┘ └────────┘ └────────┘            │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ Mod 3  │ │ Mod 4  │ │ Mod 5  │            │
│  │ Orches │ │ Stream │ │ Enter  │            │
│  └────────┘ └────────┘ └────────┘            │
├─────────────────────────────────────────────┤
│ Footer (đơn giản)                             │
└─────────────────────────────────────────────┘
```

**ModuleCard:**
- Background: `var(--card)` (#ffffff) với border `var(--border-tertiary)`
- Border-radius: `var(--radius-large)` (16px)
- Padding: `var(--space-1-5)` (24px)
- Module number label: `--text-caption`, color `var(--text-accent)`
- Module title: `--text-h4`, font-serif, color `var(--fg-primary)`
- Module description: `--text-body-3`, color `var(--fg-tertiary)`, 2 dòng max
- Hover: border → `var(--border-secondary)`, subtle shadow
- Click → `/learn/[moduleId]`

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
│          │  | Nguồn | Kiểu | Chú ý |               │
│          │  |--------|------|-------|               │
│          │  | Open-M | ...  | ...   |               │
│          │    (table, border --border-tertiary)     │
│          │                                          │
│          │  ← Module trước    Module sau →          │
├──────────┴───────────────────────────────────────┤
│ Footer                                              │
└──────────────────────────────────────────────────┘
```

**Sidebar:**
- Width: 280px (fixed), sticky full-height
- Background: `var(--bg-secondary)` (#f5f4ed)
- Border-right: `1px solid var(--border-tertiary)`
- Scrollable nội bộ (overflow-y: auto, height: calc(100vh - header-height))
- Module group header: `--text-caption`, uppercase, color `var(--fg-tertiary)`, margin-top `var(--space-1-5)`
- Section item: `--text-body-3` (15px), padding `8px 16px`, color `var(--fg-secondary)`
- Active section: background `var(--bg-tertiary)`, border-left `3px solid var(--text-accent)`, color `var(--fg-primary)`, font-weight 500
- Hover (non-active): background `rgba(0,0,0,0.03)`, color `var(--fg-primary)`
- Module hiện tại: expanded (section items visible). Module khác: collapsed (chỉ header, click để expand)

**Content area:**
- Max-width: `720px` (optimal reading width, centered)
- Padding: `var(--space-2-5)` top, `var(--space-2)` sides
- Background: `var(--bg-primary)`

**Mobile (≤768px):**
- Sidebar ẩn mặc định, hamburger menu mở drawer overlay
- Content full-width, padding giảm xuống `var(--space-1)`

### 4.3 LearnHeader (compact)

Thay thế Header hiện tại. Đơn giản hơn:
- Fixed top, height ~56px
- Background: `var(--bg-primary)` với border-bottom `var(--border-tertiary)`
- Left: Logo/title "Data Engineering" (serif, --text-body-1)
- Center/Right: Link "Trang chủ" + link GitHub repo
- Mobile: thêm hamburger button bên trái để toggle sidebar

---

## 5. Content Block Rendering

Markdown convert ra JSON với block types. Mỗi block type có component render riêng.

### 5.1 JSON Schema (curriculum.json)

```jsonc
{
  "modules": [
    {
      "id": "module-00-introduction",
      "number": 0,
      "title": "Nhập môn Kỹ thuật Dữ liệu",
      "subtitle": "Vòng đời, Kiến trúc & Tư duy Lựa chọn Công nghệ",
      "summary": "Đặt nền cho toàn bộ khóa học...",
      "sourceFile": "module-00-introduction.md",
      "sections": [
        {
          "id": "ky-su-du-lieu-la-ai",
          "number": 1,
          "title": "Kỹ sư Dữ liệu là ai?",
          "blocks": [
            { "type": "heading", "level": 3, "text": "Định nghĩa và vai trò" },
            { "type": "paragraph", "spans": [ { "text": "Kỹ thuật dữ liệu..." } ] },
            { "type": "table", "headers": ["Vai trò", "Trọng tâm"], "rows": [["...", "..."]] },
            { "type": "code", "language": "text", "code": "Generation -> Storage -> ..." },
            { "type": "blockquote", "variant": "tip", "spans": [ { "text": "Tip: ..." } ] },
            { "type": "list", "ordered": false, "items": [ [ { "text": "..." } ] ] }
          ]
        }
      ]
    }
  ]
}
```

### 5.2 Block Rendering Specs

#### HeadingBlock

| Markdown | Level | CSS | Style |
|---|---|---|---|
| `##` | 2 | `--text-h2`, font-serif | border-bottom `1px solid var(--border-tertiary)`, padding-bottom `var(--space-0-5)`, margin-top `var(--space-4)`, margin-bottom `var(--space-1-5)` |
| `###` | 3 | `--text-h3`, font-serif | margin-top `var(--space-3)`, margin-bottom `var(--space-1)` |
| `####` | 4 | `--text-h4`, font-serif | margin-top `var(--space-2-5)`, margin-bottom `var(--space-0-75)` |

H1 (module title) chỉ xuất hiện một lần đầu bài, render ở `--text-h1`, font-serif, color `var(--fg-primary)`, margin-bottom `var(--space-2)`.

#### ParagraphBlock

- Font: `var(--font-sans)`, size `var(--text-body-1)` (20px), line-height 32px
- Color: `var(--fg-secondary)` (#30302e) — hơi tối hơn fg-primary để dịu mắt khi đọc dài
- Margin-bottom: `var(--space-1)` (16px)
- **Spans** (inline formatting):
  - **Bold**: font-weight 600, color `var(--fg-primary)`
  - *Italic*: font-style italic
  - `inline code`: font `var(--font-mono)`, size 0.875em, background `var(--bg-tertiary)`, padding `2px 6px`, border-radius `var(--radius-x-small)`, color `var(--text-accent)`

#### TableBlock

- Width: 100%, border-collapse
- Header row: background `var(--bg-tertiary)`, font-weight 600, color `var(--fg-primary)`, text-align left, padding `10px 14px`, font-size `var(--text-body-3)`
- Body rows: border-top `1px solid var(--border-tertiary)`, padding `10px 14px`, font-size `var(--text-body-3)`, color `var(--fg-secondary)`
- Border-radius: `var(--radius-small)` cho outer table (overflow hidden)
- Responsive: trên mobile <640px, table scroll ngang (overflow-x: auto, wrapper)

#### CodeBlock

- Background: `var(--bg-tertiary)` (#f0eee6) — warm tone, không phải dark theme
- Font: `var(--font-mono)`, size `var(--text-body-3)` (15px), line-height 24px
- Color: `var(--fg-secondary)`
- Padding: `var(--space-1)` (16px)
- Border-radius: `var(--radius-small)` (8px)
- Border: `1px solid var(--border-tertiary)`
- Overflow-x: auto cho code dài
- **Không syntax highlighting** trong phase A (chỉ mono font, uniform color). Syntax highlighting có thể thêm sau nếu cần.
- Language label (tùy chọn): góc trên phải, `--text-micro`, color `var(--fg-tertiary)`, uppercase

#### BlockquoteBlock

Markdown blockquote (`>`) trong docs luôn là tip/note. Render thành callout:

- Background: `var(--bg-tertiary)` với opacity nhẹ (hoặc dùng `--color-peach` với opacity 0.15)
- Border-left: `3px solid var(--text-accent)` (clay)
- Border-radius: `var(--radius-small)`, trừ border-left (sharp)
- Padding: `var(--space-1)` (16px) all sides
- Font: `var(--font-sans)`, size `var(--text-body-2)` (17px), color `var(--fg-secondary)`
- Icon/prefix: Nếu bắt đầu bằng "Tip:", hiển thị icon nhỏ (Lucide `Lightbulb`) color `var(--text-accent)` ở đầu

#### ListBlock

- Unordered: `list-style: disc`, marker color `var(--text-accent)`
- Ordered: `list-style: decimal`, marker color `var(--text-accent)`, font-weight 500
- Padding-left: `var(--space-1-5)` (24px)
- Item spacing: `var(--space-0-25)` (4px) giữa items
- Font: `var(--font-sans)`, size `var(--text-body-1)`, color `var(--fg-secondary)`
- Nested list: padding-left thêm `var(--space-1)`, marker style đổi (circle cho ul level 2)

---

## 6. LifecycleDiagram (SVG tĩnh)

Sơ đồ 5 giai đoạn Data Engineering Lifecycle, hiển thị trên trang chủ và đầu mỗi module.

### 6.1 Cấu trúc

```
[Generation] → [Storage] → [Ingestion] → [Transformation] → [Serving]
```

5 node dạng pill/rounded-rect, nối bằng arrow, nằm ngang (desktop) hoặc wrap (mobile).

### 6.2 Style

- Mỗi node: background `var(--card)`, border `1px solid var(--border-tertiary)`, border-radius `var(--radius-large)`, padding `12px 20px`
- Node label: font-serif, `--text-body-3`, color `var(--fg-primary)`
- Node sublabel (English term): `--text-caption`, color `var(--fg-tertiary)`
- Arrow: stroke `var(--border-secondary)`, strokeWidth 1.5, arrowhead marker
- Active node (module hiện tại): border `var(--text-accent)`, background `rgba(217,119,87,0.08)`
- Responsive: mobile chuyển sang layout dọc, arrow xoay xuống

### 6.3 Reuse

Dùng lại pattern từ `MindMapGraph.tsx` hiện có (SVG + CSS variables). Tuy nhiên diagram này đơn giản hơn nhiều — chỉ 5 node tuyến tính, không cần hover logic phức tạp trong phase A.

---

## 7. Navigation

### 7.1 Sidebar → Content

- Click section trong sidebar → scroll đến section tương ứng trong content (anchor link, `scroll-margin-top` để tránh bị header che)
- Active section highlight theo scroll position (IntersectionObserver — "use client")
- Click module header → expand/collapse section list

### 7.2 Prev/Next

Cuối mỗi module:
- "← Module trước" (left align) — link về module trước đó
- "Module sau →" (right align) — link tới module tiếp theo
- Style: `--text-body-3`, color `var(--fg-secondary)`, hover `var(--text-accent)`
- Module đầu tiên: chỉ có "Module sau →"
- Module cuối: chỉ có "← Module trước"

### 7.3 Breadcrumb

Đầu content area:
- Format: "Module 1 › Ingestion"
- Style: `--text-caption`, color `var(--fg-tertiary)`, separator `›` color `var(--border-primary)`
- Click "Module 1" → scroll lên đầu bài

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
  // icons giữ nguyên
};
```

---

## 10. Roadmap các phase sau

| Phase | Tính năng | Spec riêng |
|---|---|---|
| B | Interactive diagrams: click node → panel giải thích, so sánh AI-generated | Sau phase A |
| C | AI features: Socratic checkpoint, Feynman grading, reverse mode (qua FreeLLMAPI) | Sau phase B |
| D | DuckDB WASM playground: SQL chạy thật trên browser | Sau phase C |
| E | Knowledge graph + progress tracking: bản đồ tri thức liên module, gợi ý ôn | Sau phase D |

Mỗi phase là 1 spec → plan → implementation cycle độc lập. Phase A phải hoàn thành và ổn định trước khi bắt đầu phase B.
