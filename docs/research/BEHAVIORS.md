# Behaviors

## Header (Fixed Nav)
- **Position:** Fixed at top via parent `.nav_component` (position: fixed, top: 0, z-index: 20)
- **Background:** #faf9f5 (matches page bg)
- **Border:** 0.8px solid #e8e6dc (bottom border)
- **Height:** ~85px
- **Scroll behavior:** Header remains fixed; no appearance change on scroll (same bg, no shadow)
- **Dropdown menus:** "Meet Claude", "Platform", "Solutions", "Pricing", "Resources" buttons open mega-menu dropdowns (absolute positioned, hidden by default)
- **Nav items:** 20px font, weight 400, color #141413, padding 8px 12px, borderRadius 4px
- **Right side:** "Login" link (20px), "Contact sales" button (15px, color #5e5d59, borderRadius 7.5px), "Try Claude" button (15px, color #faf9f5 on dark bg, borderRadius 7.5px)

## Sub-nav (Breadcrumb)
- "Product > Product" breadcrumb, static position, 21px height, below header
- No interactive behavior

## Toast Notification (Floating Card)
- **Position:** Fixed, appears at bottom area of viewport
- **Card:** maxWidth 384px, bg #faf9f5, border 0.8px solid #e8e6dc, borderRadius 16px, padding 16px
- **Content:** "Latest news" badge + "Claude Fable 5" heading + description + "Learn more" link + product image
- **Carousel:** Has "Next" button to cycle through news items
- **Interaction:** Click-driven carousel

## Hero Section
- **Static** - no scroll animations
- Heading "Meet your thinking partner" (64px, Anthropic Serif, weight 500)
- Paragraph "Tackle any big, bold, bewildering challenge with Claude." (20px, color #5e5d59)
- Prompt form: textarea (placeholder "How can I help you today?") + "Ask Claude" button
- 3 quick-action suggestion buttons
- Lottie animation (680x680px) on the right side
- Layout: grid, gap 32px, padding 200px 0 96px

## Section 2: "The AI for problem solvers"
- **Static** - no scroll animations
- Heading centered (52px, Anthropic Serif)
- 3 columns with h3 (19px, Anthropic Serif, color #3d3d3a) + paragraph
- SVG use case diagram with 5 categories (Software development, Data analysis, Content creation, Design, Business strategy) rendered as SVG text (13px, Anthropic Serif)
- Import memory CTA card (bg white, borderRadius 32px, padding 64px, border 0.8px solid #f0eee6)

## Section 3: "How you can use Claude"
- **INTERACTION MODEL: Click-driven tabs**
- 6 tabs: Tasks, Learn, Code, Research, Analyze, Create
- Tab style: 20px, weight 400, padding 8px 16px 8px 12px
- Selected tab: color #141413; Unselected: color #5e5d59
- Content panel: dark-themed prompt area (u-theme-dark-3) with prompt text, attachments, and response/artifact mockup
- Prompt label: 11.2px, color #faf9f5
- "Delegate tasks" section at bottom with "Explore Cowork" link
- No transition animation observed between tabs (instant switch)

## Section 4: "Keep thinking with Claude"
- Heading centered (52px, Anthropic Serif)
- Video: 1155x650px, autoplay, loop, muted, objectFit cover
- Play video button overlay
- Bottom section: "What problem are you up against?" (32px, Anthropic Serif) + prompt form
- Subtitle: "There's never been a worse time to be a problem, or a better time to be a problem solver." (15px, color #5e5d59)

## Section 5: "Claude models"
- **Static**
- Heading centered (52px, Anthropic Serif)
- 4 model cards: Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5
- Card name: 36px, Anthropic Serif, weight 500
- Each has description, tags (bullet-separated), "Model details" link
- "Explore the latest releases" heading at bottom (25px)

## Footer
- Large footer with link columns: Products, Features, Models, Solutions, Claude Platform, Resources, Company, Programs, Help and security, Terms and policies
- Column headers: 12px, weight 400, color #87867f
- Homepage link + prompt form at top
- Social links: x.com, LinkedIn, YouTube, Instagram
- Copyright: "© 2026 ANTHROPIC PBC"
- Language selector button: "English (US)"

## Global Behaviors
- No smooth scroll library (Lenis, Locomotive) detected
- No scroll-snap
- No scroll-triggered animations observed
- Body: font 20px, line-height 32px, Anthropic Sans
- Headings: Anthropic Serif
