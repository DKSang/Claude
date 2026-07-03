import { createHighlighter, type Highlighter } from "shiki";

const LANGUAGES = ["sql", "python", "bash", "json", "yaml", "text"] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light"],
      langs: [...LANGUAGES],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, language: string): Promise<string> {
  const lang = LANGUAGES.includes(language as (typeof LANGUAGES)[number])
    ? language
    : "text";
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, { lang, theme: "github-light" });
}
