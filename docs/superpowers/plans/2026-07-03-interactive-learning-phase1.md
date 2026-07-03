# Interactive Learning Platform — Phase 1: Restructure + Enrichment

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure 8 modules from 0-7 and add content enrichment (accordion sections, comparison tabs, interactive lifecycle diagram, code highlighting + copy).

**Architecture:** Rename markdown source files + update H1 numbers so `convert-docs.mjs` auto-assigns correct module numbers. Extend the block type system with a `tabs` type. Upgrade existing components (CodeBlock, LifecycleDiagram, LearnContent) with enrichment features. All changes are client/frontend — no backend in this phase.

**Tech Stack:** Next.js 16 (App Router, React 19, TypeScript strict), Tailwind CSS v4, framer-motion, shiki (code highlighting), lucide-react.

## Global Constraints

- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- No comments in code unless explicitly requested
- Vietnamese UI text — all labels in Vietnamese
- No hardcoded colors/fonts/spacing — always use `var(--xxx)` tokens
- Tailwind v4: plain CSS classes for typography utilities (NOT `@layer utilities`)
- Verification: `npm run lint && npm run typecheck && npm run build` (no test framework in project)
- Markdown source files live in `../Fundemental-Data-Eng/docs/` (sibling repo)
- `convert-docs.mjs` parses H1 `# Bài N: Title` to extract module number
- ModuleIllustration `kindFor()` uses `moduleId.includes("keyword")` substring matching

---

### Task 1: Rename and renumber markdown source files

**Files:**
- Rename: `../Fundemental-Data-Eng/docs/module-00-introduction.md` → `../Fundemental-Data-Eng/docs/module-0-introduction.md`
- Rename: `../Fundemental-Data-Eng/docs/module-00-source-systems.md` → `../Fundemental-Data-Eng/docs/module-1-source-systems.md`
- Rename: `../Fundemental-Data-Eng/docs/module-00-storage-systems.md` → `../Fundemental-Data-Eng/docs/module-2-storage-systems.md`
- Rename: `../Fundemental-Data-Eng/docs/module-01-ingestion.md` → `../Fundemental-Data-Eng/docs/module-3-ingestion.md`
- Rename: `../Fundemental-Data-Eng/docs/module-02-modeling.md` → `../Fundemental-Data-Eng/docs/module-4-modeling.md`
- Rename: `../Fundemental-Data-Eng/docs/module-03-orchestration.md` → `../Fundemental-Data-Eng/docs/module-5-orchestration.md`
- Rename: `../Fundemental-Data-Eng/docs/module-04-streaming.md` → `../Fundemental-Data-Eng/docs/module-6-streaming.md`
- Rename: `../Fundemental-Data-Eng/docs/module-05-enterprise.md` → `../Fundemental-Data-Eng/docs/module-7-enterprise.md`

**Interfaces:**
- Produces: Renamed files whose names encode the new module number. `convert-docs.mjs` reads filenames to derive `moduleId` (filename without `.md`), and parses H1 for `number`.

- [ ] **Step 1: Rename files via git mv**

Run these commands from the `../Fundemental-Data-Eng` directory:

```bash
cd ../Fundemental-Data-Eng
git mv docs/module-00-introduction.md docs/module-0-introduction.md
git mv docs/module-00-source-systems.md docs/module-1-source-systems.md
git mv docs/module-00-storage-systems.md docs/module-2-storage-systems.md
git mv docs/module-01-ingestion.md docs/module-3-ingestion.md
git mv docs/module-02-modeling.md docs/module-4-modeling.md
git mv docs/module-03-orchestration.md docs/module-5-orchestration.md
git mv docs/module-04-streaming.md docs/module-6-streaming.md
git mv docs/module-05-enterprise.md docs/module-7-enterprise.md
```

If `../Fundemental-Data-Eng` is not a git repo, use `Move-Item` instead:

