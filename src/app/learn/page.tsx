import { redirect } from "next/navigation";
import curriculumData from "@/data/curriculum.json";
import type { Curriculum } from "@/types/curriculum";

const curriculum = curriculumData as Curriculum;

export default function LearnPage() {
  redirect(`/learn/${curriculum.modules[0].id}`);
}
