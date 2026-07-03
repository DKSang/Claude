import { NextRequest, NextResponse } from "next/server";
import { getProgress, upsertProgress } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, sectionId } = body as { moduleId: string; sectionId: string };
  if (!moduleId || !sectionId) {
    return NextResponse.json({ error: "moduleId and sectionId required" }, { status: 400 });
  }
  const existing = getProgress(moduleId);
  const sectionsRead = existing?.sectionsRead ?? [];
  if (!sectionsRead.includes(sectionId)) {
    sectionsRead.push(sectionId);
  }
  const updated = upsertProgress(moduleId, { sectionsRead });
  return NextResponse.json(updated);
}