```powershell
Move-Item ../Fundemental-Data-Eng/docs/module-00-introduction.md ../Fundemental-Data-Eng/docs/module-0-introduction.md
Move-Item ../Fundemental-Data-Eng/docs/module-00-source-systems.md ../Fundemental-Data-Eng/docs/module-1-source-systems.md
Move-Item ../Fundemental-Data-Eng/docs/module-00-storage-systems.md ../Fundemental-Data-Eng/docs/module-2-storage-systems.md
Move-Item ../Fundemental-Data-Eng/docs/module-01-ingestion.md ../Fundemental-Data-Eng/docs/module-3-ingestion.md
Move-Item ../Fundemental-Data-Eng/docs/module-02-modeling.md ../Fundemental-Data-Eng/docs/module-4-modeling.md
Move-Item ../Fundemental-Data-Eng/docs/module-03-orchestration.md ../Fundemental-Data-Eng/docs/module-5-orchestration.md
Move-Item ../Fundemental-Data-Eng/docs/module-04-streaming.md ../Fundemental-Data-Eng/docs/module-6-streaming.md
Move-Item ../Fundemental-Data-Eng/docs/module-05-enterprise.md ../Fundemental-Data-Eng/docs/module-7-enterprise.md
```

- [ ] **Step 2: Update H1 numbers in each file**

Each file's first line `# Bài N: ...` must match its new module number:

| File | Old H1 | New H1 |
|------|--------|--------|
| module-0-introduction.md | `# Bài 0: ...` | `# Bài 0: ...` (no change) |
| module-1-source-systems.md | `# Bài 0.1: ...` | `# Bài 1: ...` |
| module-2-storage-systems.md | `# Bài 0.2: ...` | `# Bài 2: ...` |
| module-3-ingestion.md | `# Bài 1: ...` | `# Bài 3: ...` |
| module-4-modeling.md | `# Bài 2: ...` | `# Bài 4: ...` |
| module-5-orchestration.md | `# Bài 3: ...` | `# Bài 5: ...` |
| module-6-streaming.md | `# Bài 4: ...` | `# Bài 6: ...` |
| module-7-enterprise.md | `# Bài 5: ...` | `# Bài 7: ...` |

Use the Edit tool to replace the first line of each file. Read each file's first line first to get exact text.

For `module-1-source-systems.md`:
```
Old: # Bài 0.1: Source Systems - Dữ liệu sinh ra từ đâu?
New: # Bài 1: Source Systems - Dữ liệu sinh ra từ đâu?
```

For `module-2-storage-systems.md`:
```
Old: # Bài 0.2: Storage Systems - Dữ liệu được lưu ở đâu?
New: # Bài 2: Storage Systems - Dữ liệu được lưu ở đâu?
```

For `module-3-ingestion.md`:
```
Old: # Bài 1: Ingestion - Nạp dữ liệu từ nguồn công khai vào Bronze Lakehouse
New: # Bài 3: Ingestion - Nạp dữ liệu từ nguồn công khai vào Bronze Lakehouse
```

For `module-4-modeling.md`:
```
Old: # Bài 2: Queries, Modeling & Transformation - Từ câu hỏi đến mô hình dữ liệu
New: # Bài 4: Queries, Modeling & Transformation - Từ câu hỏi đến mô hình dữ liệu
```

For `module-5-orchestration.md`:
```
Old: # Bài 3: Điều phối Luồng Dữ liệu - Orchestration & DataOps với Airflow
New: # Bài 5: Điều phối Luồng Dữ liệu - Orchestration & DataOps với Airflow
```

For `module-6-streaming.md`:
```
Old: # Bài 4: Xử lý Dữ liệu Thời gian Thực - Streaming với Redpanda & Flink
New: # Bài 6: Xử lý Dữ liệu Thời gian Thực - Streaming với Redpanda & Flink
```

For `module-7-enterprise.md`:
```
Old: # Bài 5: Enterprise Platform - Serving, Security & Lakehouse Governance
New: # Bài 7: Enterprise Platform - Serving, Security & Lakehouse Governance
```

- [ ] **Step 3: Run convert-docs and verify output**

Run: `npm run convert-docs`
Expected: 8 modules parsed, with numbers 0-7 each appearing exactly once.

