import Link from "next/link";
import type { Module } from "@/types/curriculum";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link
      href={`/learn/${module.id}`}
      className="block"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-tertiary)",
        borderRadius: "var(--radius-large)",
        padding: "var(--space-1-5)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <div
        style={{
          fontSize: "var(--text-caption)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "var(--text-accent)",
        }}
      >
        Module {module.number}
      </div>
      <h3
        className="text-h4"
        style={{ color: "var(--fg-primary)", marginTop: "var(--space-0-5)", marginBottom: "var(--space-0-5)" }}
      >
        {module.title}
      </h3>
      <p
        style={{
          fontSize: "var(--text-body-3)",
          color: "var(--fg-tertiary)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
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
