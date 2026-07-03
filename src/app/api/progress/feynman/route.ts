import { NextRequest, NextResponse } from "next/server";
import { addFeynmanAttempt } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, score, feedback } = body as { moduleId: string; score: number; feedback: string };
  if (!moduleId || typeof score !== "number") {
    return NextResponse.json({ error: "moduleId and score required" }, { status: 400 });
  }
  const updated = addFeynmanAttempt(moduleId, Math.round(score), feedback || "");
  return NextResponse.json(updated);
}
