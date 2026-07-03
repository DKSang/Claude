"use client";

import { useState } from "react";
import type { InlineSpan } from "@/types/curriculum";

interface ComparisonTabsProps {
  id: string;
  panels: { label: string; spans: InlineSpan[] }[];
}

function renderSpans(spans: InlineSpan[]) {
  return spans.map((span, i) => {
    switch (span.type) {
      case "bold":
        return <strong key={i} style={{ fontWeight: 600, color: "var(--fg-primary)" }}>{span.text}</strong>;
      case "italic":
        return <em key={i}>{span.text}</em>;
      case "code":
        return (
          <code key={i} style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875em",
            background: "var(--bg-tertiary)",
            padding: "2px 6px",
            borderRadius: "var(--radius-x-small)",
            color: "var(--text-accent)",
          }}>
            {span.text}
          </code>
        );
      case "link":
        return (
          <a key={i} href={span.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-accent)", textDecoration: "underline" }}>
            {span.text}
          </a>
        );
      default:
        return <span key={i}>{span.text}</span>;
    }
  });
}

export function ComparisonTabs({ panels }: ComparisonTabsProps) {
  const [active, setActive] = useState(0);

  if (panels.length === 0) return null;

  return (
    <div style={{
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-tertiary)", background: "var(--bg-tertiary)" }}>
        {panels.map((panel, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            style={{
              padding: "10px 16px",
              fontSize: "15px",
              fontFamily: "var(--font-sans)",
              fontWeight: active === i ? 500 : 400,
              color: active === i ? "var(--fg-primary)" : "var(--fg-tertiary)",
              background: active === i ? "var(--card)" : "transparent",
              border: "none",
              borderBottom: active === i ? "2px solid var(--text-accent)" : "2px solid transparent",
              cursor: "pointer",
              transition: "color 0.2s var(--ease-expo-out), border-color 0.2s var(--ease-expo-out)",
            }}
          >
            {panel.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "var(--space-1) var(--space-1-5)" }}>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body-1)",
          lineHeight: "32px",
          color: "var(--fg-secondary)",
          margin: 0,
        }}>
          {renderSpans(panels[active].spans)}
        </p>
      </div>
    </div>
  );
}