Verify:
```bash
node -e "const d=require('./src/data/curriculum.json'); d.modules.forEach(m=>console.log('Module ' + m.number + ' | ' + m.id + ' | ' + m.sections.length + ' sections | ' + m.title))"
```
Expected output: 8 lines, Module 0 through Module 7, each with unique `module-N-*` id.

- [ ] **Step 4: Run build to verify static generation**

Run: `npm run build`
Expected: 13 static pages generated, all `/learn/module-N-*` paths prerendered without error.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: restructure modules from 6 groups to 8 (0-7)"
```

---

### Task 2: Update LifecycleDiagram module ID mapping

**Files:**
- Modify: `src/components/LifecycleDiagram.tsx:7-13`

**Interfaces:**
- Consumes: New module IDs from Task 1 (`module-1-source-systems`, `module-2-storage-systems`, `module-3-ingestion`, `module-4-modeling`, `module-7-enterprise`)
- Produces: LifecycleDiagram correctly highlights active stage for each module page.

- [ ] **Step 1: Update LIFECYCLE_STAGES array**

Replace lines 7-13 in `src/components/LifecycleDiagram.tsx`:

```typescript
const LIFECYCLE_STAGES = [
  { vi: "Sinh dữ liệu", en: "Generation", moduleId: "module-1-source-systems" },
  { vi: "Lưu trữ", en: "Storage", moduleId: "module-2-storage-systems" },
  { vi: "Nạp dữ liệu", en: "Ingestion", moduleId: "module-3-ingestion" },
  { vi: "Biến đổi", en: "Transformation", moduleId: "module-4-modeling" },
  { vi: "Phục vụ", en: "Serving", moduleId: "module-7-enterprise" },
] as const;
```

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS (no type errors)

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: PASS, all 13 pages generated.

- [ ] **Step 4: Commit**

```bash
git add src/components/LifecycleDiagram.tsx
git commit -m "fix: update lifecycle diagram module IDs for 0-7 restructure"
```

---

### Task 3: Add `tabs` block type to data model

**Files:**
- Modify: `src/types/curriculum.ts`

**Interfaces:**
- Produces: `Block` union now includes `{ type: "tabs"; id: string; panels: { label: string; spans: InlineSpan[] }[] }`. Later tasks (converter, component) consume this type.

- [ ] **Step 1: Add tabs to Block union**

In `src/types/curriculum.ts`, add the tabs block type to the `Block` union after the `list` type:

```typescript
export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "blockquote"; variant: "tip" | "note"; spans: InlineSpan[] }
  | { type: "list"; ordered: boolean; items: InlineSpan[][] }
  | { type: "tabs"; id: string; panels: { label: string; spans: InlineSpan[] }[] };
```

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/types/curriculum.ts
git commit -m "feat: add tabs block type to curriculum data model"
```

---

### Task 4: Extend convert-docs.mjs to parse `:::tabs` syntax

**Files:**
- Modify: `scripts/convert-docs.mjs:73-204` (the `parseBlocks` function)

**Interfaces:**
- Consumes: The `tabs` block type from Task 3. The existing `parseInlineSpans` function.
- Produces: When converter encounters `:::tabs{id="..."}` ... `:::tab{label="..."}` ... `:::` ... `:::` in markdown, it emits a `{ type: "tabs", id, panels }` block in the JSON output.

Markdown syntax to parse:
```markdown
:::tabs{id="batch-vs-stream"}
:::tab{label="Batch Ingestion"}
Nạp theo lô định kỳ...
:::
:::tab{label="Stream Ingestion"}
Nạp thời gian thực...
:::
:::
```

- [ ] **Step 1: Add tabs parsing to parseBlocks**

In `scripts/convert-docs.mjs`, inside the `parseBlocks` function, add a new branch before the paragraph fallback (before line 190 `const paraLines = []`). Insert this block after the list parsing block (after line 183):

