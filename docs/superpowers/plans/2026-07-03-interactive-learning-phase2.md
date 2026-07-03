# Interactive Learning Platform — Phase 2: Quiz + Checkpoint + Progress

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add quiz and checkpoint interactive blocks, SQLite progress backend, and progress UI (progress bar, module badges, reading progress).

**Architecture:** Extend block type system with `quiz` and `checkpoint`. Add SQLite database via `better-sqlite3` for progress persistence. Next.js API routes handle CRUD. Client components call API via `useProgress` hook.

**Tech Stack:** Next.js 16 API routes, better-sqlite3, framer-motion, lucide-react, Tailwind v4.

## Global Constraints

- TypeScript strict mode, no `any`
- No comments in code unless explicitly requested
- Vietnamese UI text (no diacritics in JSX strings to avoid encoding issues)
- No hardcoded colors/fonts/spacing — always use var(--xxx) tokens
- Verification: npm run lint && npm run typecheck && npm run build
- SQLite DB at `data/learning.db` (gitignored, must add to .gitignore)
- BlockRenderer is async (from Phase 1 Task 7)
- LearnContent is async (from Phase 1 Task 7)
- AccordionSection is a client component wrapping section content

---

### Task 1: Add quiz + checkpoint block types

**Files:**
- Modify: `src/types/curriculum.ts`

- [ ] **Step 1: Add quiz and checkpoint to Block union**

Add after the `tabs` type in the Block union:

```typescript
  | { type: "quiz"; id: string; question: string;
      options: { text: string; correct: boolean; explanation: string }[] }
  | { type: "checkpoint"; id: string;
      goals: { label: string; sectionId: string }[] }
```

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/types/curriculum.ts
git commit -m "feat: add quiz and checkpoint block types"
```

---

### Task 2: Extend convert-docs.mjs for quiz + checkpoint syntax

**Files:**
- Modify: `scripts/convert-docs.mjs` (parseBlocks function)

- [ ] **Step 1: Add quiz parsing**

After the `:::tabs{` parsing block, add:

```javascript
    if (line.startsWith(":::quiz{")) {
      const idMatch = line.match(/id="([^"]*)"/);
      const qMatch = line.match(/question="([^"]*)"/);
      const quizId = idMatch ? idMatch[1] : "";
      const question = qMatch ? qMatch[1] : "";
      i++;

      const options = [];
      while (i < lines.length && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith(":::quiz{") && !lines[i].startsWith(":::checkpoint{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        const optLine = lines[i];
        if (optLine.match(/^\s*-\s*\[[ xX]\]/)) {
          const correct = /^\s*-\s*\[[xX]\]/.test(optLine);
          const rest = optLine.replace(/^\s*-\s*\[[ xX]\]\s*/, "").trim();
          const parts = rest.split(/\s+[\u2014\u2013-]\s+/);
          const text = parts[0] || rest;
          const explanation = parts.length > 1 ? parts.slice(1).join(" - ") : "";
          options.push({ text, correct, explanation });
          i++;
        } else if (optLine.trim() === ":::" ) {
          i++;
          break;
        } else if (optLine.trim() === "") {
          i++;
        } else {
          break;
        }
      }

      if (options.length > 0) {
        blocks.push({ type: "quiz", id: quizId, question, options });
      }
      continue;
    }
```

- [ ] **Step 2: Add checkpoint parsing**

After the quiz parsing block, add:

```javascript
    if (line.startsWith(":::checkpoint{")) {
      const cpMatch = line.match(/id="([^"]*)"/);
      const cpId = cpMatch ? cpMatch[1] : "";
      i++;

      const goals = [];
      while (i < lines.length && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith(":::quiz{") && !lines[i].startsWith(":::checkpoint{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        const goalLine = lines[i];
        if (goalLine.trim() === ":::") {
          i++;
          break;
        }
        const goalMatch = goalLine.match(/^\s*-\s*goal:\s*"([^"]*)"\s*\|\s*section:\s*(.+)$/);
        if (goalMatch) {
          goals.push({ label: goalMatch[1], sectionId: goalMatch[2].trim() });
        }
        i++;
      }

      if (goals.length > 0) {
        blocks.push({ type: "checkpoint", id: cpId, goals });
      }
      continue;
    }
