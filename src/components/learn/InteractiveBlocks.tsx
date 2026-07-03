"use client";

import { useProgress } from "@/hooks/useProgress";
import { QuizBlock } from "./blocks/QuizBlock";
import { CheckpointBlock } from "./blocks/CheckpointBlock";
import { ReadingProgress } from "@/components/ReadingProgress";
import type { Block, Section } from "@/types/curriculum";

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
  const { progress, toggleGoal, saveQuizScore } = useProgress(moduleId);

  if (block.type === "quiz") {
    return <QuizBlock id={block.id} question={block.question} options={block.options} moduleId={moduleId} onSaveScore={saveQuizScore} />;
  }
  if (block.type === "checkpoint") {
    return <CheckpointBlock id={block.id} goals={block.goals} completedGoals={progress?.checkpointGoals ?? []} onToggleGoal={toggleGoal} />;
  }
  return null;
}
