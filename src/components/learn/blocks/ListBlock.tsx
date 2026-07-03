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

interface ListBlockProps {
  ordered: boolean;
  items: InlineSpan[][];
}

export function ListBlock({ ordered, items }: ListBlockProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className="mb-[var(--space-1)]"
      style={{
        paddingLeft: "var(--space-1-5)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body-1)",
        lineHeight: "32px",
        color: "var(--fg-secondary)",
        listStyle: ordered ? "decimal" : "disc",
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{ marginTop: i > 0 ? "4px" : undefined }}
        >
          {item.map((span, j) => (
            <Span key={j} span={span} />
          ))}
        </li>
      ))}
    </Tag>
  );
}
