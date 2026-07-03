# Interactive Learning Platform — Phase 4: Feynman Evaluation

**Goal:** Add Feynman technique blocks — student explains a concept, AI evaluates understanding via FreeLLMAPI proxy.

**Architecture:** Extend block type with `feynman`. Converter parses nested `:::keypoints`/`:::context` sub-fences. New API route proxies to FreeLLMAPI (OpenAI-compatible). FeynmanBlock is a client component with textarea + evaluation display. Score saved to SQLite.

**Tech Stack:** Next.js API routes, FreeLLMAPI (OpenAI-compatible proxy), framer-motion, lucide-react.

## Global Constraints
- TypeScript strict, no `any`, no comments in code
- Vietnamese without diacritics in JSX strings
- var(--xxx) CSS tokens only
- Verification: npm run lint && npm run typecheck && npm run build
- FreeLLMAPI at http://localhost:3001/v1/chat/completions (OpenAI format)
- .env.local: FREELLMAPI_URL + FREELLMAPI_KEY
- BlockRenderer async; LearnContent async; InteractiveBlocks client

---

### Task 1: Add feynman block type + converter + db schema + API routes
### Task 2: Create FeynmanBlock component + wire into pipeline
### Task 3: Author sample feynman block + final verification
