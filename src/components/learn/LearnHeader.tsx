"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function LearnHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-20"
      style={{
        height: 56,
        background: "var(--bg-primary)",
        borderBottom: "0.8px solid var(--border-tertiary)",
      }}
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{ maxWidth: "90rem", height: "100%", padding: "0 32px" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("toggle-sidebar"));
            }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--fg-primary)" }}
            aria-label="Toggle navigation"
          >
            <Menu size={22} />
          </button>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-body-1)",
              color: "var(--fg-primary)",
              fontWeight: 500,
            }}
          >
            Data Engineering
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            style={{
              fontSize: "var(--text-body-3)",
              color: "var(--fg-secondary)",
            }}
          >
            Trang chủ
          </Link>
          <a
            href="https://github.com/DKSang/Fundemental-Data-Eng"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "var(--text-body-3)",
              color: "var(--fg-secondary)",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
