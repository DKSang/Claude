# Interactive Learning Platform Design

## Overview

Nâng cấp nền tảng học Data Engineering từ text-only sang tương tác: thêm quiz, checkpoint, mind map (knowledge graph), và Feynman evaluation (AI chấm bài giải thích). Tái cấu trúc 8 module (0-7) từ 6 nhóm hiện tại. Thêm progress tracking backend (SQLite) + content enrichment (accordion, tabs, interactive lifecycle, code highlighting).

## Goals

- Kích thích người học thay vì chỉ ngồi đọc chữ
- Giúp ghi nhớ lâu hơn qua mind map + Feynman technique
- Tracking tiến trình học tập qua quiz/reading/Feynman scores
- Cấu trúc 8 module rõ ràng, mỗi module 1 bài

## Non-Goals

- Không xây dựng LMS đầy đủ (no user accounts, no admin panel)
- Không thay thế FreeLLMAPI — chỉ gọi nó như proxy LLM
- Không thêm flashcard/callout (loại bỏ theo user decision)

---

## 1. Module Restructuring (0-7)

### Current state
8 markdown files gộp thành 6 nhóm: Module 0 (3 bài: Introduction, Source, Storage) + Module 1-5.

### Target state
8 module riêng biệt, mỗi bài 1 module:

| Module | Source file (new name) | Title | Lifecycle stage |
|--------|------------------------|-------|-----------------|
| 0 | module-0-introduction.md | Nhập môn Kỹ thuật Dữ liệu | Overview |
| 1 | module-1-source-systems.md | Source Systems | Generation |
| 2 | module-2-storage-systems.md | Storage Systems | Storage |
| 3 | module-3-ingestion.md | Ingestion | Ingestion |
| 4 | module-4-modeling.md | Queries, Modeling & Transformation | Transformation |
| 5 | module-5-orchestration.md | Điều phối Luồng Dữ liệu | Cross-stage |
| 6 | module-6-streaming.md | Xử lý Dữ liệu Thời gian Thực | Ingestion (stream) |
| 7 | module-7-enterprise.md | Enterprise Platform | Serving |

### Changes required
1. Rename markdown files in `../Fundemental-Data-Eng/docs/`:
   - `module-00-source-systems.md` → `module-1-source-systems.md`
   - `module-00-storage-systems.md` → `module-2-storage-systems.md`
   - `module-01-ingestion.md` → `module-3-ingestion.md`
   - `module-02-modeling.md` → `module-4-modeling.md`
   - `module-03-orchestration.md` → `module-5-orchestration.md`
   - `module-04-streaming.md` → `module-6-streaming.md`
   - `module-05-enterprise.md` → `module-7-enterprise.md`
   - `module-00-introduction.md` → `module-0-introduction.md`

2. Update H1 in each file: `# Bài N: Title` → `# Bài <new-number>: Title`

3. `convert-docs.mjs` already parses `number` from H1 regex — auto-assigns correct number.

4. Update `LifecycleDiagram` stage mapping:
   ```typescript
   const LIFECYCLE_STAGES = [
     { vi: "Sinh dữ liệu", en: "Generation", moduleId: "module-1-source-systems" },
     { vi: "Lưu trữ", en: "Storage", moduleId: "module-2-storage-systems" },
     { vi: "Nạp dữ liệu", en: "Ingestion", moduleId: "module-3-ingestion" },
     { vi: "Biến đổi", en: "Transformation", moduleId: "module-4-modeling" },
     { vi: "Phục vụ", en: "Serving", moduleId: "module-7-enterprise" },
   ];
   ```

5. Update `ModuleIllustration` `kindFor()` — already uses substring matching on module ID, works with new IDs (e.g. `module-1-source-systems` contains "source").

6. `LearnSidebar` groups by `module.number` — auto-displays 8 groups (0-7).

---

## 2. New Block Types

### 2.1 Data model (curriculum.ts)

```typescript
export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "blockquote"; variant: "tip" | "note"; spans: InlineSpan[] }
  | { type: "list"; ordered: boolean; items: InlineSpan[][] }
  // NEW:
  | { type: "quiz"; id: string; question: string;
      options: { text: string; correct: boolean; explanation: string }[] }
  | { type: "checkpoint"; id: string;
      goals: { label: string; sectionId: string }[] }
  | { type: "mindmap"; id: string;
      nodes: { id: string; label: string; type: "concept" | "tool" | "stage" }[];
      edges: { from: string; to: string; label: string }[] }
  | { type: "feynman"; id: string; topic: string;
      keyPoints: string[]; sectionContext: string }
```

