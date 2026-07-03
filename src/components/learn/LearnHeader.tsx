"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function LearnHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-20"
      style={{
        height: 84,
        background: "var(--bg-primary)",
        borderBottom: "0.8px solid var(--border-tertiary)",
      }}
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{ maxWidth: "90rem", height: "100%", padding: "24px 32px" }}
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
              fontFamily: "var(--font-sans)",
              fontSize: "20px",
              color: "var(--fg-primary)",
              fontWeight: 400,
            }}
          >
            Data Engineering
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hover-underline"
            style={{
              fontSize: "17px",
              color: "var(--fg-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Trang chủ
          </Link>
          <a
            href="https://github.com/DKSang/Fundemental-Data-Eng"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline"
            style={{
              fontSize: "17px",
              color: "var(--fg-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
