export type InlineSpan =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "italic"; text: string }
  | { type: "code"; text: string }
  | { type: "link"; text: string; href: string };

export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { type: "paragraph"; spans: InlineSpan[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "blockquote"; variant: "tip" | "note"; spans: InlineSpan[] }
  | { type: "list"; ordered: boolean; items: InlineSpan[][] };

export interface Section {
  id: string;
  number: number;
  title: string;
  blocks: Block[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  sourceFile: string;
  sections: Section[];
}

export interface Curriculum {
  modules: Module[];
}
