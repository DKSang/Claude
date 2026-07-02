# ModelsSection Specification

## Overview
- **Target file:** `src/components/ModelsSection.tsx`
- **Interaction model:** Static

## DOM Structure
```
<section class="u-section u-background-secondary"> (bg: #f5f4ed)
  <div class="u-container">
    <h2>Claude models</h2> (centered)
    <div> (model cards grid)
      <div class="model-card"> x4
        <h3>[model name]</h3>
        <p>[description]</p>
        <p>[tags with bullet separators]</p>
        <a href="[link]">Model details</a>
      </div>
    </div>
    <h3>Explore the latest releases</h3> (or similar)
  </div>
</section>
```

## Computed Styles (exact values)

### Section
- background: #f5f4ed (bg-secondary)
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
- max-width: 1012px

### Model cards
- Display: grid (likely 2x2 or 4-column)
- Card background: #ffffff or transparent
- Card border-radius: ~16px
- Card padding: ~32px
- Card border: 0.8px solid #e8e6dc (if bordered)

### Model name (h3)
- font-size: 36px
- font-weight: 500
- font-family: "Anthropic Serif"
- color: #141413

### Model description
- font-size: 15px (body-3) or 17px (body-2)
- font-weight: 400
- font-family: "Anthropic Sans"
- line-height: 24px or 27px
- color: #5e5d59 (foreground-tertiary)

### Model tags (bullet-separated)
- font-size: 13px or 15px
- font-weight: 400
- font-family: "Anthropic Sans"
- color: #5e5d59 or #4d4c48
- Format: "Item 1  •  Item 2  •  Item 3" (with bullet separators)

### Model details link
- font-size: 15px (body-3)
- font-weight: 400
- font-family: "Anthropic Sans"
- color: #4d4c48 or #141413
- text-decoration: none
- hover: color changes to #d97757

### "Explore the latest releases" heading
- font-size: 25px
- font-weight: 500
- font-family: "Anthropic Serif"
- color: #141413

## States & Behaviors

### Hover states
- Model card: subtle elevation or border color change on hover
- "Model details" link: color changes to #d97757 on hover, arrow icon appears

## Per-Model Content

### Fable 5
- Name: "Fable 5"
- Description: "Next generation intelligence for knowledge work and coding"
- Tags: "Days-long projects  •  Deep analysis  •  Fewer check-ins needed"
- Link: "Model details" (href: https://www.anthropic.com/claude/fable)

### Opus 4.8
- Name: "Opus 4.8"
- Description: "Powerful model for complex tasks and deep research"
- Tags: "Docs, slides, spreadsheets  •  Complex analysis  •  Deep research"
- Link: "Model details" (href: https://www.anthropic.com/claude/opus)

### Sonnet 5
- Name: "Sonnet 5"
- Description: "Capable and versatile model, designed for the work you do every day"
- Tags: "Writing tasks  •  Fast analysis  •  Task automation"
- Link: "Model details" (href: https://www.anthropic.com/claude/sonnet)

### Haiku 4.5
- Name: "Haiku 4.5"
- Description: "Fastest model, a lightweight version of our most powerful AI"
- Tags: "Quick answers  •  Everyday tasks  •  Web search"
- Link: "Model details" (href: https://www.anthropic.com/claude/haiku)

## Bottom heading
"Explore the latest releases" (with arrow/CTA)

## Assets
- No images needed
- Use ChevronRightIcon for the "Model details" link hover state

## Responsive Behavior
- Desktop (1440px): 2x2 grid or 4-column row for model cards
- Tablet (768px): 2-column grid
- Mobile (390px): Single column, cards stack
- Breakpoint: ~768px

## Notes
- The section has u-background-secondary class (bg: #f5f4ed)
- Each model card should have consistent styling
- The "Explore the latest releases" at the bottom may have additional release cards or a link to a blog/news page
- This is the largest section (h=2655px) so it likely has more content than just the 4 cards - there may be release announcement cards below