### 2.2 Markdown syntax (author-facing)

Extended fence syntax parsed by `convert-docs.mjs`:

```markdown
:::quiz{id="q-bronze-1" question="Đâu là layer giữ dữ liệu thô, trung thực?"}
- [x] Bronze — đúng, bronze là raw landing zone
- [ ] Silver — sai, silver đã transform
- [ ] Gold — sai, gold là serving layer
:::

:::mindmap{id="mm-lifecycle"}
- node: generation | "Sinh dữ liệu" | concept
- node: storage | "Lưu trữ" | stage
- node: bronze | "Bronze Layer" | concept
- edge: generation -> storage | "chảy vào"
- edge: storage -> bronze | "land tại"
:::

:::feynman{id="fey-watermark" topic="Watermark Pattern trong Incremental Loading"}
:::keypoints
- Lưu start time không phải end time
- Pha 1: filter, Pha 2: merge
- Backfill bằng cách lùi watermark
:::
:::context
Mô hình incremental processing phổ quát dùng watermark table...
:::
:::

:::checkpoint{id="cp-ingestion"}
- goal: "Hiểu 5 giai đoạn lifecycle" | section: lifecycle-overview
- goal: "Phân biệt batch vs stream ingestion" | section: batch-vs-stream
:::
```

### 2.3 Converter changes (convert-docs.mjs)

Add parsing for `:::type{props}` fenced blocks:

1. Detect `:::quiz{...}` opening → parse props via regex
2. Read lines until `:::` closing
3. Parse options: lines starting with `- [x]` (correct) or `- [ ]` (incorrect)
4. Option text after `]` → split on ` — ` or ` - ` → `[text, explanation]`
5. For `:::feynman`, parse nested `:::keypoints` and `:::context` sub-fences
6. For `:::mindmap`, parse `node:` and `edge:` directive lines
7. For `:::checkpoint`, parse `goal: ... | section: ...` lines
8. Emit corresponding block type in JSON output

---

## 3. Backend

### 3.1 Progress tracking (SQLite)

**Dependency:** `better-sqlite3` (same as FreeLLMAPI pattern)

**Database:** `data/learning.db` (gitignored)

**Schema:**
```sql
CREATE TABLE IF NOT EXISTS module_progress (
  module_id TEXT PRIMARY KEY,
  sections_read TEXT DEFAULT '[]',      -- JSON array of section IDs
  checkpoint_goals TEXT DEFAULT '[]',   -- JSON array of goal labels
  quiz_score INTEGER DEFAULT 0,         -- best quiz score %
  feynman_best_score INTEGER DEFAULT 0, -- best Feynman score
  quiz_attempts TEXT DEFAULT '[]',      -- JSON array of {score, date}
  feynman_attempts TEXT DEFAULT '[]',   -- JSON array of {score, date, feedback}
  updated_at TEXT DEFAULT (datetime('now'))
);
```

**API routes:**
```
GET  /api/progress                    — all module progress
GET  /api/progress?moduleId=X         — single module progress
POST /api/progress/sections           — { moduleId, sectionId } → mark section read
POST /api/progress/checkpoint         — { moduleId, goalLabel } → toggle goal
POST /api/progress/quiz               — { moduleId, quizId, score } → save best score
POST /api/progress/feynman            — { moduleId, feynmanId, score, feedback } → save
```

**Client hook:** `useProgress()` — fetch on mount, optimistic update on actions.

### 3.2 Feynman AI evaluation

**Config:** `.env.local`
```
FREELLMAPI_URL=http://localhost:3001
FREELLMAPI_KEY=<unified-api-key>
```

**API route:** `POST /api/feynman/evaluate`

Request: `{ moduleId: string, feynmanId: string, explanation: string }`

Flow:
1. Read `src/data/curriculum.json` → find module → find feynman block by id
2. Build OpenAI-format messages:
   - System: "Bạn là giảng viên chấm bài theo phương pháp Feynman. Đánh giá giải thích của học viên dựa trên keyPoints. Trả JSON: { score: 0-100, correctPoints: string[], missingPoints: string[], suggestions: string }"
   - User: topic + keyPoints + sectionContext + explanation
3. Call `POST ${FREELLMAPI_URL}/v1/chat/completions` with `Authorization: Bearer ${FREELLMAPI_KEY}`, `model: "auto"`, `temperature: 0.3`
4. Parse JSON from response → return to client
5. Client saves best score via `/api/progress/feynman`