```javascript
    if (line.startsWith(":::tabs{")) {
      const propsMatch = line.match(/id="([^"]*)"/);
      const tabsId = propsMatch ? propsMatch[1] : "";
      i++;

      const panels = [];
      while (i < lines.length && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        if (lines[i].startsWith(":::tab{")) {
          const labelMatch = lines[i].match(/label="([^"]*)"/);
          const label = labelMatch ? labelMatch[1] : "";
          i++;

          const contentLines = [];
          while (i < lines.length && !lines[i].startsWith(":::")) {
            contentLines.push(lines[i]);
            i++;
          }
          i++;

          const contentText = contentLines.join(" ").trim();
          panels.push({ label, spans: parseInlineSpans(contentText) });
        } else if (lines[i].trim() === "") {
          i++;
        } else {
          break;
        }
      }

      if (panels.length > 0) {
        blocks.push({ type: "tabs", id: tabsId, panels });
      }
      continue;
    }
```

- [ ] **Step 2: Test the converter manually**

Create a temporary test by adding a `:::tabs` block to one markdown file, run the converter, and check the JSON output. Then remove the test content.

Add this to the end of `../Fundemental-Data-Eng/docs/module-3-ingestion.md` (temporarily, in any section):

```markdown
:::tabs{id="test-tabs"}
:::tab{label="Batch"}
Nạp theo lô định kỳ.
:::
:::tab{label="Stream"}
Nạp thời gian thực.
:::
:::
```

Run: `npm run convert-docs`

Verify the output contains a tabs block:
```bash
node -e "const d=require('./src/data/curriculum.json'); const m=d.modules.find(x=>x.id==='module-3-ingestion'); const tabs=m.sections.flatMap(s=>s.blocks).filter(b=>b.type==='tabs'); console.log(JSON.stringify(tabs,null,2))"
```
Expected: Array with 1 element, `type: "tabs"`, `panels` with 2 items (labels "Batch" and "Stream").

- [ ] **Step 3: Remove temporary test content from markdown**

Remove the `:::tabs` test block added in Step 2 from `module-3-ingestion.md`.

Run: `npm run convert-docs`

- [ ] **Step 4: Run typecheck and build**

Run: `npm run typecheck && npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/convert-docs.mjs
git commit -m "feat: parse :::tabs syntax in markdown converter"
```

---

### Task 5: Create ComparisonTabs component

**Files:**
- Create: `src/components/learn/blocks/ComparisonTabs.tsx`
- Modify: `src/components/learn/blocks/BlockRenderer.tsx`

**Interfaces:**
- Consumes: `Block` type with `type: "tabs"` from Task 3. `InlineSpan[]` rendered via existing `ParagraphBlock` span rendering logic.
- Produces: `ComparisonTabs` component exported and registered in `BlockRenderer` switch.

- [ ] **Step 1: Create ComparisonTabs.tsx**

Create `src/components/learn/blocks/ComparisonTabs.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { InlineSpan } from "@/types/curriculum";

interface ComparisonTabsProps {
  id: string;
  panels: { label: string; spans: InlineSpan[] }[];
}

function renderSpans(spans: InlineSpan[]) {
  return spans.map((span, i) => {
    switch (span.type) {
      case "bold":
        return <strong key={i} style={{ fontWeight: 600, color: "var(--fg-primary)" }}>{span.text}</strong>;
      case "italic":
        return <em key={i}>{span.text}</em>;
      case "code":
        return (
          <code key={i} style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875em",
            background: "var(--bg-tertiary)",
            padding: "2px 6px",
            borderRadius: "var(--radius-x-small)",
            color: "var(--text-accent)",
          }}>
            {span.text}
          </code>
        );
      case "link":
        return (
          <a key={i} href={span.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-accent)", textDecoration: "underline" }}>
            {span.text}
          </a>
        );
      default:
        return <span key={i}>{span.text}</span>;
    }
  });
}

export function ComparisonTabs({ panels }: ComparisonTabsProps) {
  const [active, setActive] = useState(0);

  if (panels.length === 0) return null;

  return (
    <div style={{
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-tertiary)", background: "var(--bg-tertiary)" }}>
        {panels.map((panel, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            style={{
              padding: "10px 16px",
              fontSize: "15px",
              fontFamily: "var(--font-sans)",
              fontWeight: active === i ? 500 : 400,
              color: active === i ? "var(--fg-primary)" : "var(--fg-tertiary)",
              background: active === i ? "var(--card)" : "transparent",
              border: "none",
              borderBottom: active === i ? "2px solid var(--text-accent)" : "2px solid transparent",
              cursor: "pointer",
              transition: "color 0.2s var(--ease-expo-out), border-color 0.2s var(--ease-expo-out)",
            }}
          >
            {panel.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "var(--space-1) var(--space-1-5)" }}>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body-1)",
          lineHeight: "32px",
          color: "var(--fg-secondary)",
          margin: 0,
        }}>
          {renderSpans(panels[active].spans)}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Register in BlockRenderer**

In `src/components/learn/blocks/BlockRenderer.tsx`, add import and case:

Add to imports (after line 7):
```typescript
import { ComparisonTabs } from "./ComparisonTabs";
```

Add to the switch (before `default:`):
```typescript
    case "tabs":
      return <ComparisonTabs id={block.id} panels={block.panels} />;
