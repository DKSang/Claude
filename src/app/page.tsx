import { LearnHeader } from "@/components/learn/LearnHeader";
import { Footer } from "@/components/Footer";
import { ModuleCard } from "@/components/ModuleCard";
import { LifecycleDiagram } from "@/components/LifecycleDiagram";
import { HeroAnimation } from "@/components/HeroAnimation";
import { VideoSection } from "@/components/VideoSection";
import { FadeIn } from "@/components/animations/FadeIn";
import { WordsPullUp } from "@/components/animations/WordsPullUp";
import { CardEntrance } from "@/components/animations/CardEntrance";
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div style={{ maxWidth: "42rem" }}>
              <WordsPullUp
                text="Data Engineering Lifecycle"
                className="text-display-2 font-serif-anthropic"
                style={{
                  color: "var(--fg-primary)",
                  lineHeight: 1.1,
                  fontWeight: 500,
                  marginBottom: "2.5rem",
                }}
              />
              <FadeIn
                delay={0.3}
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
              </FadeIn>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <FadeIn delay={0.4} style={{ width: "100%", maxWidth: 440 }}>
                <HeroAnimation />
              </FadeIn>
            </div>
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
          <FadeIn>
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
          </FadeIn>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "var(--space-1)" }}
          >
            {curriculum.modules.map((mod, i) => (
              <CardEntrance key={mod.id} delay={i * 0.06}>
                <ModuleCard module={mod} />
              </CardEntrance>
            ))}
          </div>
        </section>

        <VideoSection />
      </main>
      <Footer />
    </>
  );
}
