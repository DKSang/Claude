# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Interaction model:** Static (prompt form with textarea)

## DOM Structure
```
<section class="hero_home_wrap u-section"> (position: relative, display: flex)
  <div class="hero_home_contain u-container u-threshold-medium"> (maxWidth: 1440px, display: block)
    <div class="hero_home_layout u-grid-above"> (display: grid, gap: 32px, padding: 200px 0 96px)
      <div> (left column - text content)
        <div class="hero_home_heading_wrap">
          <h1>Meet your thinking partner</h1>
        </div>
        <div class="hero_home_text_wrap">
          <p>Tackle any big, bold, bewildering challenge with Claude.</p>
        </div>
        <form class="form_prompt_list"> (width: 480px)
          <textarea placeholder="How can I help you today?" />
          <button>Ask Claude</button>
        </form>
        <div> (3 quick action buttons)
          <button>Button Text</button> x3
        </div>
      </div>
      <div class="heroes_lottie_wrap"> (width: 680px, height: 680px)
        [Lottie/animated visual placeholder]
      </div>
    </div>
  </div>
</section>
```

## Computed Styles (exact values)

### Section
- position: relative
- display: flex
- background: transparent (page bg #faf9f5)

### Container
- max-width: 1440px
- display: block
- margin: 0 auto
- padding: 0 (gutters via parent)

### Layout grid
- display: grid
- grid-template-columns: 1fr 1fr (2-column: text + lottie)
- gap: 32px
- padding: 200px 0 96px

### H1 Heading
- font-size: 64px (clamp(2.125rem, ..., 3.25rem) at 1440px viewport)
- font-weight: 500
- font-family: "Anthropic Serif"
- line-height: 70.4px (1.1)
- color: #141413
- max-width: 664px
- text-align: start (left)

### Paragraph
- font-size: 20px (body-1: clamp(1.1875rem, ..., 1.25rem))
- font-weight: 400
- font-family: "Anthropic Sans"
- line-height: 32px (1.6)
- color: #5e5d59 (foreground-tertiary)
- max-width: 545px

### Prompt form
- width: 480px
- display: flex (implicit from layout)
- background: #ffffff or #f0eee6 (rounded container)
- border-radius: ~16px
- padding: ~16px

### Textarea
- font-size: 15px (body-3)
- font-weight: 400
- font-family: "Anthropic Sans"
- line-height: 24px
- color: #141413
- placeholder: "How can I help you today?"
- padding: 1.6px 12px
- background: transparent
- border: none
- resize: none
- width: ~329px (flexible)

### Ask Claude button
- font-size: 15px (body-3)
- font-weight: 500
- color: #faf9f5 (light text on dark bg)
- background: #141413 (primary dark)
- border-radius: 7.5px (radius-main)
- width: 133px
- height: 36px
- display: flex
- align-items: center
- justify-content: center
- gap: 8px

### Quick action buttons (3)
- font-size: 15px
- color: #4d4c48 (foreground-secondary-ish)
- border-radius: 8px
- padding: ~6px 12px
- background: #f0eee6 or transparent with border
- These are suggestion chips like "Summarize", "Brainstorm", "Code"

### Lottie container
- width: 680px
- height: 680px
- Contains an animated visual (use a placeholder gradient/animated div or static image)

## States & Behaviors

### Hover states
- Ask Claude button: background darkens to #1f1e1d on hover, transition: all 0.2s ease
- Quick action buttons: background lightens on hover, cursor: pointer

### Focus states
- Textarea: border/focus ring appears

## Text Content (verbatim)
- H1: "Meet your thinking partner"
- Paragraph: "Tackle any big, bold, bewildering challenge with Claude."
- Textarea placeholder: "How can I help you today?"
- Button: "Ask Claude"
- Quick buttons: "Summarize", "Brainstorm", "Code" (use these as representative suggestions)

## Assets
- Lottie animation: use a CSS animated gradient orb or placeholder. The original uses a Lottie file. For the clone, create an attractive animated visual using CSS (gradient + subtle animation) sized 680x680px.

## Responsive Behavior
- Desktop (1440px): 2-column grid (text left, lottie right), 64px heading
- Tablet (768px): Lottie shrinks or moves below, heading reduces to ~40px
- Mobile (390px): Single column, lottie hidden or small, heading ~34px, form full-width
- Breakpoint: layout switches to single column at ~768px

## Notes
- Use "use client" for form interactivity (textarea state)
- The heading uses clamp for responsive font sizing - use the CSS variable --text-h1 or the clamp value directly
- The hero has large top padding (200px) to account for the fixed header