```

- [ ] **Step 3: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/learn/blocks/ComparisonTabs.tsx src/components/learn/blocks/BlockRenderer.tsx
git commit -m "feat: add ComparisonTabs component for :::tabs blocks"
```

---

### Task 6: Create AccordionSection component

**Files:**
- Create: `src/components/learn/AccordionSection.tsx`
- Modify: `src/components/learn/LearnContent.tsx:59-67`

**Interfaces:**
- Consumes: `Section` type from `@/types/curriculum`. `BlockRenderer` for rendering blocks. `FadeIn` animation wrapper.
- Produces: Sections with >5 blocks render collapsed by default; sections with <=5 blocks render expanded. Toggle via click on section title.

- [ ] **Step 1: Create AccordionSection.tsx**

Create `src/components/learn/AccordionSection.tsx`:

```tsx
"use client";

import { useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE_EXPO_OUT } from "@/lib/motion";

interface AccordionSectionProps {
  id: string;
  title: string;
  blockCount: number;
  children: ReactNode;
}

export function AccordionSection({ id, title, blockCount, children }: AccordionSectionProps) {
  const defaultOpen = blockCount <= 5;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id={id} ref={ref} style={{ scrollMarginTop: "100px" }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-0-5)",
          width: "100%",
          padding: "var(--space-0-75) 0",
          background: "transparent",
          border: "none",
          borderTop: "1px solid var(--border-tertiary)",
          cursor: "pointer",
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "var(--text-body-large-1)",
          color: "var(--fg-primary)",
          textAlign: "left",
        }}
      >
        <ChevronDown
          size={20}
          style={{
            flexShrink: 0,
            transition: "transform 0.3s var(--ease-expo-out)",
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            color: "var(--fg-tertiary)",
          }}
        />
        {title}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO_OUT }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "var(--space-1)" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Integrate into LearnContent**

In `src/components/learn/LearnContent.tsx`, replace the section mapping block (lines 59-67).

Add import at top (after line 6):
```typescript
import { AccordionSection } from "./AccordionSection";
```

Replace the section mapping:
```tsx
        {module.sections.map((section) => (
          <AccordionSection
            key={section.id}
            id={section.id}
            title={section.title}
            blockCount={section.blocks.length}
          >
            <FadeIn y={16}>
              {section.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </FadeIn>
          </AccordionSection>
        ))}
```

Note: The section title was previously rendered by `HeadingBlock` (type "heading" level 2 in the blocks array). Now `AccordionSection` renders the title as the accordion header. We need to skip the first block if it's a heading level 2 with the same text as the section title. Update the inner content:

```tsx
        {module.sections.map((section) => {
          const firstHeadingIdx = section.blocks.findIndex(
            (b) => b.type === "heading" && b.level === 2 && b.text === section.title
          );
          const renderBlocks = firstHeadingIdx === 0
            ? section.blocks.slice(1)
            : section.blocks;
          return (
            <AccordionSection
              key={section.id}
              id={section.id}
              title={section.title}
              blockCount={section.blocks.length}
            >
              <FadeIn y={16}>
                {renderBlocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </FadeIn>
            </AccordionSection>
          );
        })}
```

- [ ] **Step 3: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 4: Run build and verify visually**

Run: `npm run build`
Expected: PASS

Run dev server and navigate to `/learn/module-3-ingestion`. Verify:
- Sections with >5 blocks are collapsed by default
- Sections with <=5 blocks are expanded by default
- Clicking section title toggles open/close with smooth animation
- Section IDs still work for anchor navigation (sidebar links scroll to correct section)

- [ ] **Step 5: Commit**

```bash
git add src/components/learn/AccordionSection.tsx src/components/learn/LearnContent.tsx
git commit -m "feat: add accordion sections to module reader"
```

---

### Task 7: Upgrade CodeBlock with syntax highlighting and copy button

**Files:**
- Modify: `package.json` (add shiki dependency)
- Modify: `src/components/learn/blocks/CodeBlock.tsx`
- Create: `src/lib/highlight.ts`

**Interfaces:**
- Consumes: `code` string and `language` string from existing block data.
- Produces: CodeBlock renders syntax-highlighted code (shiki) with a copy button. Highlighting is server-side via a cached highlighter singleton.

- [ ] **Step 1: Install shiki**

Run: `npm install shiki`
Expected: `shiki` added to dependencies in `package.json`.

- [ ] **Step 2: Create highlight.ts singleton**

Create `src/lib/highlight.ts`:

```typescript
import { createHighlighter, type Highlighter } from "shiki";

const LANGUAGES = ["sql", "python", "bash", "json", "yaml", "text"] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light"],
      langs: [...LANGUAGES],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, language: string): Promise<string> {
  const lang = LANGUAGES.includes(language as typeof LANGUAGES[number])
    ? language
    : "text";
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, { lang, theme: "github-light" });
}
```

- [ ] **Step 3: Upgrade CodeBlock to async server component with shiki + copy**

Replace entire contents of `src/components/learn/blocks/CodeBlock.tsx`:

```tsx
import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  language: string;
  code: string;
}