```

- [ ] **Step 3: Test converter**

Temporarily add to end of `../Fundemental-Data-Eng/docs/module-3-ingestion.md`:

```markdown
:::quiz{id="test-q" question="Which layer stores raw data?"}
- [x] Bronze - correct, raw landing zone
- [ ] Silver - wrong, already transformed
:::

:::checkpoint{id="test-cp"}
- goal: "Understand lifecycle" | section: test-section
- goal: "Know batch vs stream" | section: test-section-2
:::
```

Run: `npm run convert-docs`
Verify: `node -e "const d=require('./src/data/curriculum.json'); const m=d.modules.find(x=>x.id==='module-3-ingestion'); const blocks=m.sections.flatMap(s=>s.blocks); console.log(JSON.stringify(blocks.filter(b=>b.type==='quiz'||b.type==='checkpoint'),null,2))"`
Expected: 1 quiz with 2 options, 1 checkpoint with 2 goals.

Remove temp content, run `npm run convert-docs` again.

- [ ] **Step 4: Run typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/convert-docs.mjs
git commit -m "feat: parse :::quiz and :::checkpoint syntax in converter"
```

---

### Task 3: SQLite setup + db.ts singleton + .gitignore

**Files:**
- Modify: `package.json` (add better-sqlite3)
- Create: `src/lib/db.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Install better-sqlite3**

Run: `npm install better-sqlite3`

- [ ] **Step 2: Add data/ to .gitignore**

Add `data/` to `.gitignore` (if not already present).

- [ ] **Step 3: Create src/lib/db.ts**

```typescript
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "learning.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS module_progress (
        module_id TEXT PRIMARY KEY,
        sections_read TEXT DEFAULT '[]',
        checkpoint_goals TEXT DEFAULT '[]',
        quiz_score INTEGER DEFAULT 0,
        quiz_attempts TEXT DEFAULT '[]',
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);
  }
  return db;
}

export interface ModuleProgress {
  moduleId: string;
  sectionsRead: string[];
  checkpointGoals: string[];
  quizScore: number;
  quizAttempts: { score: number; date: string }[];
}

export function getProgress(moduleId: string): ModuleProgress | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM module_progress WHERE module_id = ?").get(moduleId) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    moduleId: row.module_id as string,
    sectionsRead: JSON.parse(row.sections_read as string),
    checkpointGoals: JSON.parse(row.checkpoint_goals as string),
    quizScore: row.quiz_score as number,
    quizAttempts: JSON.parse(row.quiz_attempts as string),
  };
}

export function getAllProgress(): ModuleProgress[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM module_progress").all() as Record<string, unknown>[];
  return rows.map((row) => ({
    moduleId: row.module_id as string,
    sectionsRead: JSON.parse(row.sections_read as string),
    checkpointGoals: JSON.parse(row.checkpoint_goals as string),
    quizScore: row.quiz_score as number,
    quizAttempts: JSON.parse(row.quiz_attempts as string),
  }));
}

export function upsertProgress(
  moduleId: string,
  updates: Partial<Pick<ModuleProgress, "sectionsRead" | "checkpointGoals" | "quizScore">>
): ModuleProgress {
  const db = getDb();
  const existing = getProgress(moduleId);
  const merged: ModuleProgress = {
    moduleId,
    sectionsRead: updates.sectionsRead ?? existing?.sectionsRead ?? [],
    checkpointGoals: updates.checkpointGoals ?? existing?.checkpointGoals ?? [],
    quizScore: updates.quizScore ?? existing?.quizScore ?? 0,
    quizAttempts: existing?.quizAttempts ?? [],
  };
  db.prepare(`
    INSERT INTO module_progress (module_id, sections_read, checkpoint_goals, quiz_score, quiz_attempts, updated_at)
    VALUES (@moduleId, @sectionsRead, @checkpointGoals, @quizScore, @quizAttempts, datetime('now'))
    ON CONFLICT(module_id) DO UPDATE SET
      sections_read = @sectionsRead,
      checkpoint_goals = @checkpointGoals,
      quiz_score = @quizScore,
      updated_at = datetime('now')
  `).run({
    moduleId,
    sectionsRead: JSON.stringify(merged.sectionsRead),
    checkpointGoals: JSON.stringify(merged.checkpointGoals),
    quizScore: merged.quizScore,
    quizAttempts: JSON.stringify(merged.quizAttempts),
  });
  return merged;
}

