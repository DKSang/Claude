import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Module, Curriculum } from "@/types/curriculum";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { LifecycleDiagram } from "@/components/LifecycleDiagram";

interface LearnContentProps {
  module: Module;
  curriculum: Curriculum;
}

export function LearnContent({ module, curriculum }: LearnContentProps) {
  const moduleIndex = curriculum.modules.findIndex((m) => m.id === module.id);
  if (moduleIndex === -1) return null;
  const prevModule = moduleIndex > 0 ? curriculum.modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < curriculum.modules.length - 1 ? curriculum.modules[moduleIndex + 1] : null;

  return (
    <div className="mx-auto" style={{ maxWidth: 720, width: "100%" }}>
      <div style={{ paddingTop: "var(--space-2-5)", paddingBottom: "var(--space-5)" }}>
        <div style={{ fontSize: "var(--text-caption)", color: "var(--fg-tertiary)", marginBottom: "var(--space-1)" }}>
          Module {module.number} · {module.title}
        </div>

        <h1
          className="text-h1"
          style={{ color: "var(--fg-primary)", marginBottom: "var(--space-0-5)" }}
        >
          {module.title}
        </h1>
        {module.subtitle && (
          <p
            style={{
              fontSize: "var(--text-body-large-2)",
              color: "var(--fg-tertiary)",
              marginBottom: "var(--space-3)",
            }}
          >
            {module.subtitle}
          </p>
        )}

        <div style={{ marginBottom: "var(--space-4)" }}>
          <LifecycleDiagram activeModuleId={module.id} />
        </div>

        {module.sections.length === 0 && (
          <p style={{ color: "var(--fg-tertiary)", fontSize: "var(--text-body-2)" }}>
            Nội dung đang được cập nhật.
          </p>
        )}

        {module.sections.map((section) => (
          <section key={section.id} id={section.id} style={{ scrollMarginTop: "80px" }}>
            {section.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </section>
        ))}

        <div
          className="flex justify-between"
          style={{
            marginTop: "var(--space-5)",
            paddingTop: "var(--space-3)",
            borderTop: "1px solid var(--border-tertiary)",
          }}
        >
          {prevModule ? (
            <Link
              href={`/learn/${prevModule.id}`}
              className="flex items-center gap-2"
              style={{
                fontSize: "var(--text-body-3)",
                color: "var(--fg-secondary)",
                fontWeight: 500,
              }}
            >
              <ArrowLeft size={16} />
              Module {prevModule.number}: {prevModule.title}
            </Link>
          ) : (
            <span />
          )}
          {nextModule ? (
            <Link
              href={`/learn/${nextModule.id}`}
              className="flex items-center gap-2"
              style={{
                fontSize: "var(--text-body-3)",
                color: "var(--fg-secondary)",
                fontWeight: 500,
              }}
            >
              Module {nextModule.number}: {nextModule.title}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
