"use client";

import { useProgress } from "@/hooks/useProgress";
import { QuizBlock } from "./blocks/QuizBlock";
import { CheckpointBlock } from "./blocks/CheckpointBlock";
import { FeynmanBlock } from "./blocks/FeynmanBlock";
import dynamic from "next/dynamic";
import { ReadingProgress } from "@/components/ReadingProgress";
import type { Block, Section } from "@/types/curriculum";

const MindMapBlock = dynamic(() => import("./blocks/MindMapBlock").then(m => m.MindMapBlock), { ssr: false });

interface InteractiveContentProps {
  moduleId: string;
  sections: Section[];
}

export function InteractiveContent({ moduleId, sections }: InteractiveContentProps) {
  const { progress, loading } = useProgress(moduleId);

  const sectionsRead = progress?.sectionsRead ?? [];
  const readCount = sections.filter((s) => sectionsRead.includes(s.id)).length;

  if (loading) return null;

  return (
    <>
      <ReadingProgress readCount={readCount} totalCount={sections.length} />
    </>
  );
}

export function InteractiveBlock({ block, moduleId }: { block: Block; moduleId: string }) {
  const { progress, toggleGoal, saveQuizScore, saveFeynmanScore } = useProgress(moduleId);

  if (block.type === "quiz") {
    return <QuizBlock id={block.id} question={block.question} options={block.options} moduleId={moduleId} onSaveScore={saveQuizScore} />;
  }
  if (block.type === "checkpoint") {
    return <CheckpointBlock id={block.id} goals={block.goals} completedGoals={progress?.checkpointGoals ?? []} onToggleGoal={toggleGoal} />;
  }
  if (block.type === "mindmap") {
    return <MindMapBlock id={block.id} nodes={block.nodes} edges={block.edges} />;
  }
  if (block.type === "feynman") {
    return <FeynmanBlock id={block.id} topic={block.topic} moduleId={moduleId} onSaveScore={saveFeynmanScore} />;
  }
  return null;
}