**Error handling:** If FreeLLMAPI unreachable → return `{ error: "AI service unavailable", fallback: true }` → client shows "Không thể kết nối AI, thử lại sau".

---

## 4. Client Components

### 4.1 New block renderers

```
src/components/learn/blocks/
  QuizBlock.tsx         — "use client", radio/checkbox, submit button, 
                          reveal correct/incorrect + explanation per option,
                          save score to progress API
  CheckpointBlock.tsx   — "use client", toggle goals (checkbox list),
                          visual: checklist with progress ring,
                          save to progress API
  MindMapBlock.tsx      — "use client", react-flow canvas,
                          nodes colored by type (concept/tool/stage),
                          edges with labels, click node → highlight connected,
                          minimap enabled, layout: dagre auto-layout
  FeynmanBlock.tsx      — "use client", textarea for explanation,
                          submit → loading spinner → evaluation display:
                          score gauge, correct points (green), 
                          missing points (amber), suggestions,
                          "thử lại" button
```

**BlockRenderer** — add cases for `quiz`, `checkpoint`, `mindmap`, `feynman` in switch.

### 4.2 Progress UI

```
src/components/
  ProgressBar.tsx         — landing page: 0/8 → 8/8 modules, 
                            animated fill, % label
  ModuleProgressBadge.tsx — on ModuleCard: circular badge showing 
                            completion % (sections read + quiz + feynman)
  ReadingProgress.tsx     — module reader: "X/Y sections" mini bar 
                            in sidebar or sticky top
```

### 4.3 Content enrichment

**AccordionSection** — wrap section content in collapsible:
- Section with >5 blocks → collapsed by default
- Section with <=5 blocks → expanded by default
- Smooth height animation via framer-motion
- Section title as toggle button with chevron

**ComparisonTabs** — explicit `:::tabs` syntax in markdown:
```markdown
:::tabs{id="batch-vs-stream"}
:::tab{label="Batch Ingestion"}
Nạp theo lô định kỳ (hằng ngày, hàng giờ)...
:::
:::tab{label="Stream Ingestion"}
Nạp thời gian thực, từng event...
:::
:::
```
Converter parses `:::tabs` → `{ type: "tabs", id, panels: { label: string, spans: InlineSpan[] }[] }` block. `ComparisonTabs.tsx` renders tab buttons + panel content with smooth transition. No auto-detection from table headers — explicit syntax only, clearer for authors.

**InteractiveLifecycleDiagram** — upgrade LifecycleDiagram:
- Click node → popover with stage description + link to module
- Node hover → highlight connected arrows
- Active node subtle pulse animation (already have anim-pulse-soft)

**CodeBlock upgrade:**
- Add `shiki` for syntax highlighting (Next.js compatible, build-time or runtime)
- Add copy button (top-right, uses navigator.clipboard)
- Keep existing visual style (bg-tertiary, border, radius-small)

### 4.4 react-flow integration

```
src/components/learn/blocks/MindMapBlock.tsx
```

- Install `reactflow` (or `@xyflow/react` — latest name)
- Custom node types: `conceptNode` (circle, clay color), `toolNode` (rounded rect, mineral), `stageNode` (pill, sky)
- Edge labels rendered as small text overlays
- `dagre` for auto-layout (hierarchical, left-to-right)
- Minimap + controls enabled
- Node click → expand panel with description (from markdown or tooltip)
- Responsive: full height 400px on desktop, 300px on mobile

---

## 5. Implementation Phases

### Phase 1: Module restructuring + content enrichment
- Rename markdown files + H1 numbers
- Update LifecycleDiagram mapping
- Add accordion sections
- Add comparison tabs
- Upgrade code block (shiki + copy)
- Interactive lifecycle diagram popovers
- **No backend needed yet**

### Phase 2: Quiz + Checkpoint + Progress backend
- Extend convert-docs.mjs for quiz/checkpoint syntax
- Add QuizBlock, CheckpointBlock components
- SQLite setup + progress API routes
- Progress UI (ProgressBar, ModuleProgressBadge, ReadingProgress)
- useProgress hook

### Phase 3: MindMap
- Install react-flow + dagre
- Extend convert-docs.mjs for mindmap syntax
- Add MindMapBlock component
- Author mindmap content for key modules

