import { NextRequest, NextResponse } from "next/server";
import { addQuizAttempt } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, score } = body as { moduleId: string; score: number };
  if (!moduleId || typeof score !== "number") {
    return NextResponse.json({ error: "moduleId and score required" }, { status: 400 });
  }
  const updated = addQuizAttempt(moduleId, Math.round(score));
  return NextResponse.json(updated);
}
