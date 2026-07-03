"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Da sao chep" : "Sao chep ma"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: copied ? "var(--color-mineral)" : "var(--fg-tertiary)",
        fontSize: "var(--text-micro)",
        fontFamily: "var(--font-sans)",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        transition: "color 0.2s var(--ease-expo-out)",
        marginLeft: "auto",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Da chep" : "Sao chep"}
    </button>
  );
}
