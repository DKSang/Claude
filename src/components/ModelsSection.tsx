"use client";

import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/icons";

interface ModelCard {
  name: string;
  description: string;
  tags: string;
  href: string;
}

const models: ModelCard[] = [
  {
    name: "Fable 5",
    description:
      "Next generation intelligence for knowledge work and coding",
    tags:
      "Days-long projects\u00a0\u2022\u00a0Deep analysis\u00a0\u2022\u00a0Fewer check-ins needed",
    href: "https://www.anthropic.com/claude/fable",
  },
  {
    name: "Opus 4.8",
    description: "Powerful model for complex tasks and deep research",
    tags:
      "Docs, slides, spreadsheets\u00a0\u2022\u00a0Complex analysis\u00a0\u2022\u00a0Deep research",
    href: "https://www.anthropic.com/claude/opus",
  },
  {
    name: "Sonnet 5",
    description:
      "Capable and versatile model, designed for the work you do every day",
    tags:
      "Writing tasks\u00a0\u2022\u00a0Fast analysis\u00a0\u2022\u00a0Task automation",
    href: "https://www.anthropic.com/claude/sonnet",
  },
  {
    name: "Haiku 4.5",
    description:
      "Fastest model, a lightweight version of our most powerful AI",
    tags:
      "Quick answers\u00a0\u2022\u00a0Everyday tasks\u00a0\u2022\u00a0Web search",
    href: "https://www.anthropic.com/claude/haiku",
  },
];

function ModelCard({ model }: { model: ModelCard }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl p-8",
      )}
      style={{
        backgroundColor: "var(--anth-color-card)",
        border: "0.8px solid var(--anth-color-border)",
      }}
    >
      <h3
        className="text-[36px] font-medium leading-[1.2]"
        style={{
          fontFamily: "var(--anth-font-serif)",
          color: "var(--anth-color-text)",
        }}
      >
        {model.name}
      </h3>
      <p
        className="text-[15px] font-normal leading-[24px]"
        style={{
          fontFamily: "var(--anth-font-sans)",
          color: "var(--anth-color-text-secondary)",
        }}
      >
        {model.description}
      </p>
      <p
        className="text-[15px]"
        style={{
          fontFamily: "var(--anth-font-sans)",
          color: "var(--anth-color-text-secondary)",
        }}
      >
        {model.tags}
      </p>
      <a
        href={model.href}
        className="group/link mt-auto inline-flex items-center gap-1 text-[15px] transition-colors"
        style={{
          fontFamily: "var(--anth-font-sans)",
          color: "var(--anth-color-link)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--anth-color-link-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--anth-color-link)")
        }
      >
        Model details
        <ChevronRightIcon
          className="size-4 opacity-0 transition-opacity group-hover/link:opacity-100"
          strokeWidth={1.5}
        />
      </a>
    </div>
  );
}

export function ModelsSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--anth-color-bg)",
        paddingBlock: "var(--section-space-main)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6">
        <h2
          className="mb-12 max-w-[1012px] text-center text-[52px] font-medium leading-[1.2]"
          style={{
            fontFamily: "var(--anth-font-serif)",
            color: "var(--anth-color-text)",
          }}
        >
          Claude models
        </h2>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {models.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>

        <div className="mt-16 flex w-full items-center justify-between">
          <h3
            className="text-[25px] font-medium"
            style={{
              fontFamily: "var(--anth-font-serif)",
              color: "var(--anth-color-text)",
            }}
          >
            <a
              href="https://www.anthropic.com/models"
              className="inline-flex items-center gap-2 transition-colors hover:opacity-70"
              style={{ color: "var(--anth-color-text)" }}
            >
              Explore the latest releases
              <ChevronRightIcon className="size-5" strokeWidth={1.5} />
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
}