export function addQuizAttempt(moduleId: string, score: number): ModuleProgress {
  const db = getDb();
  const existing = getProgress(moduleId);
  const attempts = existing?.quizAttempts ?? [];
  attempts.push({ score, date: new Date().toISOString() });
  const bestScore = Math.max(existing?.quizScore ?? 0, score);
  db.prepare(`
    INSERT INTO module_progress (module_id, sections_read, checkpoint_goals, quiz_score, quiz_attempts, updated_at)
    VALUES (@moduleId, @sectionsRead, @checkpointGoals, @quizScore, @quizAttempts, datetime('now'))
    ON CONFLICT(module_id) DO UPDATE SET
      quiz_score = @quizScore,
      quiz_attempts = @quizAttempts,
      updated_at = datetime('now')
  `).run({
    moduleId,
    sectionsRead: JSON.stringify(existing?.sectionsRead ?? []),
    checkpointGoals: JSON.stringify(existing?.checkpointGoals ?? []),
    quizScore: bestScore,
    quizAttempts: JSON.stringify(attempts),
  });
  return getProgress(moduleId)!;
}
```

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: PASS (better-sqlite3 types come from @types/better-sqlite3 or the package itself)

If typecheck fails with missing types: `npm install -D @types/better-sqlite3`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/lib/db.ts .gitignore
git commit -m "feat: add SQLite progress database with db.ts singleton"
```

---

### Task 4: Create progress API routes

**Files:**
- Create: `src/app/api/progress/route.ts`
- Create: `src/app/api/progress/sections/route.ts`
- Create: `src/app/api/progress/checkpoint/route.ts`
- Create: `src/app/api/progress/quiz/route.ts`

- [ ] **Step 1: Create GET route**

`src/app/api/progress/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAllProgress, getProgress } from "@/lib/db";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const moduleId = request.nextUrl.searchParams.get("moduleId");
  if (moduleId) {
    const progress = getProgress(moduleId);
    return NextResponse.json(progress ?? { moduleId, sectionsRead: [], checkpointGoals: [], quizScore: 0, quizAttempts: [] });
  }
  return NextResponse.json(getAllProgress());
}
```

- [ ] **Step 2: Create POST sections route**

`src/app/api/progress/sections/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getProgress, upsertProgress } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, sectionId } = body as { moduleId: string; sectionId: string };
  if (!moduleId || !sectionId) {
    return NextResponse.json({ error: "moduleId and sectionId required" }, { status: 400 });
  }
  const existing = getProgress(moduleId);
  const sectionsRead = existing?.sectionsRead ?? [];
  if (!sectionsRead.includes(sectionId)) {
    sectionsRead.push(sectionId);
  }
  const updated = upsertProgress(moduleId, { sectionsRead });
  return NextResponse.json(updated);
}
```

- [ ] **Step 3: Create POST checkpoint route**

`src/app/api/progress/checkpoint/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getProgress, upsertProgress } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, goalLabel } = body as { moduleId: string; goalLabel: string };
  if (!moduleId || !goalLabel) {
    return NextResponse.json({ error: "moduleId and goalLabel required" }, { status: 400 });
  }
  const existing = getProgress(moduleId);
  const goals = existing?.checkpointGoals ?? [];
  const idx = goals.indexOf(goalLabel);
  if (idx >= 0) {
    goals.splice(idx, 1);
  } else {
    goals.push(goalLabel);
  }
  const updated = upsertProgress(moduleId, { checkpointGoals: goals });
  return NextResponse.json(updated);
}
```

