import Link from "next/link";
import type { Module } from "@/types/curriculum";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link
      href={`/learn/${module.id}`}
      className="block transition-all duration-200"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-tertiary)",
        borderRadius: "var(--radius-large)",
        padding: "var(--space-1-5)",
        transitionTimingFunction: "var(--ease-expo-out)",
      }}
    >
      <div
        style={{
          fontSize: "var(--text-caption)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "var(--text-accent)",
          fontWeight: 500,
        }}
      >
        Module {module.number}
      </div>
      <h3
        className="text-h5"
        style={{
          color: "var(--fg-primary)",
          marginTop: "var(--space-0-5)",
          marginBottom: "var(--space-0-75)",
          lineHeight: 1.3,
        }}
      >
        {module.title}
      </h3>
      <p
        style={{
          fontSize: "var(--text-body-3)",
          color: "var(--fg-tertiary)",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          margin: 0,
        }}
      >
        {module.summary}
      </p>
    </Link>
  );
}
