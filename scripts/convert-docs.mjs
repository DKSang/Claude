import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, "..", "..", "Fundemental-Data-Eng", "docs");
const OUTPUT_PATH = path.resolve(__dirname, "..", "src", "data", "curriculum.json");

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseInlineSpans(text) {
  const spans = [];
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }
    if (match[2]) {
      spans.push({ type: "bold", text: match[2] });
    } else if (match[4]) {
      spans.push({ type: "italic", text: match[4] });
    } else if (match[6]) {
      spans.push({ type: "code", text: match[6] });
    } else if (match[8]) {
      spans.push({ type: "link", text: match[8], href: match[9] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    spans.push({ type: "text", text: text.slice(lastIndex) });
  }

  return spans.length > 0 ? spans : [{ type: "text", text }];
}

function parseModuleMeta(content) {
  const lines = content.split(/\r?\n/);
  const h1Line = lines.find((l) => l.startsWith("# "));
  if (!h1Line) return null;

  const fullTitle = h1Line.slice(2).trim();
  const numberMatch = fullTitle.match(/B\u00e0i\s*(\d+)/i);
  const number = numberMatch ? parseInt(numberMatch[1], 10) : 0;

  let title = fullTitle.replace(/^B\u00e0i\s*[\d.]+:\s*/i, "").trim();
  let subtitle = "";

  const subtitleMatch = title.match(/^(.+?)\s*[-\u2013\u2014]\s*(.+)$/);
  if (subtitleMatch) {
    title = subtitleMatch[1].trim();
    subtitle = subtitleMatch[2].trim();
  }

  return { number, title, subtitle, fullTitle };
}

function parseBlocks(lines, startIndex) {
  const blocks = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      break;
    }

    if (line.startsWith("# ")) {
      break;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      blocks.push({ type: "heading", level: 3, text, id: slugify(text) });
      i++;
      continue;
    }

    if (line.startsWith("#### ")) {
      const text = line.slice(5).trim();
      blocks.push({ type: "heading", level: 4, text, id: slugify(text) });
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const langMatch = line.slice(3).trim();
      const language = langMatch || "text";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      let quoteText = quoteLines.join(" ");
      let variant = "tip";
      const admonitionMatch = quoteText.match(/^\[!(IMPORTANT|NOTE|WARNING|TIP)\]\s*(.*)$/i);
      if (admonitionMatch) {
        quoteText = admonitionMatch[2];
        const admonitionType = admonitionMatch[1].toUpperCase();
        if (admonitionType === "NOTE" || admonitionType === "WARNING") {
          variant = "note";
        }
      }
      const normalized = quoteText
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
      if (normalized.startsWith("luu y")) {
        variant = "note";
      }
      quoteText = quoteText.trim();
      if (quoteText) {
        blocks.push({ type: "blockquote", variant, spans: parseInlineSpans(quoteText) });
      }
      continue;
    }

    if (line.startsWith("|") && line.trim().endsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (row) =>
          row.split("|").slice(1, -1).map((cell) => cell.trim());
        const headers = parseRow(tableLines[0]);
        const rows = tableLines.slice(2).map(parseRow);
        blocks.push({ type: "table", headers, rows });
      }
      continue;
    }

    if (line.match(/^\s*[-*]\s/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\s*[-*]\s/)) {
        const itemText = lines[i].replace(/^\s*[-*]\s/, "").trim();
        items.push(parseInlineSpans(itemText));
        i++;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (line.match(/^\s*\d+\.\s/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s/)) {
        const itemText = lines[i].replace(/^\s*\d+\.\s/, "").trim();
        items.push(parseInlineSpans(itemText));
        i++;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    if (line.startsWith(":::tabs{")) {
      const propsMatch = line.match(/id="([^"]*)"/);
      const tabsId = propsMatch ? propsMatch[1] : "";
      i++;

      const panels = [];
      while (i < lines.length && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        if (lines[i].startsWith(":::tab{")) {
          const labelMatch = lines[i].match(/label="([^"]*)"/);
          const label = labelMatch ? labelMatch[1] : "";
          i++;

          const contentLines = [];
          while (i < lines.length && !lines[i].startsWith(":::")) {
            contentLines.push(lines[i]);
            i++;
          }
          i++;

          const contentText = contentLines.join(" ").trim();
          panels.push({ label, spans: parseInlineSpans(contentText) });
        } else if (lines[i].trim() === "") {
          i++;
        } else {
          break;
        }
      }

      if (panels.length > 0) {
        blocks.push({ type: "tabs", id: tabsId, panels });
      }
      continue;
    }

    if (line.startsWith(":::quiz{")) {
      const idMatch = line.match(/id="([^"]*)"/);
      const qMatch = line.match(/question="([^"]*)"/);
      const quizId = idMatch ? idMatch[1] : "";
      const question = qMatch ? qMatch[1] : "";
      i++;

      const options = [];
      while (
        i < lines.length &&
        !lines[i].startsWith(":::tabs{") &&
        !lines[i].startsWith(":::quiz{") &&
        !lines[i].startsWith(":::checkpoint{") &&
        !lines[i].startsWith("## ") &&
        !lines[i].startsWith("# ")
      ) {
        const optLine = lines[i];
        if (optLine.match(/^\s*-\s*\[[ xX]\]/)) {
          const correct = /^\s*-\s*\[[xX]\]/.test(optLine);
          const rest = optLine.replace(/^\s*-\s*\[[ xX]\]\s*/, "").trim();
          const parts = rest.split(/\s+[\u2014\u2013-]\s+/);
          const text = parts[0] || rest;
          const explanation = parts.length > 1 ? parts.slice(1).join(" - ") : "";
          options.push({ text, correct, explanation });
          i++;
        } else if (optLine.trim() === ":::") {
          i++;
          break;
        } else if (optLine.trim() === "") {
          i++;
        } else {
          break;
        }
      }

      if (options.length > 0) {
        blocks.push({ type: "quiz", id: quizId, question, options });
      }
      continue;
    }

    if (line.startsWith(":::checkpoint{")) {
      const cpMatch = line.match(/id="([^"]*)"/);
      const cpId = cpMatch ? cpMatch[1] : "";
      i++;

      const goals = [];
      while (
        i < lines.length &&
        !lines[i].startsWith(":::tabs{") &&
        !lines[i].startsWith(":::quiz{") &&
        !lines[i].startsWith(":::checkpoint{") &&
        !lines[i].startsWith("## ") &&
        !lines[i].startsWith("# ")
      ) {
        const goalLine = lines[i];
        if (goalLine.trim() === ":::") {
          i++;
          break;
        }
        const goalMatch = goalLine.match(
          /^\s*-\s*goal:\s*"([^"]*)"\s*\|\s*section:\s*(.+)$/
        );
        if (goalMatch) {
          goals.push({ label: goalMatch[1], sectionId: goalMatch[2].trim() });
        }
        i++;
      }

      if (goals.length > 0) {
        blocks.push({ type: "checkpoint", id: cpId, goals });
      }
      continue;
    }

    if (line.startsWith(":::mindmap{")) {
      const mmMatch = line.match(/id="([^"]*)"/);
      const mmId = mmMatch ? mmMatch[1] : "";
      i++;

      const nodes = [];
      const edges = [];
      while (i < lines.length && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith(":::quiz{") && !lines[i].startsWith(":::checkpoint{") && !lines[i].startsWith(":::mindmap{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        const directiveLine = lines[i];
        if (directiveLine.trim() === ":::") {
          i++;
          break;
        }
        const nodeMatch = directiveLine.match(/^\s*-\s*node:\s*(\S+)\s*\|\s*"([^"]*)"\s*\|\s*(concept|tool|stage)\s*$/);
        if (nodeMatch) {
          nodes.push({ id: nodeMatch[1], label: nodeMatch[2], nodeType: nodeMatch[3] });
          i++;
          continue;
        }
        const edgeMatch = directiveLine.match(/^\s*-\s*edge:\s*(\S+)\s*->\s*(\S+)\s*\|\s*"([^"]*)"\s*$/);
        if (edgeMatch) {
          edges.push({ from: edgeMatch[1], to: edgeMatch[2], label: edgeMatch[3] });
          i++;
          continue;
        }
        i++;
      }

      if (nodes.length > 0) {
        blocks.push({ type: "mindmap", id: mmId, nodes, edges });
      }
      continue;
    }

    if (line.startsWith(":::feynman{")) {
      const feyIdMatch = line.match(/id="([^"]*)"/);
      const feyTopicMatch = line.match(/topic="([^"]*)"/);
      const feyId = feyIdMatch ? feyIdMatch[1] : "";
      const feyTopic = feyTopicMatch ? feyTopicMatch[1] : "";
      i++;

      const keyPoints = [];
      let sectionContext = "";

      while (i < lines.length && !lines[i].startsWith(":::feynman{") && !lines[i].startsWith(":::tabs{") && !lines[i].startsWith(":::quiz{") && !lines[i].startsWith(":::checkpoint{") && !lines[i].startsWith(":::mindmap{") && !lines[i].startsWith("## ") && !lines[i].startsWith("# ")) {
        const subLine = lines[i];

        if (subLine.trim() === "::: keypoints" || subLine.trim() === ":::keypoints") {
          i++;
          while (i < lines.length && lines[i].trim() !== ":::") {
            const kpLine = lines[i].trim();
            if (kpLine.startsWith("- ")) {
              keyPoints.push(kpLine.slice(2));
            } else if (kpLine) {
              keyPoints.push(kpLine);
            }
            i++;
          }
          i++;
          continue;
        }

        if (subLine.trim() === "::: context" || subLine.trim() === ":::context") {
          i++;
          const ctxLines = [];
          while (i < lines.length && lines[i].trim() !== ":::") {
            ctxLines.push(lines[i]);
            i++;
          }
          i++;
          sectionContext = ctxLines.join(" ").trim();
          continue;
        }

        if (subLine.trim() === ":::") {
          i++;
          break;
        }

        i++;
      }

      if (keyPoints.length > 0 || sectionContext) {
        blocks.push({ type: "feynman", id: feyId, topic: feyTopic, keyPoints, sectionContext });
      }
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "" &&
           !lines[i].startsWith("#") && !lines[i].startsWith("```") &&
           !lines[i].startsWith("> ") && !lines[i].startsWith("|") &&
           !lines[i].match(/^\s*[-*]\s/) && !lines[i].match(/^\s*\d+\.\s/)) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", spans: parseInlineSpans(paraLines.join(" ")) });
    }
  }

  return { blocks, nextIndex: i };
}