- [ ] **Step 4: Create POST quiz route**

`src/app/api/progress/quiz/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { addQuizAttempt } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, score } = body as { moduleId: string; score: number };
  if (!moduleId || typeof score !== "number") {
    return NextResponse.json({ error: "moduleId and score required" }, { status: 400 });
  }
  const updated = addQuizAttempt(moduleId, Math.round(score));
  return NextResponse.json(updated);
}
```

- [ ] **Step 5: Run typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/app/api/
git commit -m "feat: add progress API routes (GET, sections, checkpoint, quiz)"
```

---

### Task 5: Create useProgress hook

**Files:**
- Create: `src/hooks/useProgress.ts`

- [ ] **Step 1: Create the hook**

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";

export interface ModuleProgress {
  moduleId: string;
  sectionsRead: string[];
  checkpointGoals: string[];
  quizScore: number;
  quizAttempts: { score: number; date: string }[];
}

export function useProgress(moduleId: string) {
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/progress?moduleId=${moduleId}`);
        if (!cancelled) {
          const data = await res.json();
          setProgress(data);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProgress();
    return () => { cancelled = true; };
  }, [moduleId]);

  const markSectionRead = useCallback(async (sectionId: string) => {
    setProgress((prev) => {
      if (prev?.sectionsRead.includes(sectionId)) return prev;
      return {
        ...prev!,
        sectionsRead: [...(prev?.sectionsRead ?? []), sectionId],
      };
    });
    try {
      const res = await fetch("/api/progress/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, sectionId }),
      });
      const data = await res.json();
      setProgress(data);
    } catch {
    }
  }, [moduleId]);

  const toggleGoal = useCallback(async (goalLabel: string) => {
    setProgress((prev) => {
      const goals = prev?.checkpointGoals ?? [];
      const idx = goals.indexOf(goalLabel);
      return {
        ...prev!,
        checkpointGoals: idx >= 0
          ? goals.filter((g) => g !== goalLabel)
          : [...goals, goalLabel],
      };
    });
    try {
      const res = await fetch("/api/progress/checkpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, goalLabel }),
      });
      const data = await res.json();
      setProgress(data);
    } catch {
    }
  }, [moduleId]);

  const saveQuizScore = useCallback(async (score: number) => {
    try {
      const res = await fetch("/api/progress/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, score }),
      });
      const data = await res.json();
      setProgress(data);
    } catch {
    }
  }, [moduleId]);

  return { progress, loading, markSectionRead, toggleGoal, saveQuizScore };
}

