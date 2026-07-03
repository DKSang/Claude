import { NextRequest, NextResponse } from "next/server";
import { getProgress, upsertProgress } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, goalLabel } = body as { moduleId: string; goalLabel: string };
  if (!moduleId || !goalLabel) {
    return NextResponse.json({ error: "moduleId and goalLabel required" }, { status: 400 });
  }
  const existing = getProgress(moduleId);
  const goals = existing?.checkpointGoals ?? [];
  const idx = goals.indexOf(goalLabel);
  if (idx >= 0) {
    goals.splice(idx, 1);
  } else {
    goals.push(goalLabel);
  }
  const updated = upsertProgress(moduleId, { checkpointGoals: goals });
  return NextResponse.json(updated);
}
