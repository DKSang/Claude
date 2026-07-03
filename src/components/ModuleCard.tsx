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
        transition: "border-color 0.2s var(--ease-expo-out), box-shadow 0.2s var(--ease-expo-out)",
      }}
    >
      <div
        style={{
          fontSize: "15px",
          fontFamily: "var(--font-sans)",
          color: "var(--text-accent)",
          fontWeight: 400,
          marginBottom: "var(--space-0-5)",
        }}
      >
        Module {module.number}
      </div>
      <h3
        style={{
          fontSize: "19px",
          lineHeight: 1.2,
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          color: "var(--fg-primary)",
          margin: "0 0 var(--space-0-75) 0",
        }}
      >
        {module.title}
      </h3>
      <p
        style={{
          fontSize: "17px",
          lineHeight: 1.6,
          fontFamily: "var(--font-sans)",
          color: "var(--fg-tertiary)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          margin: 0,
        }}
      >
        {module.summary || "Nội dung đang được cập nhật."}
      </p>
    </Link>
  );
}
