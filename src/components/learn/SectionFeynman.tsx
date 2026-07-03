"use client";

import { useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";
import { FeynmanBlock } from "./blocks/FeynmanBlock";
import type { Section } from "@/types/curriculum";

interface SectionFeynmanProps {
  moduleId: string;
  section: Section;
}

function extractKeyPoints(section: Section): string[] {
  const headings = section.blocks.filter(
    (b) => b.type === "heading" && (b.level === 3 || b.level === 4)
  );
  if (headings.length > 0) {
    return headings.map((h) => (h.type === "heading" ? h.text : ""));
  }
  const boldTerms: string[] = [];
  for (const block of section.blocks) {
    if (block.type === "paragraph") {
      for (const span of block.spans) {
        if (span.type === "bold") {
          boldTerms.push(span.text);
          if (boldTerms.length >= 5) break;
        }
      }
    }
    if (boldTerms.length >= 5) break;
  }
  return boldTerms.length > 0 ? boldTerms : [section.title];
}

function extractContext(section: Section): string {
  const paragraphs = section.blocks.filter((b) => b.type === "paragraph");
  const texts = paragraphs.slice(0, 3).map((b) => {
    if (b.type === "paragraph") {
      return b.spans.map((s) => s.text).join("");
    }
    return "";
  });
  return texts.join(" ").slice(0, 500);
}

export function SectionFeynman({ moduleId, section }: SectionFeynmanProps) {
  const { saveFeynmanScore } = useProgress(moduleId);

  const keyPoints = useMemo(() => extractKeyPoints(section), [section]);
  const sectionContext = useMemo(() => extractContext(section), [section]);

  return (
    <FeynmanBlock
      id={`auto-fey-${section.id}`}
      topic={section.title}
      moduleId={moduleId}
      onSaveScore={saveFeynmanScore}
      keyPoints={keyPoints}
      sectionContext={sectionContext}
    />
  );
}
