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
          className="mx-auto w-full flex flex-col items-center text-center"
          style={{
            maxWidth: "48rem",
            padding: "var(--space-6) var(--container-margin) var(--space-4)",
          }}
        >
          <h1
            className="text-display-2"
            style={{
              color: "var(--fg-primary)",
              lineHeight: 1.1,
              maxWidth: "36rem",
            }}
          >
            Data Engineering Lifecycle
          </h1>
          <p
            style={{
              fontSize: "var(--text-body-large-1)",
              color: "var(--fg-tertiary)",
              maxWidth: "32rem",
              marginTop: "var(--space-1-5)",
              lineHeight: 1.5,
            }}
          >
            Học lý thuyết Data Engineering qua 5 giai đoạn vòng đời — từ nguồn dữ liệu đến phục vụ phân tích.
          </p>
          <div style={{ marginTop: "var(--space-4)" }}>
            <LifecycleDiagram />
          </div>
        </section>

        <section
          className="mx-auto w-full"
          style={{
            maxWidth: "64rem",
            padding: "0 var(--container-margin) var(--section-space-main)",
          }}
        >
          <h2
            className="text-h4"
            style={{
              color: "var(--fg-primary)",
              marginBottom: "var(--space-2-5)",
              textAlign: "center",
            }}
          >
            Khóa học
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "var(--space-1)" }}
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
