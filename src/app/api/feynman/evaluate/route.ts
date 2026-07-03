import { NextRequest, NextResponse } from "next/server";
import curriculumData from "@/data/curriculum.json";
import type { Curriculum } from "@/types/curriculum";

export const dynamic = "force-dynamic";

const FREELLMAPI_URL = process.env.FREELLMAPI_URL || "http://localhost:3001";
const FREELLMAPI_KEY = process.env.FREELLMAPI_KEY || "";

interface FeynmanEvaluation {
  score: number;
  correctPoints: string[];
  missingPoints: string[];
  suggestions: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, feynmanId, explanation } = body as { moduleId: string; feynmanId: string; explanation: string };

  if (!moduleId || !feynmanId || !explanation) {
    return NextResponse.json({ error: "moduleId, feynmanId, and explanation required" }, { status: 400 });
  }

  const curriculum = curriculumData as Curriculum;
  const foundModule = curriculum.modules.find((m) => m.id === moduleId);
  if (!foundModule) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  const feynmanBlock = foundModule.sections
    .flatMap((s) => s.blocks)
    .find((b) => b.type === "feynman" && b.id === feynmanId);

  if (!feynmanBlock || feynmanBlock.type !== "feynman") {
    return NextResponse.json({ error: "Feynman block not found" }, { status: 404 });
  }

  const systemPrompt = `You are a teacher evaluating a student's explanation using the Feynman technique. The student must explain a concept in their own words as if teaching a beginner. Evaluate their explanation based on the key points below. Return ONLY valid JSON (no markdown, no code blocks) with this exact shape:
{"score": 0-100, "correctPoints": ["points they got right"], "missingPoints": ["points they missed or got wrong"], "suggestions": "one sentence on how to improve"}

Topic: ${feynmanBlock.topic}
Key points to check:
${feynmanBlock.keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}
Context: ${feynmanBlock.sectionContext}`;

  const userPrompt = `Student's explanation:\n${explanation}`;

  try {
    const response = await fetch(`${FREELLMAPI_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${FREELLMAPI_KEY}`,
      },
      body: JSON.stringify({
        model: "auto",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "AI service error", fallback: true }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let evaluation: FeynmanEvaluation;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      evaluation = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      evaluation = { score: 0, correctPoints: [], missingPoints: [], suggestions: "Could not parse AI response. Try again." };
    }

    return NextResponse.json(evaluation);
  } catch {
    return NextResponse.json({ error: "AI service unavailable", fallback: true }, { status: 503 });
  }
}
