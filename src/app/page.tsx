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
      <main className="flex flex-col" style={{ paddingTop: 84 }}>
        <section
          className="mx-auto w-full"
          style={{
            maxWidth: "90rem",
            padding: "12.5rem var(--container-margin) 6rem",
          }}
        >
          <div style={{ maxWidth: "42rem" }}>
            <h1
              className="text-display-2"
              style={{
                color: "var(--fg-primary)",
                lineHeight: 1.1,
                fontWeight: 500,
                marginBottom: "2.5rem",
              }}
            >
              Data Engineering Lifecycle
            </h1>
            <p
              style={{
                fontSize: "20px",
                lineHeight: "32px",
                color: "var(--fg-tertiary)",
                maxWidth: "34rem",
                fontFamily: "var(--font-sans)",
                margin: 0,
              }}
            >
              Học lý thuyết Data Engineering qua 5 giai đoạn vòng đời — từ nguồn dữ liệu đến phục vụ phân tích.
            </p>
          </div>
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
          <h2
            className="text-h1"
            style={{
              color: "var(--fg-primary)",
              fontWeight: 500,
              lineHeight: 1.2,
              marginBottom: "var(--space-3)",
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
