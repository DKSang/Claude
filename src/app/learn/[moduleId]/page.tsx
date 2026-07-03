import { notFound } from "next/navigation";
import curriculumData from "@/data/curriculum.json";
import type { Curriculum } from "@/types/curriculum";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { LearnContent } from "@/components/learn/LearnContent";

const curriculum = curriculumData as Curriculum;

export function generateStaticParams() {
  return curriculum.modules.map((mod) => ({
    moduleId: mod.id,
  }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = curriculum.modules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  return (
    <>
      <LearnSidebar curriculum={curriculum} currentModuleId={moduleId} />
      <main className="flex-1" style={{ background: "var(--bg-primary)" }}>
        <LearnContent module={currentModule} curriculum={curriculum} />
      </main>
    </>
  );
}
