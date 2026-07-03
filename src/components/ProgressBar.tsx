"use client";

import { useAllProgress } from "@/hooks/useProgress";

interface ProgressBarProps {
  totalModules: number;
}

export function ProgressBar({ totalModules }: ProgressBarProps) {
  const { allProgress, loading } = useAllProgress();

  const completedModules = loading ? 0 : allProgress.filter(
    (p) => p.sectionsRead.length > 0 && p.quizScore >= 70
  ).length;
  const pct = Math.round((completedModules / totalModules) * 100);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)",
      marginBottom: "var(--space-2)",
    }}>
      <div style={{
        flex: 1,
        height: 8,
        background: "var(--bg-tertiary)",
        borderRadius: 4,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--text-accent)",
          borderRadius: 4,
          transition: "width 0.5s var(--ease-expo-out)",
        }} />
      </div>
      <span style={{
        fontSize: "15px",
        fontFamily: "var(--font-sans)",
        color: "var(--fg-tertiary)",
        whiteSpace: "nowrap",
      }}>
        {completedModules}/{totalModules} module
      </span>
    </div>
  );
}