export function useAllProgress() {
  const [allProgress, setAllProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const res = await fetch("/api/progress");
        if (!cancelled) {
          const data = await res.json();
          setAllProgress(data);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { allProgress, loading };
}
```

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useProgress.ts
git commit -m "feat: add useProgress and useAllProgress hooks"
```

---

### Task 6: Create QuizBlock component

**Files:**
- Create: `src/components/learn/blocks/QuizBlock.tsx`
- Modify: `src/components/learn/blocks/BlockRenderer.tsx`

- [ ] **Step 1: Create QuizBlock.tsx**

```tsx
"use client";

import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

interface QuizBlockProps {
  id: string;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
  moduleId: string;
  onSaveScore: (score: number) => void;
}

export function QuizBlock({ id, question, options, onSaveScore }: QuizBlockProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function toggleOption(i: number) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function submit() {
    if (selected.size === 0) return;
    setSubmitted(true);
    const correctCount = options.filter((_, i) => selected.has(i) && options[i].correct).length
      + options.filter((opt, i) => !selected.has(i) && opt.correct).length === 0
      ? options.filter((opt) => opt.correct).length
      : options.filter((_, i) => selected.has(i) && options[i].correct).length;
    const score = Math.round((correctCount / options.filter((o) => o.correct).length) * 100);
    onSaveScore(score);
  }

  function reset() {
    setSelected(new Set());
    setSubmitted(false);
  }

  const hasMultipleCorrect = options.filter((o) => o.correct).length > 1;
  const score = submitted
    ? Math.round(
        (options.filter((_, i) => selected.has(i) && options[i].correct).length /
          options.filter((o) => o.correct).length) * 100
      )
    : 0;

  return (
    <div style={{
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      padding: "var(--space-1-5)",
      background: "var(--card)",
    }}>
      <div style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-body-large-1)",
        fontWeight: 500,
        color: "var(--fg-primary)",
        marginBottom: "var(--space-1)",
      }}>
        {question}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-0-5)" }}>
        {options.map((opt, i) => {
          const isSelected = selected.has(i);
          const showResult = submitted;
          const isCorrect = opt.correct;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={i}
              type="button"
              onClick={() => toggleOption(i)}
              disabled={submitted}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-0-5)",
                padding: "var(--space-0-75) var(--space-1)",
                border: `1px solid ${showCorrect ? "var(--color-mineral)" : showWrong ? "var(--color-error)" : isSelected ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-x-small)",
                background: showCorrect ? "rgba(98,153,135,0.08)" : showWrong ? "rgba(181,51,51,0.06)" : isSelected ? "rgba(217,119,87,0.06)" : "transparent",
                cursor: submitted ? "default" : "pointer",
                textAlign: "left",
                transition: "all 0.2s var(--ease-expo-out)",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                border: `1.5px solid ${showCorrect ? "var(--color-mineral)" : showWrong ? "var(--color-error)" : isSelected ? "var(--text-accent)" : "var(--border-secondary)"}`,
                borderRadius: hasMultipleCorrect ? 4 : "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}>
                {isSelected && !showResult && (
                  <span style={{ width: 8, height: 8, borderRadius: hasMultipleCorrect ? 2 : "50%", background: "var(--text-accent)" }} />
                )}
                {showCorrect && <Check size={14} color="var(--color-mineral)" />}
                {showWrong && <X size={14} color="var(--color-error)" />}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-2)",
                  color: "var(--fg-secondary)",
                }}>
                  {opt.text}
                </span>
                {showResult && opt.explanation && (
                  <span style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: "var(--text-body-3)",
                    color: isCorrect ? "var(--color-mineral)" : "var(--fg-tertiary)",
                    fontStyle: "italic",
                  }}>
                    {opt.explanation}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          disabled={selected.size === 0}
          style={{
            marginTop: "var(--space-1)",
            padding: "8px 16px",
            fontSize: "15px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "var(--card)",
            background: selected.size > 0 ? "var(--text-accent)" : "var(--border-secondary)",
            border: "none",
            borderRadius: "var(--radius-x-small)",
            cursor: selected.size > 0 ? "pointer" : "not-allowed",
            transition: "background 0.2s var(--ease-expo-out)",
          }}
        >
          Kiem tra dap an
        </button>
      ) : (
        <div style={{
          marginTop: "var(--space-1)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
        }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-body-large-1)",
            fontWeight: 500,
            color: score >= 70 ? "var(--color-mineral)" : score >= 40 ? "var(--text-accent)" : "var(--color-error)",
          }}>
            {score}%
          </span>
          <button
            type="button"
            onClick={reset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              fontSize: "14px",
              fontFamily: "var(--font-sans)",
              color: "var(--fg-secondary)",
              background: "transparent",
              border: "1px solid var(--border-tertiary)",
              borderRadius: "var(--radius-x-small)",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} />
            Thu lai
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Register in BlockRenderer**

Read the current BlockRenderer.tsx first (it was made async in Phase 1). Add import and case:

```typescript
import { QuizBlock } from "./QuizBlock";
```

Add case:
```typescript
    case "quiz":
      return <QuizBlock key={block.id} id={block.id} question={block.question} options={block.options} moduleId="" onSaveScore={() => {}} />;
```

NOTE: The moduleId and onSaveScore will be properly wired in Task 8 when we integrate useProgress into LearnContent. For now, pass empty/placeholder values so the component compiles and renders.

