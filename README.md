# 🎓 Khóa học Kỹ thuật Dữ liệu (Data Engineering)

Nền tảng học Kỹ thuật Dữ liệu tương tác, xây dựng bằng **Next.js 16**, dành cho người Việt.

> Từ căn bản đến chuyên sâu — 8 học phần, 92+ sections, tích hợp sơ đồ tư duy, mindmap và bài tập Feynman.

---

## 📚 Chương trình học

| # | Học phần | Nội dung chính |
|---|----------|----------------|
| 0 | **Nhập môn Kỹ thuật Dữ liệu** | Vòng đời dữ liệu, kiến trúc, tư duy chọn công nghệ |
| 1 | **Source Systems** | Nguồn dữ liệu, ứng dụng nguồn, APIs, message queues |
| 2 | **Storage Systems** | Lưu trữ dữ liệu: data lake, data warehouse, database |
| 3 | **Ingestion** | Chiến lược và công cụ nhập dữ liệu batch & streaming |
| 4 | **Queries, Modeling & Transformation** | Truy vấn, mô hình hóa và biến đổi dữ liệu |
| 5 | **Điều phối Luồng Dữ liệu** | Orchestration, workflow DAG, scheduling |
| 6 | **Xử lý Dữ liệu Thời gian Thực** | Streaming architecture, Kafka, Flink |
| 7 | **Enterprise Platform** | Data platform tổng thể, governance, security |

Mỗi học phần gồm nhiều sections với nội dung chi tiết, hình ảnh minh họa, sơ đồ tư duy, và bài tập tự kiểm tra.

---

## 🛠️ Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| Framework | **Next.js 16** (App Router, React 19, TypeScript) |
| UI Components | **shadcn/ui** + Tailwind CSS v4 |
| Database | **SQLite** (better-sqlite3) |
| Animation | **Framer Motion** |
| Mindmap | **xyflow/react** + dagre |
| Code Highlight | **Shiki** |
| Deployment | Docker, Vercel-ready |

---

## ⚡ Bắt đầu nhanh

### Yêu cầu

- Node.js >= 24
- npm

### Cài đặt

```bash
git clone <your-repo-url>
cd data-engineer-course
npm install
npm run seed    # Khởi tạo database từ curriculum
npm run dev     # Chạy dev server tại http://localhost:3000
```

### Build production

```bash
npm run build
npm start
```

### Docker

```bash
docker compose up app --build    # Production
docker compose up dev --build     # Dev mode (port 3001)
```

---

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── learn/[moduleId]/    # Trang học phần động
│   ├── api/                 # API routes (feynman, progress)
│   ├── page.tsx             # Trang chủ
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles + design tokens
├── components/
│   ├── learn/               # Component học tập (sidebar, content)
│   ├── animations/          # FadeIn, WordsPullUp, CardEntrance
│   ├── ui/                  # shadcn/ui primitives
│   ├── MindMapGraph.tsx     # Sơ đồ tư duy
│   ├── LifecycleDiagram.tsx # Sơ đồ vòng đời dữ liệu
│   └── ModuleCard.tsx       # Thẻ học phần
├── data/
│   └── curriculum.json      # Dữ liệu toàn bộ curriculum
├── hooks/
│   └── useProgress.ts       # Hook theo dõi tiến độ
├── lib/
│   ├── db.ts                # SQLite database layer
│   └── utils.ts             # Utility functions
└── types/
    └── curriculum.ts        # TypeScript types
```

---

## 🧪 Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Dev server với hot reload |
| `npm run seed` | Seed database từ curriculum |
| `npm run build` | Build production |
| `npm run lint` | ESLint kiểm tra code |
| `npm run typecheck` | TypeScript type check |
| `npm run check` | Lint + typecheck + build |

---

## 📄 Giấy phép

MIT
