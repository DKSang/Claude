import { Lightbulb, Info } from "lucide-react";
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
        <a href={span.href} style={{ color: "var(--text-accent)", textDecoration: "underline" }}>
          {span.text}
        </a>
      );
  }
}

interface BlockquoteBlockProps {
  variant: "tip" | "note";
  spans: InlineSpan[];
}

export function BlockquoteBlock({ variant, spans }: BlockquoteBlockProps) {
  const Icon = variant === "note" ? Info : Lightbulb;
  return (
    <div
      className="flex items-start gap-2"
      style={{
        background: "rgba(235, 201, 183, 0.12)",
        borderLeft: "3px solid var(--text-accent)",
        borderTopRightRadius: "var(--radius-small)",
        borderBottomRightRadius: "var(--radius-small)",
        padding: "var(--space-1) var(--space-1) var(--space-1) var(--space-1-5)",
        marginTop: "var(--space-1-5)",
        marginBottom: "var(--space-1-5)",
      }}
    >
      <Icon size={16} style={{ color: "var(--text-accent)", flexShrink: 0, marginTop: 4 }} />
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body-2)",
          lineHeight: "28px",
          color: "var(--fg-secondary)",
          margin: 0,
        }}
      >
        {spans.map((span, i) => (
          <Span key={i} span={span} />
        ))}
      </p>
    </div>
  );
}
