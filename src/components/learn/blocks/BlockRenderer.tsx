import type { Block } from "@/types/curriculum";
import { HeadingBlock } from "./HeadingBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { TableBlock } from "./TableBlock";
import { CodeBlock } from "./CodeBlock";
import { BlockquoteBlock } from "./BlockquoteBlock";
import { ListBlock } from "./ListBlock";
import { ComparisonTabs } from "./ComparisonTabs";

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock level={block.level} text={block.text} id={block.id} />;
    case "paragraph":
      return <ParagraphBlock spans={block.spans} />;
    case "table":
      return <TableBlock headers={block.headers} rows={block.rows} />;
    case "code":
      return <CodeBlock language={block.language} code={block.code} />;
    case "blockquote":
      return <BlockquoteBlock variant={block.variant} spans={block.spans} />;
    case "list":
      return <ListBlock ordered={block.ordered} items={block.items} />;
    case "tabs":
      return <ComparisonTabs id={block.id} panels={block.panels} />;
    default:
      return null;
  }
}