export async function CodeBlock({ language, code }: CodeBlockProps) {
  if (!code.trim()) return null;

  const highlightedHtml = await highlightCode(code, language);

  return (
    <div
      className="mb-[var(--space-1-5)] relative"
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-tertiary)",
        borderRadius: "var(--radius-small)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", borderBottom: "1px solid var(--border-tertiary)" }}>
        {language && language !== "text" && (
          <span
            style={{
              fontSize: "var(--text-micro)",
              color: "var(--fg-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {language}
          </span>
        )}
        <CopyButton code={code} />
      </div>
      <div
        className="overflow-x-auto"
        style={{ padding: "var(--space-1)" }}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}
```

Note: `dangerouslySetInnerHTML` is safe here — shiki output is token-wrapping `<span>` elements only, and `code` comes from trusted markdown source files, not user input.

- [ ] **Step 4: Create CopyButton client component**

Create `src/components/learn/blocks/CopyButton.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Đã sao chép" : "Sao chép mã"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: copied ? "var(--color-mineral)" : "var(--fg-tertiary)",
        fontSize: "var(--text-micro)",
        fontFamily: "var(--font-sans)",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        transition: "color 0.2s var(--ease-expo-out)",
        marginLeft: "auto",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Đã chép" : "Sao chép"}
    </button>
  );
}
```

- [ ] **Step 5: Add shiki CSS overrides to globals.css**

Shiki's `github-light` theme uses inline styles on `<span>` elements. We need to ensure the `<pre>` and `<code>` elements shiki generates don't conflict with our base styles. Add to the end of `src/app/globals.css`:

```css
.shiki {
  background: transparent !important;
  margin: 0;
  padding: 0;
}
.shiki code {
  font-family: var(--font-mono);
  font-size: var(--text-body-3);
  line-height: 24px;
}
```

- [ ] **Step 6: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 7: Run build**

Run: `npm run build`
Expected: PASS. CodeBlock is now async — `LearnContent` (server component) already renders it via `BlockRenderer`. If `BlockRenderer` needs to handle async children, verify the build succeeds. If build fails with "Async Component cannot be used as children", wrap `BlockRenderer` call with `await` or make `BlockRenderer` async.

If `BlockRenderer` needs to be async, update `src/components/learn/blocks/BlockRenderer.tsx`:

```tsx
import type { Block } from "@/types/curriculum";
import { HeadingBlock } from "./HeadingBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { TableBlock } from "./TableBlock";
import { CodeBlock } from "./CodeBlock";
import { BlockquoteBlock } from "./BlockquoteBlock";
import { ListBlock } from "./ListBlock";
import { ComparisonTabs } from "./ComparisonTabs";