- [ ] **Step 3: Run typecheck + lint + build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/learn/blocks/QuizBlock.tsx src/components/learn/blocks/BlockRenderer.tsx
git commit -m "feat: add QuizBlock component with scoring and explanations"
```

---

### Task 7: Create CheckpointBlock component

**Files:**
- Create: `src/components/learn/blocks/CheckpointBlock.tsx`
- Modify: `src/components/learn/blocks/BlockRenderer.tsx`

- [ ] **Step 1: Create CheckpointBlock.tsx**

```tsx
"use client";

import { Check } from "lucide-react";

interface CheckpointBlockProps {
  id: string;
  goals: { label: string; sectionId: string }[];
  completedGoals: string[];
  onToggleGoal: (goalLabel: string) => void;
}

export function CheckpointBlock({ goals, completedGoals, onToggleGoal }: CheckpointBlockProps) {
  if (goals.length === 0) return null;

  const completedCount = goals.filter((g) => completedGoals.includes(g.label)).length;
  const pct = Math.round((completedCount / goals.length) * 100);

  return (
    <div style={{
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      padding: "var(--space-1-5)",
      background: "var(--card)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--space-1)",
      }}>
        <div style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-body-large-1)",
          fontWeight: 500,
          color: "var(--fg-primary)",
        }}>
          Muc tieo bai hoc
        </div>
        <span style={{
          fontSize: "14px",
          fontFamily: "var(--font-sans)",
          color: "var(--fg-tertiary)",
        }}>
          {completedCount}/{goals.length}
        </span>
      </div>

      <div style={{
        height: 4,
        background: "var(--bg-tertiary)",
        borderRadius: 2,
        marginBottom: "var(--space-1)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--text-accent)",
          borderRadius: 2,
          transition: "width 0.3s var(--ease-expo-out)",
        }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-0-5)" }}>
        {goals.map((goal, i) => {
          const done = completedGoals.includes(goal.label);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onToggleGoal(goal.label)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-0-5)",
                padding: "var(--space-0-75) var(--space-1)",
                border: `1px solid ${done ? "var(--color-mineral)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-x-small)",
                background: done ? "rgba(98,153,135,0.06)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s var(--ease-expo-out)",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                border: `1.5px solid ${done ? "var(--color-mineral)" : "var(--border-secondary)"}`,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
                background: done ? "var(--color-mineral)" : "transparent",
              }}>
                {done && <Check size={14} color="var(--card)" />}
              </span>
              <span style={{
                flex: 1,
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-2)",
                color: done ? "var(--fg-tertiary)" : "var(--fg-secondary)",
                textDecoration: done ? "line-through" : "none",
              }}>
                {goal.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Register in BlockRenderer**

Add import:
```typescript
import { CheckpointBlock } from "./CheckpointBlock";
```

Add case:
```typescript
    case "checkpoint":
      return <CheckpointBlock key={block.id} id={block.id} goals={block.goals} completedGoals={[]} onToggleGoal={() => {}} />;
```

NOTE: Placeholder props will be wired in Task 8.

- [ ] **Step 3: Run typecheck + lint + build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/learn/blocks/CheckpointBlock.tsx src/components/learn/blocks/BlockRenderer.tsx
git commit -m "feat: add CheckpointBlock component with goal tracking"
```

---

### Task 8: Wire progress into LearnContent + create progress UI components

**Files:**
- Create: `src/components/ProgressBar.tsx`
- Create: `src/components/ModuleProgressBadge.tsx`
- Create: `src/components/ReadingProgress.tsx`
- Modify: `src/app/page.tsx` (add ProgressBar)
- Modify: `src/components/ModuleCard.tsx` (add badge)
- Modify: `src/components/learn/LearnContent.tsx` (wire useProgress, QuizBlock, CheckpointBlock, ReadingProgress)

This is the integration task. It connects the useProgress hook to QuizBlock, CheckpointBlock, and adds progress UI.

- [ ] **Step 1: Create ProgressBar.tsx** (landing page)

```tsx
"use client";

import { useAllProgress } from "@/hooks/useProgress";

interface ProgressBarProps {
  totalModules: number;
}

export function ProgressBar({ totalModules }: ProgressBarProps) {
  const { allProgress, loading } = useAllProgress();

  const completedModules = loading ? 0 : allProgress.filter(
    (p) => p.sectionsRead.length > 0 && p.quizScore >= 70
  ).length;
  const pct = Math.round((completedModules / totalModules) * 100);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)",
      marginBottom: "var(--space-2)",
    }}>
      <div style={{
        flex: 1,
        height: 8,
        background: "var(--bg-tertiary)",
        borderRadius: 4,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--text-accent)",
          borderRadius: 4,
          transition: "width 0.5s var(--ease-expo-out)",
        }} />
      </div>
      <span style={{
        fontSize: "15px",
        fontFamily: "var(--font-sans)",
        color: "var(--fg-tertiary)",
        whiteSpace: "nowrap",
      }}>
        {completedModules}/{totalModules} module
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create ModuleProgressBadge.tsx** (on ModuleCard)

```tsx
"use client";

import { useProgress } from "@/hooks/useProgress";

interface ModuleProgressBadgeProps {
  moduleId: string;
  totalSections: number;
}

export function ModuleProgressBadge({ moduleId, totalSections }: ModuleProgressBadgeProps) {
  const { progress, loading } = useProgress(moduleId);

  if (loading || !progress) return null;

  const sectionsPct = totalSections > 0
    ? Math.round((progress.sectionsRead.length / totalSections) * 100)
    : 0;
  const quizPct = progress.quizScore;
  const overall = Math.round((sectionsPct + quizPct) / 2);

  if (overall === 0) return null;

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall / 100) * circumference;

  return (
    <svg width={36} height={36} viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
      <circle cx="18" cy="18" r={radius} fill="none" stroke="var(--bg-tertiary)" strokeWidth="3" />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke={overall >= 70 ? "var(--color-mineral)" : "var(--text-accent)"}
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
        style={{ transition: "stroke-dashoffset 0.5s var(--ease-expo-out)" }}
      />
      <text x="18" y="22" textAnchor="middle" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600" fill="var(--fg-primary)">
        {overall}%
      </text>
    </svg>
  );
}
```

- [ ] **Step 3: Create ReadingProgress.tsx** (module reader)

```tsx
"use client";

interface ReadingProgressProps {
  readCount: number;
  totalCount: number;
}

export function ReadingProgress({ readCount, totalCount }: ReadingProgressProps) {
  const pct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-0-5)",
      marginBottom: "var(--space-1)",
    }}>
      <div style={{
        flex: 1,
        height: 3,
        background: "var(--bg-tertiary)",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--text-accent)",
          borderRadius: 2,
          transition: "width 0.3s var(--ease-expo-out)",
        }} />
      </div>
      <span style={{
        fontSize: "var(--text-body-3)",
        fontFamily: "var(--font-sans)",
        color: "var(--fg-tertiary)",
      }}>
        {readCount}/{totalCount}
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Wire ProgressBar into page.tsx**

