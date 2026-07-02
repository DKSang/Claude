# HowToUseSection Specification

## Overview
- **Target file:** `src/components/HowToUseSection.tsx`
- **Interaction model:** Click-driven tabs

## DOM Structure
```
<section class="u-section"> (bg: #ffffff)
  <div class="u-container">
    <h2>How you can use Claude</h2> (centered)
    <div class="tab_menu_wrap"> (tab bar)
      <div class="tab_menu_inner">
        <button role="tab" aria-selected="true">Tasks</button>
        <button role="tab">Learn</button>
        <button role="tab">Code</button>
        <button role="tab">Research</button>
        <button role="tab">Analyze</button>
        <button role="tab">Create</button>
      </div>
    </div>
    <div> (content panel - changes per tab)
      <div class="artifact_column_metadata"> (dark prompt panel)
        <div class="artifact_metadata u-theme-dark-3">
          <div>Prompt</div>
          <p class="artifact_metadata_text">[prompt text per tab]</p>
        </div>
        <div class="artifact_metadata u-theme-dark-3">
          <div>Attachments</div>
          [attachment cards]
        </div>
      </div>
      <div> (response/artifact area)
        [chat UI mockup or file tree display]
      </div>
    </div>
    <div> (Delegate tasks section)
      <h3>Delegate tasks</h3>
      <p>Go from answers to action...</p>
      <a href="/product/cowork">Explore Cowork</a>
    </div>
  </div>
</section>
```

## Computed Styles (exact values)

### Section
- background: #ffffff
- Section spacing: ~8rem top/bottom

### Container
- max-width: 1440px
- margin: 0 auto

### H2 Heading
- font-size: 52px
- font-weight: 500
- font-family: "Anthropic Serif"
- line-height: 62.4px (1.2)
- color: #141413
- text-align: center

### Tab bar
- display: flex
- justify-content: center
- gap: implicit

### Tab buttons
- font-size: 20px (responsive - actually 15px base)
- font-weight: 400
- font-family: "Anthropic Sans"
- padding: 8px 16px 8px 12px
- display: flex
- align-items: center
- gap: 8px
- Selected: color #141413 (foreground-primary)
- Unselected: color #5e5d59 (foreground-tertiary)
- No border-bottom (selected state shown by color difference only)
- cursor: pointer

### Dark prompt panel (artifact_metadata u-theme-dark-3)
- background: #1f1e1d (gray-850) or #262624 (gray-800) - dark theme
- color: #faf9f5
- border-radius: ~16px
- padding: ~24px

### Prompt label
- font-size: 11.2px
- font-weight: 500
- color: #faf9f5
- font-family: "Anthropic Sans"

### Prompt text
- font-size: 11.2px
- color: #b0aea5 (gray-400 - muted light)
- font-family: "Anthropic Sans"
- line-height: ~18px

### Attachment cards
- font-size: 11.2px
- color: #faf9f5
- Shows file name + size + type icon

### Delegate tasks heading
- font-size: 25px
- font-weight: 500
- font-family: "Anthropic Serif"
- color: #141413

### Delegate tasks paragraph
- font-size: 15px
- font-weight: 400
- font-family: "Anthropic Sans"
- line-height: 24px
- color: #5e5d59

### Explore Cowork link
- font-size: 12px
- color: #4d4c48
- text-decoration: none
- hover: color changes to #d97757

## States & Behaviors

### Tab switching (INTERACTION MODEL: click-driven)
- Click a tab button to switch content
- Selected tab: aria-selected="true", color #141413
- Unselected tabs: aria-selected="false", color #5e5d59
- Content panel updates instantly (no transition animation observed)
- The dark prompt panel shows different prompt + attachments per tab

### Per-tab content:

#### Tasks (default selected)
- Prompt: "Help me organize my Downloads folder.\nScan the contents and propose a plan:\n- Categories/folders to create\n- How files should be sorted\n- Any naming conventions to apply\n- Files to flag for review or deletion\nShow me the plan before making changes. Only proceed after I approve."
- Working folder: /Downloads
- File tree display showing Downloads/ with subfolders (Documents, Spreadsheets, Presentations, Images, Audio & Video, Archives, Duplicates)

#### Learn
- Prompt: "Design a comprehensive study guide with summaries, practice questions, and memory aids from my course materials."
- Attachments: "Study notes" (4mb, doc), "Psych 101 Syllabus" (1.2, pdf)

#### Code
- Prompt: (code-related prompt - use a representative example)
- Attachments: code files

#### Research
- Prompt: (research-related prompt)
- Attachments: research documents

#### Analyze
- Prompt: (data analysis prompt)
- Attachments: data files

#### Create
- Prompt: (creative writing prompt)
- Attachments: creative brief

### Hover states
- Tab buttons: color changes to #141413 on hover (even when unselected)

## Text Content (verbatim)

### Heading
"How you can use Claude"

### Tabs
"Tasks", "Learn", "Code", "Research", "Analyze", "Create"

### Tasks tab prompt
"Help me organize my Downloads folder.
Scan the contents and propose a plan: 
- Categories/folders to create
- How files should be sorted
- Any naming conventions to apply
- Files to flag for review or deletion
Show me the plan before making changes. Only proceed after I approve."

### Tasks file tree
```
Working folder: /Downloads
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
    └── 2024_q3-budget_v2.xlsx
```

### Delegate tasks
- Heading: "Delegate tasks"
- Paragraph: "Go from answers to action. In Cowork, Claude works with your local files and cloud-based apps to organize folders, build spreadsheets, or prepare reports. Describe the outcome, step away, and come back to completed work. You stay in control: grant access only to the files you want and approve every step."
- Link: "Explore Cowork" (href: /product/cowork)

## Assets
- Use a monospace font (Anthropic Mono / font-mono-anthropic) for the file tree display
- Use CodeIcon, BookIcon, BarChartIcon, SparkleIcon, FilesIcon, PencilIcon for tab icons

## Responsive Behavior
- Desktop (1440px): Full layout, tabs in a row, content side-by-side
- Tablet (768px): Tabs scrollable, content stacks
- Mobile (390px): Tabs in a scrollable row, single column content
- Breakpoint: ~768px

## Notes
- Use "use client" for tab state management
- The file tree display uses monospace font with tree-drawing characters (├──, └──, │)
- The dark prompt panel (u-theme-dark-3) has a dark background (#1f1e1d or similar) with light text
- For non-Tasks tabs, show a simplified prompt + attachments display (don't need full file tree for each)
- The tab content area should show a realistic Claude chat interface mockup
