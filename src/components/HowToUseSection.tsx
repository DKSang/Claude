"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TabId = "Tasks" | "Learn" | "Code" | "Research" | "Analyze" | "Create";

interface TabData {
  id: TabId;
  prompt: string;
  attachments?: { name: string; size: string }[];
  showFileTree?: boolean;
  fileTree?: string;
}

const tabs: TabData[] = [
  {
    id: "Tasks",
    prompt:
      "Help me organize my Downloads folder.\nScan the contents and propose a plan: \n- Categories/folders to create\n- How files should be sorted\n- Any naming conventions to apply\n- Files to flag for review or deletion\nShow me the plan before making changes. Only proceed after I approve.",
    showFileTree: true,
    fileTree: `Working folder: /Downloads
Downloads/
├── Documents/
│   ├── 2024-03-15_invoice.pdf
│   ├── 2024-03-22_invoice.pdf
│   ├── 2024-03-20_meeting-notes.txt
│   ├── resume_john-smith_2024.pdf
│   └── untitled_document.docx
├── Spreadsheets/
│   └── 2024_q3-budget_v3.xlsx
├── Presentations/
│   └── presentation-draft.pptx
├── Images/
│   ├── photo_2024-03-15_4392.jpg
│   ├── photo_2024-03-15_4393.jpg
│   ├── photo_2024-03-18_4401.heic
│   ├── screenshot_2024-03-15_finder-window.png
│   └── screenshot_2024-03-22_slack-conversation.png
├── Audio & Video/
│   ├── 2024-03-20_zoom-recording.mp4
│   └── audio_recording.m4a
├── Archives/
│   └── random_download.zip
└── Duplicates/
    ├── Document(1).pdf
    ├── Document(2).pdf
    ├── meeting-notes(1).txt
    └── 2024_q3-budget_v2.xlsx`,
  },
  {
    id: "Learn",
    prompt:
      "Design a comprehensive study guide with summaries, practice questions, and memory aids from my course materials.",
    attachments: [
      { name: "Study notes", size: "4mb" },
      { name: "Psych 101 Syllabus", size: "1.2mb" },
    ],
  },
  {
    id: "Code",
    prompt:
      "Review this function for potential edge cases and suggest improvements.",
    attachments: [{ name: "utils.ts", size: "12kb" }],
  },
  {
    id: "Research",
    prompt:
      "Summarize the key findings from these research papers on climate adaptation.",
    attachments: [
      { name: "paper1.pdf", size: "2.4mb" },
      { name: "paper2.pdf", size: "1.8mb" },
    ],
  },
  {
    id: "Analyze",
    prompt:
      "Analyze this sales data and identify trends over the last quarter.",
    attachments: [{ name: "Q3_sales.xlsx", size: "856kb" }],
  },
  {
    id: "Create",
    prompt: "Write a blog post about the future of AI in education.",
    attachments: [{ name: "outline.md", size: "4kb" }],
  },
];

function AttachmentCard({ name, size }: { name: string; size: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-3 py-2"
      style={{ backgroundColor: "#2a2927" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 1.5h5.5L13 5v9.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-13a1 1 0 011-1z"
          stroke="#b0aea5"
          strokeWidth="1.2"
        />
        <path d="M9.5 1.5V5H13" stroke="#b0aea5" strokeWidth="1.2" />
      </svg>
      <div className="flex flex-col">
        <span
          className="text-xs leading-tight"
          style={{ color: "#faf9f5" }}
        >
          {name}
        </span>
        <span
          className="text-xs leading-tight"
          style={{ color: "#b0aea5" }}
        >
          {size}
        </span>
      </div>
    </div>
  );
}

function ContentPanel({ tab }: { tab: TabData }) {
  return (
    <div
      className="w-full rounded-2xl"
      style={{ backgroundColor: "#1f1e1d", padding: "24px" }}
    >
      <p
        className="mb-1"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          color: "#faf9f5",
          fontFamily: "'Anthropic Sans', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        Prompt
      </p>
      <p
        className="whitespace-pre-wrap"
        style={{
          fontSize: "11px",
          color: "#b0aea5",
          lineHeight: "18px",
          fontFamily: "'Anthropic Sans', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {tab.prompt}
      </p>

      {tab.showFileTree && tab.fileTree && (
        <pre
          className="mt-4 overflow-x-auto whitespace-pre"
          style={{
            fontFamily:
              "'Anthropic Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "13px",
            color: "#faf9f5",
            lineHeight: "20px",
          }}
        >
          {tab.fileTree}
        </pre>
      )}

      {tab.attachments && tab.attachments.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tab.attachments.map((att) => (
            <AttachmentCard key={att.name} name={att.name} size={att.size} />
          ))}
        </div>
      )}
    </div>
  );
}

export function HowToUseSection() {
  const [activeTab, setActiveTab] = useState<TabId>("Tasks");
  const activeTabData = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "var(--section-space-main, 96px)",
        paddingBottom: "var(--section-space-main, 96px)",
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6">
        <h2
          className="mb-10 text-center"
          style={{
            fontSize: "52px",
            fontWeight: 500,
            color: "#141413",
            fontFamily:
              "'Anthropic Serif', ui-serif, Georgia, 'Times New Roman', serif",
          }}
        >
          How you can use Claude
        </h2>

        <div className="mb-6 flex flex-wrap justify-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex cursor-pointer items-center border-none bg-transparent transition-colors",
              )}
              style={{
                fontSize: "15px",
                fontWeight: 400,
                padding: "8px 16px 8px 12px",
                gap: "8px",
                color: activeTab === tab.id ? "#141413" : "#5e5d59",
                fontFamily:
                  "'Anthropic Sans', ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {tab.id}
            </button>
          ))}
        </div>

        <ContentPanel tab={activeTabData} />

        <div className="mt-16 flex flex-col items-center text-center">
          <h3
            className="mb-4"
            style={{
              fontSize: "25px",
              fontWeight: 500,
              color: "#141413",
              fontFamily:
                "'Anthropic Serif', ui-serif, Georgia, 'Times New Roman', serif",
            }}
          >
            Delegate tasks
          </h3>
          <p
            className="mb-4 max-w-2xl"
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "#5e5d59",
              fontFamily:
                "'Anthropic Sans', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Go from answers to action. In Cowork, Claude works with your local
            files and cloud-based apps to organize folders, build spreadsheets,
            or prepare reports. Describe the outcome, step away, and come back
            to completed work. You stay in control: grant access only to the
            files you want and approve every step.
          </p>
          <a
            href="/product/cowork"
            className="transition-colors"
            style={{
              fontSize: "12px",
              color: "#4d4c48",
              fontFamily:
                "'Anthropic Sans', ui-sans-serif, system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#d97757";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "#4d4c48";
            }}
          >
            Explore Cowork
          </a>
        </div>
      </div>
    </section>
  );
}
