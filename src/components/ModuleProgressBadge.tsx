"use client";

import { useProgress } from "@/hooks/useProgress";

interface ModuleProgressBadgeProps {
  moduleId: string;
  totalSections: number;
}

export function ModuleProgressBadge({ moduleId, totalSections }: ModuleProgressBadgeProps) {
  const { progress, loading } = useProgress(moduleId);

  if (loading || !progress) return null;

  const sectionsPct = totalSections > 0
    ? Math.round((progress.sectionsRead.length / totalSections) * 100)
    : 0;
  const quizPct = progress.quizScore;
  const overall = Math.round((sectionsPct + quizPct) / 2);

  if (overall === 0) return null;

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall / 100) * circumference;

  return (
    <svg width={36} height={36} viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
      <circle cx="18" cy="18" r={radius} fill="none" stroke="var(--bg-tertiary)" strokeWidth="3" />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke={overall >= 70 ? "var(--color-mineral)" : "var(--text-accent)"}
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
        style={{ transition: "stroke-dashoffset 0.5s var(--ease-expo-out)" }}
      />
      <text x="18" y="22" textAnchor="middle" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600" fill="var(--fg-primary)">
        {overall}%
      </text>
    </svg>
  );
}
