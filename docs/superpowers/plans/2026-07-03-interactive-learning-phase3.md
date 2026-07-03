# Interactive Learning Platform — Phase 3: MindMap

> **For agentic workers:** Use subagent-driven-development to implement task-by-task.

**Goal:** Add interactive mind map / knowledge graph blocks using react-flow, with auto-layout via dagre.

**Architecture:** Extend block type system with `mindmap`. Converter parses `:::mindmap` syntax. MindMapBlock is a dynamically-imported client component (react-flow is heavy, SSR-incompatible). Custom node types by category (concept/tool/stage).

**Tech Stack:** @xyflow/react (react-flow v12), dagre (auto-layout), framer-motion, Tailwind v4.

## Global Constraints
- TypeScript strict, no `any`, no comments in code
- Vietnamese text without diacritics in JSX strings
- var(--xxx) CSS tokens only
- Verification: npm run lint && npm run typecheck && npm run build
- MindMapBlock must be dynamically imported (ssr: false) — react-flow uses browser APIs
- BlockRenderer is async; LearnContent is async; InteractiveBlocks is client

---

### Task 1: Add mindmap block type + converter parsing

**Files:** src/types/curriculum.ts, scripts/convert-docs.mjs

- [ ] Add to Block union in curriculum.ts:
```typescript
  | {
      type: "mindmap";
      id: string;
      nodes: { id: string; label: string; nodeType: "concept" | "tool" | "stage" }[];
      edges: { from: string; to: string; label: string }[];
    }
```

- [ ] Add mindmap parsing to convert-docs.mjs (after checkpoint parsing block):
```javascript
    if (line.startsWith(":::mindmap{")) {
      const mmMatch = line.match(/id="([^"]*)"/);
      const mmId = mmMatch ? mmMatch[1] : "";
      i++;

      const nodes = [];
      const edges = [];
      while (i < lines.length && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith(":::quiz{") && !lines[i].startsWith(":::checkpoint{") && !lines[i].startsWith(":::mindmap{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        const directiveLine = lines[i];
        if (directiveLine.trim() === ":::") {
          i++;
          break;
        }
        const nodeMatch = directiveLine.match(/^\s*-\s*node:\s*(\S+)\s*\|\s*"([^"]*)"\s*\|\s*(concept|tool|stage)\s*$/);
        if (nodeMatch) {
          nodes.push({ id: nodeMatch[1], label: nodeMatch[2], nodeType: nodeMatch[3] });
          i++;
          continue;
        }
        const edgeMatch = directiveLine.match(/^\s*-\s*edge:\s*(\S+)\s*->\s*(\S+)\s*\|\s*"([^"]*)"\s*$/);
        if (edgeMatch) {
          edges.push({ from: edgeMatch[1], to: edgeMatch[2], label: edgeMatch[3] });
          i++;
          continue;
        }
        i++;
      }

      if (nodes.length > 0) {
        blocks.push({ type: "mindmap", id: mmId, nodes, edges });
      }
      continue;
    }
```

- [ ] Test: add temp mindmap to module-3-ingestion.md, convert, verify, remove temp
- [ ] npm run typecheck && npm run build
- [ ] Commit: "feat: add mindmap block type and converter parsing"

### Task 2: Install @xyflow/react + dagre + create MindMapBlock

**Files:** package.json, src/components/learn/blocks/MindMapBlock.tsx

- [ ] npm install @xyflow/react dagre @types/dagre
- [ ] Create MindMapBlock.tsx (client component with react-flow, dagre layout, custom nodes by type)
- [ ] Commit: "feat: add MindMapBlock component with react-flow + dagre"

### Task 3: Wire MindMapBlock into rendering pipeline

**Files:** src/components/learn/blocks/BlockRenderer.tsx, src/components/learn/InteractiveBlocks.tsx, src/components/learn/LearnContent.tsx

- [ ] Add mindmap to BlockRenderer (return null — handled by InteractiveBlock)
- [ ] Add mindmap case to InteractiveBlock (dynamic import MindMapBlock)
- [ ] Update LearnContent block type check to include "mindmap"
- [ ] npm run check
- [ ] Commit: "feat: wire MindMapBlock into module reader"

### Task 4: Final verification
- [ ] npm run check
- [ ] Visual verify on dev server
