import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  language: string;
  code: string;
}

export async function CodeBlock({ language, code }: CodeBlockProps) {
  if (!code.trim()) return null;

  const highlightedHtml = await highlightCode(code, language);

  return (
    <div
      className="mb-[var(--space-1-5)] relative"
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-tertiary)",
        borderRadius: "var(--radius-small)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", borderBottom: "1px solid var(--border-tertiary)" }}>
        {language && language !== "text" && (
          <span
            style={{
              fontSize: "var(--text-micro)",
              color: "var(--fg-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {language}
          </span>
        )}
        <CopyButton code={code} />
      </div>
      <div
        className="overflow-x-auto"
        style={{ padding: "var(--space-1)" }}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}
