interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <div
      className="mb-[var(--space-1-5)] relative overflow-x-auto"
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-tertiary)",
        borderRadius: "var(--radius-small)",
        padding: "var(--space-1)",
      }}
    >
      {language && language !== "text" && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: "var(--text-micro)",
            color: "var(--fg-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {language}
        </span>
      )}
      <pre style={{ whiteSpace: "pre", margin: 0 }}>
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-body-3)",
            lineHeight: "24px",
            color: "var(--fg-secondary)",
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