Read `src/app/page.tsx` first. Add import and place ProgressBar above the modules section heading.

Add import: `import { ProgressBar } from "@/components/ProgressBar";`

In the modules section, before the `<FadeIn>` wrapping the "Khoa hoc" h2, add:

```tsx
          <ProgressBar totalModules={curriculum.modules.length} />
```

- [ ] **Step 5: Wire ModuleProgressBadge into ModuleCard.tsx**

Read `src/components/ModuleCard.tsx` first. Add import and render badge in the card header area.

Add import: `import { ModuleProgressBadge } from "@/components/ModuleProgressBadge";`

The ModuleCard receives `module` prop which has `sections` array. Add the badge next to the module number label:

Replace the module number div with:
```tsx
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-0-5)" }}>
        <div style={{ fontSize: "15px", fontFamily: "var(--font-sans)", color: "var(--text-accent)", fontWeight: 400 }}>
          Module {module.number}
        </div>
        <ModuleProgressBadge moduleId={module.id} totalSections={module.sections.length} />
      </div>
```

- [ ] **Step 6: Wire useProgress + QuizBlock + CheckpointBlock + ReadingProgress into LearnContent.tsx**

This is the most complex integration. Read `src/components/learn/LearnContent.tsx` first (it's async from Phase 1).

Since LearnContent is a server component and useProgress is a client hook, we need a client wrapper. Create a new client component that wraps the interactive blocks.

Create `src/components/learn/InteractiveBlocks.tsx`:

```tsx
"use client";

import { useProgress } from "@/hooks/useProgress";
import { QuizBlock } from "./blocks/QuizBlock";
import { CheckpointBlock } from "./blocks/CheckpointBlock";
import { ReadingProgress } from "@/components/ReadingProgress";
import type { Block, Section } from "@/types/curriculum";
import { BlockRenderer } from "./blocks/BlockRenderer";

interface InteractiveBlocksProps {
  moduleId: string;
  sections: Section[];
}

export function InteractiveBlocks({ moduleId, sections }: InteractiveBlocksProps) {
  const { progress, loading, markSectionRead, toggleGoal, saveQuizScore } = useProgress(moduleId);

  const sectionsRead = progress?.sectionsRead ?? [];
  const checkpointGoals = progress?.checkpointGoals ?? [];
  const readCount = sections.filter((s) => sectionsRead.includes(s.id)).length;

  return (
    <>
      <ReadingProgress readCount={readCount} totalCount={sections.length} />
      {sections.map((section) => {
        const isRead = sectionsRead.includes(section.id);
        return (
          <div key={section.id}>
            {!isRead && (
              <button
                type="button"
                onClick={() => markSectionRead(section.id)}
                style={{
                  fontSize: "var(--text-micro)",
                  fontFamily: "var(--font-sans)",
                  color: "var(--fg-tertiary)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "var(--space-0-5)",
                  opacity: 0.6,
                }}
              >
                Danh dau da doc
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

export function InteractiveBlock({ block, moduleId }: { block: Block; moduleId: string }) {
  const { progress, toggleGoal, saveQuizScore } = useProgress(moduleId);

  if (block.type === "quiz") {
    return <QuizBlock id={block.id} question={block.question} options={block.options} moduleId={moduleId} onSaveScore={saveQuizScore} />;
  }
  if (block.type === "checkpoint") {
    return <CheckpointBlock id={block.id} goals={block.goals} completedGoals={progress?.checkpointGoals ?? []} onToggleGoal={toggleGoal} />;
  }
  return null;
}
```

Then update LearnContent.tsx:
1. Import `InteractiveBlocks` and `InteractiveBlock`
2. Add `<InteractiveBlocks moduleId={module.id} sections={module.sections} />` before the section mapping
3. In the block rendering loop, check if a block is quiz/checkpoint and render via InteractiveBlock instead of BlockRenderer

The section rendering (currently async with Promise.all) needs to check block type:

```tsx
const renderedBlocks = await Promise.all(
  renderBlocks.map(async (block, i) => {
    if (block.type === "quiz" || block.type === "checkpoint") {
      return <InteractiveBlock key={i} block={block} moduleId={module.id} />;
    }
    return <BlockRenderer key={i} block={block} />;
  })
);
```

Also remove the placeholder quiz/checkpoint cases from BlockRenderer (since InteractiveBlock handles them now). Keep them as fallback returning null.

- [ ] **Step 7: Run typecheck + lint + build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/ProgressBar.tsx src/components/ModuleProgressBadge.tsx src/components/ReadingProgress.tsx src/components/learn/InteractiveBlocks.tsx src/components/learn/LearnContent.tsx src/app/page.tsx src/components/ModuleCard.tsx src/components/learn/blocks/BlockRenderer.tsx
git commit -m "feat: wire progress tracking UI into landing + module reader"
```

---

### Task 9: Final verification

- [ ] **Step 1: Run full check**

Run: `npm run check`
Expected: All pass.

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

Verify on landing page (/):
- ProgressBar appears above "Khoa hoc" heading
- ModuleProgressBadge appears on cards (if any progress saved)

Verify on module reader (/learn/module-3-ingestion):
- ReadingProgress bar shows at top of content
- "Danh dau da doc" buttons appear for unread sections
- No console errors

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: address Phase 2 verification issues"
```
