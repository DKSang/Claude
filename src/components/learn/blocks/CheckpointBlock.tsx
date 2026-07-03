"use client";

import { Check } from "lucide-react";

interface CheckpointBlockProps {
  id: string;
  goals: { label: string; sectionId: string }[];
  completedGoals: string[];
  onToggleGoal: (goalLabel: string) => void;
}

export function CheckpointBlock({ goals, completedGoals, onToggleGoal }: CheckpointBlockProps) {
  if (goals.length === 0) return null;

  const completedCount = goals.filter((g) => completedGoals.includes(g.label)).length;
  const pct = Math.round((completedCount / goals.length) * 100);

  return (
    <div style={{
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      padding: "var(--space-1-5)",
      background: "var(--card)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--space-1)",
      }}>
        <div style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-body-large-1)",
          fontWeight: 500,
          color: "var(--fg-primary)",
        }}>
          Mục tiêu bài học
        </div>
        <span style={{
          fontSize: "14px",
          fontFamily: "var(--font-sans)",
          color: "var(--fg-tertiary)",
        }}>
          {completedCount}/{goals.length}
        </span>
      </div>

      <div style={{
        height: 4,
        background: "var(--bg-tertiary)",
        borderRadius: 2,
        marginBottom: "var(--space-1)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--text-accent)",
          borderRadius: 2,
          transition: "width 0.3s var(--ease-expo-out)",
        }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-0-5)" }}>
        {goals.map((goal, i) => {
          const done = completedGoals.includes(goal.label);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onToggleGoal(goal.label)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-0-5)",
                padding: "var(--space-0-75) var(--space-1)",
                border: `1px solid ${done ? "var(--color-mineral)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-x-small)",
                background: done ? "rgba(98,153,135,0.06)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s var(--ease-expo-out)",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                border: `1.5px solid ${done ? "var(--color-mineral)" : "var(--border-secondary)"}`,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
                background: done ? "var(--color-mineral)" : "transparent",
              }}>
                {done && <Check size={14} color="var(--card)" />}
              </span>
              <span style={{
                flex: 1,
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body-2)",
                color: done ? "var(--fg-tertiary)" : "var(--fg-secondary)",
                textDecoration: done ? "line-through" : "none",
              }}>
                {goal.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
