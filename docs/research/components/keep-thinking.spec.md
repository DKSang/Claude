# KeepThinkingSection Specification

## Overview
- **Target file:** `src/components/KeepThinkingSection.tsx`
- **Interaction model:** Static (video with play button overlay)

## DOM Structure
```
<section class="u-section"> (bg: #faf9f5)
  <div class="u-container">
    <h2>Keep thinking with Claude</h2> (centered)
    <div> (video container)
      <video autoplay loop muted>
        <source src="/videos/keep-thinking.mp4" />
      </video>
      <button>Play video</button> (overlay)
    </div>
    <div> (bottom prompt section)
      <p>There's never been a worse time to be a problem, or a better time to be a problem solver.</p>
      <h3>What problem are you up against?</h3> (or similar heading)
      <form>
        <textarea placeholder="How can I help you today?" />
        <button>Ask Claude</button>
      </form>
    </div>
  </div>
</section>
```

## Computed Styles (exact values)

### Section
- background: #faf9f5 (bg-primary)
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

### Video
- width: 1155px (at 1440px viewport, responsive)
- height: 650px
- object-fit: cover
- display: block
- border-radius: ~16px (likely rounded corners)
- The video autoplays, loops, is muted

### Play video button
- Positioned over the video (absolute, centered)
- Circular button with play icon
- Uses PlayIcon from icons.tsx
- Background: semi-transparent or white circle
- Clicking toggles video play/pause (but it autoplays, so this may be a visual element)

### Bottom subtitle
- font-size: 15px (body-3)
- font-weight: 400
- font-family: "Anthropic Sans"
- line-height: 24px
- color: #5e5d59 (foreground-tertiary)
- text-align: center

### Bottom heading
- font-size: 32px
- font-weight: 500
- font-family: "Anthropic Serif"
- color: #141413
- text-align: center

### Bottom prompt form
- Same style as hero prompt form
- textarea placeholder: "How can I help you today?"
- "Ask Claude" button (same styling as hero)

## States & Behaviors

### Video
- Autoplays on load (muted, looped)
- Play button overlay may toggle sound or pause/play

### Hover states
- Play button: scale or opacity change on hover

## Text Content (verbatim)

### Heading
"Keep thinking with Claude"

### Subtitle
"There's never been a worse time to be a problem, or a better time to be a problem solver."

### Bottom heading
"What problem are you up against?"

### Prompt
- Placeholder: "How can I help you today?"
- Button: "Ask Claude"

## Assets
- Video: `public/videos/keep-thinking.mp4` (already downloaded, 2.2MB)
- PlayIcon from icons.tsx

## Responsive Behavior
- Desktop (1440px): Video 1155x650px, centered, prompt below
- Tablet (768px): Video scales to container width, heading reduces
- Mobile (390px): Video full-width, smaller height, single column
- Breakpoint: ~768px

## Notes
- Use "use client" for video play/pause state if interactive
- The video should autoplay muted with loop - use the `<video>` element with autoPlay, muted, loop, playsInline attributes
- The bottom prompt section mirrors the hero's prompt form styling
- The section may also have a "Your curiosity's collaborator" sub-heading - include it if visible
