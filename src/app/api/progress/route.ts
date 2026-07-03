import { NextRequest, NextResponse } from "next/server";
import { getAllProgress, getProgress } from "@/lib/db";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const moduleId = request.nextUrl.searchParams.get("moduleId");
  if (moduleId) {
    const progress = getProgress(moduleId);
    return NextResponse.json(progress ?? { moduleId, sectionsRead: [], checkpointGoals: [], quizScore: 0, quizAttempts: [] });
  }
  return NextResponse.json(getAllProgress());
}
