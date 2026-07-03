"use client";

interface ReadingProgressProps {
  readCount: number;
  totalCount: number;
}

export function ReadingProgress({ readCount, totalCount }: ReadingProgressProps) {
  const pct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-0-5)",
      marginBottom: "var(--space-1)",
    }}>
      <div style={{
        flex: 1,
        height: 3,
        background: "var(--bg-tertiary)",
        borderRadius: 2,
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
      <span style={{
        fontSize: "var(--text-body-3)",
        fontFamily: "var(--font-sans)",
        color: "var(--fg-tertiary)",
      }}>
        {readCount}/{totalCount}
      </span>
    </div>
  );
}