interface BlockRendererProps {
  block: Block;
}

export async function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock level={block.level} text={block.text} id={block.id} />;
    case "paragraph":
      return <ParagraphBlock spans={block.spans} />;
    case "table":
      return <TableBlock headers={block.headers} rows={block.rows} />;
    case "code":
      return <CodeBlock language={block.language} code={block.code} />;
    case "blockquote":
      return <BlockquoteBlock variant={block.variant} spans={block.spans} />;
    case "list":
      return <ListBlock ordered={block.ordered} items={block.items} />;
    case "tabs":
      return <ComparisonTabs id={block.id} panels={block.panels} />;
    default:
      return null;
  }
}
```

And update `LearnContent.tsx` section rendering to await the map:

```tsx
            <FadeIn y={16}>
              {(await Promise.all(
                renderBlocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))
              ))}
            </FadeIn>
```

Wait — `FadeIn` is a client component and can't take async children directly. Instead, render the blocks before passing to FadeIn:

```tsx
          const renderedBlocks = await Promise.all(
            renderBlocks.map((block, i) => <BlockRenderer key={i} block={block} />)
          );
          return (
            <AccordionSection ...>
              <FadeIn y={16}>{renderedBlocks}</FadeIn>
            </AccordionSection>
          );
```

And make `LearnContent` async: `export async function LearnContent(...)`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/lib/highlight.ts src/components/learn/blocks/CodeBlock.tsx src/components/learn/blocks/CopyButton.tsx src/components/learn/blocks/BlockRenderer.tsx src/components/learn/LearnContent.tsx src/app/globals.css
git commit -m "feat: add shiki syntax highlighting + copy button to code blocks"
```

---

### Task 8: Add interactive popovers to LifecycleDiagram

**Files:**
- Modify: `src/components/LifecycleDiagram.tsx`

**Interfaces:**
- Consumes: Existing `LIFECYCLE_STAGES` array. Module IDs from Task 2.
- Produces: Clicking a lifecycle node opens a popover with stage description + link to the corresponding module. Hover highlights connected arrows.

- [ ] **Step 1: Add stage descriptions and popover state**

In `src/components/LifecycleDiagram.tsx`, add descriptions to `LIFECYCLE_STAGES` and popover state. Replace the `LIFECYCLE_STAGES` array:

```typescript
const LIFECYCLE_STAGES = [
  {
    vi: "Sinh dữ liệu",
    en: "Generation",
    moduleId: "module-1-source-systems",
    description: "Dữ liệu sinh ra từ source systems — API, database, sensor, file. Giai đoạn này trả lời: dữ liệu đến từ đâu, kiểu gì, tần suất cập nhật ra sao.",
  },
  {
    vi: "Lưu trữ",
    en: "Storage",
    moduleId: "module-2-storage-systems",
    description: "Dữ liệu hạ cánh và nằm lại ở storage layer — data lake, lakehouse, warehouse. Bronze/Silver/Gold medallion architecture.",
  },
  {
    vi: "Nạp dữ liệu",
    en: "Ingestion",
    moduleId: "module-3-ingestion",
    description: "Đưa dữ liệu từ nguồn về lưu trữ đầu tiên (Bronze). Batch, micro-batch, hoặc streaming. Đảm bảo trung thực, có thể truy vết.",
  },
  {
    vi: "Biến đổi",
    en: "Transformation",
    moduleId: "module-4-modeling",
    description: "Biến đổi dữ liệu thô thành mô hình phân tích — Silver/Gold layers. dbt, Trino, SQL transformations, data modeling.",
  },
  {
    vi: "Phục vụ",
    en: "Serving",
    moduleId: "module-7-enterprise",
    description: "Phục vụ dữ liệu cho downstream — dashboard, API, ML pipeline, ứng dụng. Security, governance, access patterns.",
  },
] as const;
```

