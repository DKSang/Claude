export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-tertiary)",
        padding: "var(--space-2) var(--space-2)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: "90rem" }}
      >
        <span
          style={{
            fontSize: "var(--text-caption)",
            color: "var(--fg-tertiary)",
          }}
        >
          Data Engineering Lifecycle — Học lý thuyết DE
        </span>
        <span
          style={{
            fontSize: "var(--text-caption)",
            color: "var(--fg-tertiary)",
          }}
        >
          Built with Next.js 16 + Anthropic Design System
        </span>
      </div>
    </footer>
  );
}