function parseModuleFile(filename, content) {
  const meta = parseModuleMeta(content);
  if (!meta) return null;

  const lines = content.split(/\r?\n/);
  const sections = [];
  const moduleId = filename.replace(/\.md$/, "");

  let summaryText = "";
  let i = 0;
  while (i < lines.length && !lines[i].startsWith("## ")) {
    const line = lines[i].trim();
    if (line !== "" && !line.startsWith("#") && !line.startsWith("---") &&
        !line.startsWith("> ") && !line.startsWith("|") &&
        !line.startsWith("```") && !line.match(/^\s*[-*]\s/) &&
        !line.match(/^\s*\d+\.\s/) && !line.match(/^\*\(.*\)\*$/)) {
      if (!summaryText) {
        summaryText = line;
      }
    }
    i++;
  }
  summaryText = summaryText.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`(.+?)`/g, "$1");
  const summary = summaryText.length > 150
    ? summaryText.slice(0, 147) + "..."
    : summaryText;

  let sectionNumber = 0;
  while (i < lines.length) {
    if (lines[i].startsWith("## ")) {
      const title = lines[i].slice(3).trim();
      const sectionId = slugify(title);
      sectionNumber++;
      i++;
      const { blocks, nextIndex } = parseBlocks(lines, i);
      sections.push({ id: sectionId, number: sectionNumber, title, blocks });
      i = nextIndex;
    } else {
      i++;
    }
  }

  let finalSummary = summary;
  if (!finalSummary && sections.length > 0) {
    for (const section of sections) {
      const paraBlock = section.blocks.find((b) => b.type === "paragraph");
      if (paraBlock && paraBlock.type === "paragraph") {
        const paraText = paraBlock.spans.map((s) => s.text).join("");
        finalSummary = paraText.length > 150 ? paraText.slice(0, 147) + "..." : paraText;
        break;
      }
    }
  }
  if (!finalSummary) finalSummary = meta.title;

  return {
    id: moduleId,
    number: meta.number,
    title: meta.title,
    subtitle: meta.subtitle,
    summary: finalSummary,
    sourceFile: filename,
    sections,
  };
}

function main() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`Docs directory not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR)
    .filter((f) => f.startsWith("module-") && f.endsWith(".md"))
    .sort();

  console.log(`Found ${files.length} module files`);

  if (!files.length) {
    console.error("No module files found in docs directory");
    process.exit(1);
  }

  const modules = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
    const mod = parseModuleFile(file, content);
    if (mod) {
      const moduleId = mod.id;
      if (modules.some(m => m.id === moduleId)) {
        console.warn(`Duplicate module ID: ${moduleId} — skipping`);
        continue;
      }
      modules.push(mod);
      console.log(`  Parsed: ${file} -> ${mod.sections.length} sections`);
    } else {
      console.warn(`  Skipped: ${file} (no H1 found)`);
    }
  }

  const output = { modules };
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");
  console.log(`Written: ${OUTPUT_PATH} (${modules.length} modules)`);
}

main();
