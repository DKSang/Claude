import type { InlineSpan } from "@/types/curriculum";

function Span({ span }: { span: InlineSpan }) {
  switch (span.type) {
    case "text":
      return <>{span.text}</>;
    case "bold":
      return <strong style={{ fontWeight: 600, color: "var(--fg-primary)" }}>{span.text}</strong>;
    case "italic":
      return <em>{span.text}</em>;
    case "code":
      return (
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875em",
            background: "var(--bg-tertiary)",
            padding: "2px 6px",
            borderRadius: "var(--radius-x-small)",
            color: "var(--text-accent)",
          }}
        >
          {span.text}
        </code>
      );
    case "link":
      return (
        <a
          href={span.href}
          style={{ color: "var(--text-accent)", textDecoration: "underline" }}
        >
          {span.text}
        </a>
      );
  }
}

interface ParagraphBlockProps {
  spans: InlineSpan[];
}

export function ParagraphBlock({ spans }: ParagraphBlockProps) {
  return (
    <p
      className="mb-[var(--space-1)]"
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body-1)",
        lineHeight: "32px",
        color: "var(--fg-secondary)",
      }}
    >
      {spans.map((span, i) => (
        <Span key={i} span={span} />
      ))}
    </p>
  );
}
