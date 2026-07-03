import { LearnHeader } from "@/components/learn/LearnHeader";
import { Footer } from "@/components/Footer";
import { ModuleCard } from "@/components/ModuleCard";
import { LifecycleDiagram } from "@/components/LifecycleDiagram";
import curriculumData from "@/data/curriculum.json";
import type { Curriculum } from "@/types/curriculum";

const curriculum = curriculumData as Curriculum;

export default function Home() {
  return (
    <>
      <LearnHeader />
      <main className="flex flex-col" style={{ paddingTop: 56 }}>
        <section
          className="mx-auto w-full"
          style={{
            maxWidth: "90rem",
            padding: "var(--section-space-page-top) var(--container-margin) var(--space-4)",
          }}
        >
          <h1
            className="text-display-1"
            style={{
              color: "var(--fg-primary)",
              maxWidth: 800,
              lineHeight: 1.1,
            }}
          >
            Data Engineering Lifecycle
          </h1>
          <p
            style={{
              fontSize: "var(--text-body-large-1)",
              color: "var(--fg-tertiary)",
              maxWidth: 600,
              marginTop: "var(--space-1-5)",
            }}
          >
            Khóa học lý thuyết Data Engineering: từ nguồn dữ liệu đến phục vụ phân tích. Học qua vòng đời 5 giai đoạn với ví dụ Climate &amp; Smart Agriculture Việt Nam.
          </p>
          <div style={{ marginTop: "var(--space-4)" }}>
            <LifecycleDiagram />
          </div>
        </section>

        <section
          className="mx-auto w-full"
          style={{
            maxWidth: "90rem",
            padding: "0 var(--container-margin) var(--section-space-main)",
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "var(--space-1-5)" }}
          >
            {curriculum.modules.map((mod) => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