### Phase 4: Feynman evaluation
- Extend convert-docs.mjs for feynman syntax
- Add FeynmanBlock component
- Add /api/feynman/evaluate route
- Connect to FreeLLMAPI
- Author feynman blocks for key concepts

---

## 6. Tech Stack Additions

| Package | Purpose | Approx size |
|---------|---------|-------------|
| `better-sqlite3` | Progress database | native binary |
| `reactflow` (`@xyflow/react`) | Mind map rendering | ~150KB |
| `dagre` | Auto-layout for react-flow | ~45KB |
| `shiki` | Code syntax highlighting | ~variable (languages) |

**Shiki usage:** Use `shiki` in the `CodeBlock` server component (already rendered server-side via `BlockRenderer` → `LearnContent`). Highlight at request time with a cached highlighter singleton (5 languages: sql, python, bash, json, yaml). Output is safe HTML spans from shiki's own tokenizer — code comes from trusted markdown source files, not user input. No `dangerouslySetInnerHTML` needed if using shiki's `codeToHast` → React elements, or use `codeToHtml` with `dangerouslySetInnerHTML` (safe since shiki output is token-wrapping spans only).

All other functionality uses existing: framer-motion, lucide-react, Next.js API routes, Tailwind v4.

---

## 7. File Structure (new/modified)

```
NEW:
  src/lib/db.ts                          — SQLite connection singleton
  src/lib/motion.ts                      — (already exists, shared easing)
  src/hooks/useProgress.ts               — progress fetch/save hook
  src/app/api/progress/route.ts          — GET progress
  src/app/api/progress/sections/route.ts — POST section read
  src/app/api/progress/checkpoint/route.ts — POST checkpoint toggle
  src/app/api/progress/quiz/route.ts     — POST quiz score
  src/app/api/progress/feynman/route.ts  — POST feynman score
  src/app/api/feynman/evaluate/route.ts  — POST feynman AI evaluation
  src/components/learn/blocks/QuizBlock.tsx
  src/components/learn/blocks/CheckpointBlock.tsx
  src/components/learn/blocks/MindMapBlock.tsx
  src/components/learn/blocks/FeynmanBlock.tsx
  src/components/learn/blocks/AccordionSection.tsx
  src/components/learn/blocks/ComparisonTabs.tsx
  src/components/ProgressBar.tsx
  src/components/ModuleProgressBadge.tsx
  src/components/ReadingProgress.tsx

MODIFIED:
  src/types/curriculum.ts                — add 4 new block types
  scripts/convert-docs.mjs               — parse :::type fences
  src/components/learn/blocks/BlockRenderer.tsx — add 4 new cases
  src/components/LifecycleDiagram.tsx    — update module IDs + popovers
  src/components/ModuleCard.tsx          — add progress badge
  src/components/ModuleIllustration.tsx  — update ID matching
  src/components/learn/LearnContent.tsx  — accordion + reading progress
  src/components/learn/LearnSidebar.tsx  — progress display
  src/app/page.tsx                       — progress bar
  src/components/learn/blocks/CodeBlock.tsx — shiki + copy button
  package.json                           — add better-sqlite3, reactflow, dagre, shiki
  ../Fundemental-Data-Eng/docs/*.md      — rename + renumber + add interactive blocks
```

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| FreeLLMAPI not running when user studies | Graceful fallback: Feynman block shows "AI unavailable" message, no crash |
| SQLite native binary on Windows | `better-sqlite3` has prebuilt binaries for win32; test on dev machine |
| react-flow bundle size | Dynamic import (`next/dynamic`) — only loads on module pages with mindmap |
| shiki bundle size | Use `shikiji` (lighter) or single-language bundle; or server-side highlight |
| Content authoring burden | Phase content gradually — start with quiz/checkpoint on 2-3 modules, expand |
| Markdown syntax complexity | Keep :::type syntax simple, document with examples in INSPECTION_GUIDE.md |

---

## 9. Design Decisions Log

- **Block types:** User chose Quiz + Checkpoint + MindMap + Feynman (dropped Flashcard, Callout)
- **MindMap rendering:** User chose react-flow over custom SVG (more features, accepts +150KB)
- **Content model:** User chose markdown extension over separate JSON/TSX files
- **Interaction level:** User chose client + backend (SQLite progress + FreeLLMAPI Feynman)
- **Module structure:** User chose split 0-7 (each lesson = 1 module)
- **Enrichment:** User chose all 4 (accordion, tabs, interactive lifecycle, code upgrade)