- [ ] **Step 2: Add popover component**

Add a `Popover` component within the same file (before `LifecycleDiagram`):

```tsx
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

function StagePopover({
  stage,
  onClose,
}: {
  stage: (typeof LIFECYCLE_STAGES)[number];
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: 8,
        width: 260,
        background: "var(--card)",
        border: "1px solid var(--border-secondary)",
        borderRadius: "var(--radius-small)",
        padding: "var(--space-1)",
        boxShadow: "0 8px 24px rgba(20,20,19,0.08)",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-0-5)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 500, color: "var(--fg-primary)" }}>
            {stage.vi}
          </div>
          <div style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--fg-tertiary)" }}>
            {stage.en}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-tertiary)", padding: 0 }}
        >
          <X size={16} />
        </button>
      </div>
      <p style={{ fontSize: "14px", lineHeight: "22px", fontFamily: "var(--font-sans)", color: "var(--fg-secondary)", margin: "0 0 var(--space-0-75) 0" }}>
        {stage.description}
      </p>
      <Link
        href={`/learn/${stage.moduleId}`}
        style={{
          fontSize: "14px",
          fontFamily: "var(--font-sans)",
          color: "var(--text-accent)",
          textDecoration: "none",
          fontWeight: 500,
        }}
        className="hover-underline"
      >
        Học module này →
      </Link>
    </div>
  );
}
```

- [ ] **Step 3: Wire popover into the node rendering**

In the `LifecycleDiagram` component, add state for the open popover and wire it into each node's click handler. Add after the `useInView` line:

```typescript
  const [openPopover, setOpenPopover] = useState<number | null>(null);
```

Update the import line at top to include `useState`:
```typescript
import { useRef, useState } from "react";
```

In the node `<motion.div>` for each stage, add `onClick` and `style.cursor` and render the popover. Modify the motion.div to include an `onClick` handler and the popover:

Replace the motion.div opening (the one with `initial={{ opacity: 0, y: 12, scale: 0.96 }}`) — add `onClick` and `cursor: pointer` to its style, and render the popover inside it when `openPopover === i`:

```tsx
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE_OUT_QUART }}
              onClick={() => setOpenPopover(openPopover === i ? null : i)}
              style={{
                background: isActive ? "rgba(217,119,87,0.08)" : "var(--card)",
                border: `1px solid ${isActive ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-large)",
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 120,
                position: "relative",
                cursor: "pointer",
                transition: "border-color 0.3s var(--ease-expo-out), background 0.3s var(--ease-expo-out)",
              }}
            >
              {openPopover === i && (
                <StagePopover stage={stage} onClose={() => setOpenPopover(null)} />
              )}
              {/* ... existing label content stays ... */}
```

- [ ] **Step 4: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: Run build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/LifecycleDiagram.tsx
git commit -m "feat: add interactive popovers to lifecycle diagram nodes"
```

---

### Task 9: Final verification

**Files:**
- None modified — verification only.

- [ ] **Step 1: Run full check**

Run: `npm run check` (lint + typecheck + build)
Expected: All pass.

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

Verify on landing page (`/`):
- 8 module cards (Module 0-7), each with unique illustration
- Lifecycle diagram with 5 stages, clickable nodes showing popovers

Verify on module reader (`/learn/module-3-ingestion`):
- Sidebar shows 8 module groups (0-7)
- Sections render with accordion (collapsed for >5 blocks)
- Code blocks have syntax highlighting + copy button
- Lifecycle diagram highlights "Nạp dữ liệu" (Ingestion) stage
- Clicking lifecycle node shows popover with description + link

- [ ] **Step 3: Commit any final fixes if needed**

If any issues found during visual verification, fix and commit:

```bash
git add -A
git commit -m "fix: address visual verification issues"
```
