# ProblemSolversSection Specification

## Overview
- **Target file:** `src/components/ProblemSolversSection.tsx`
- **Interaction model:** Static

## DOM Structure
```
<section class="u-section"> (bg: #f0eee6, display: flex)
  <div class="section_contain u-container u-margin-trim u-threshold-medium"> (maxWidth: 1440px)
    <h2>The AI for problem solvers</h2> (centered)
    <div> (3-column grid)
      <div>
        <h3>Break down problems together</h3>
        <p>Claude builds on your ideas, expands on your logic, and simplifies complexity one step at a time.</p>
      </div>
      <div>
        <h3>Tackle your toughest work</h3>
        <p>Claude provides expert-level collaboration on the things you need to get done—from coding a product to critical data analysis.</p>
      </div>
      <div>
        <h3>Explore what's next</h3>
        <p>Like an expert in your pocket, collaborating with Claude expands what you can build on your own or with teams.</p>
      </div>
    </div>
    [SVG use case diagram with 5 categories and sub-items]
    <div class="cta_simple_wrap"> (import memory CTA card)
      <p>Switching to Claude from another AI provider? Import your memory and pick up where you left off.</p>
      <a href="/import-memory">Start importing</a>
    </div>
  </div>
</section>
```

## Computed Styles (exact values)

### Section
- background: #f0eee6 (bg-tertiary)
- padding: 0 (section spacing via inner content)
- Section spacing: ~8rem top/bottom (var(--section-space-main))

### Container
- max-width: 1440px
- margin: 0 auto
- padding: 0 var(--container-margin)

### H2 Heading
- font-size: 52px (at 1440px, clamp(1.875rem, ..., 2.75rem) - actually appears larger)
- font-weight: 500
- font-family: "Anthropic Serif"
- line-height: 62.4px (1.2)
- color: #141413
- text-align: center
- max-width: 1012px

### H3 Sub-headings (3 columns)
- font-size: 19px
- font-weight: 500
- font-family: "Anthropic Serif"
- line-height: 22.8px (1.2)
- color: #3d3d3a (foreground-secondary-ish, gray-700)
- max-width: 367px

### Paragraphs (under each h3)
- font-size: 15px (body-3)
- font-weight: 400
- font-family: "Anthropic Sans"
- line-height: 24px (1.6)
- color: #5e5d59 (foreground-tertiary)

### SVG Use Case Diagram
- 5 category headers rendered as SVG text elements: "Software development", "Data analysis", "Content creation", "Design", "Business strategy"
- SVG text: font-size 13px, font-weight 500, font-family "Anthropic Serif", color #141413
- Each category has 5 sub-items (links):
  - Software development: Debugging, Testing, Optimization, Documentation, Reviews
  - Data analysis: Visualizations, Queries, Processing, Reports, Patterns
  - Content creation: Marketing, Education, Documentation, Translation, Editing
  - Design: Prototypes, Components, Flows, Responsive, Visuals
  - Business strategy: Growth, Markets, Campaigns, Modeling, Competition
- Some sub-items are links (with href to customer stories)
- The diagram likely has connecting lines/arrows between categories and items
- For the clone: create a 5-column grid with category headers and bullet lists of items, styled to match. The SVG visualization can be simplified to an HTML grid layout.

### Import Memory CTA Card
- background: #ffffff
- border: 0.8px solid #f0eee6
- border-radius: 32px (2rem)
- padding: 64px
- display: flex
- align-items: center
- gap: 48px
- Text: "Switching to Claude from another AI provider? Import your memory and pick up where you left off."
- Link: "Start importing" (href: /import-memory)

## States & Behaviors

### Hover states
- Sub-item links: color changes to #d97757 (text-accent) on hover
- "Start importing" link: underline appears or color changes on hover

## Text Content (verbatim)

### Main heading
"The AI for problem solvers"

### Three columns
1. "Break down problems together" / "Claude builds on your ideas, expands on your logic, and simplifies complexity one step at a time."
2. "Tackle your toughest work" / "Claude provides expert-level collaboration on the things you need to get done—from coding a product to critical data analysis."
3. "Explore what's next" / "Like an expert in your pocket, collaborating with Claude expands what you can build on your own or with teams."

### Use case categories and items
- Software development: Debugging, Testing, Optimization, Documentation, Reviews
- Data analysis: Visualizations, Queries, Processing, Reports, Patterns
- Content creation: Marketing, Education, Documentation, Translation, Editing
- Design: Prototypes, Components, Flows, Responsive, Visuals
- Business strategy: Growth, Markets, Campaigns, Modeling, Competition

### Import CTA
"Switching to Claude from another AI provider? Import your memory and pick up where you left off." + "Start importing"

## Assets
- No images needed for this section (SVG-based visualization)

## Responsive Behavior
- Desktop (1440px): 3-column grid for h3+p, 5-column grid for use cases, CTA card full-width
- Tablet (768px): 3-column may become 1-column, use cases wrap
- Mobile (390px): Everything stacks vertically, CTA card padding reduces
- Breakpoint: ~768px for column stacking

## Notes
- The section has substantial vertical padding (section-space-main: clamp(6rem, ..., 8rem))
- The SVG use case diagram is the most complex visual element - simplify to an HTML grid with connecting lines if possible, or just a clean grid layout
- Use icons from icons.tsx where appropriate (CodeIcon for Software development, BarChartIcon for Data analysis, etc.)
