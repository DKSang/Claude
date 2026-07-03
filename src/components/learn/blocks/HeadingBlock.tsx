import { cn } from "@/lib/utils";

interface HeadingBlockProps {
  level: 2 | 3 | 4;
  text: string;
  id: string;
}

export function HeadingBlock({ level, text, id }: HeadingBlockProps) {
  const Tag = (`h${level}` as "h2" | "h3" | "h4");
  const sizeClass = level === 2 ? "text-h2" : level === 3 ? "text-h3" : "text-h4";
  const bottomBorder = level === 2 ? "border-b border-[var(--border-tertiary)] pb-2" : "";
  const marginTop = level === 2 ? "mt-[var(--space-4)]" : level === 3 ? "mt-[var(--space-3)]" : "mt-[var(--space-2-5)]";
  const marginBottom = level === 2 ? "mb-[var(--space-1-5)]" : level === 3 ? "mb-[var(--space-1)]" : "mb-[var(--space-0-75)]";

  if (!id) {
    return (
      <Tag
        className={cn(sizeClass, bottomBorder, marginTop, marginBottom)}
        style={{ scrollMarginTop: "80px", color: "var(--fg-primary)" }}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      className={cn(sizeClass, bottomBorder, marginTop, marginBottom)}
      style={{ scrollMarginTop: "80px", color: "var(--fg-primary)" }}
    >
      {text}
    </Tag>
  );
}
