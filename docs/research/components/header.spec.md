# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** Static (fixed position, dropdown menus on click)

## DOM Structure
```
<div class="nav_component"> (position: fixed, top: 0, z-index: 20)
  <div class="nav_wrap is-desktop"> (bg: #faf9f5, border-bottom: 0.8px solid #e8e6dc, height: ~85px)
    <div class="nav_contain u-container"> (display: flex, padding: 24px 0, maxWidth: 90rem)
      <nav> (left: logo + dropdown menu buttons)
        <a href="/"> <ClaudeLogoIcon /> </a>
        <button>Meet Claude <ChevronDownIcon /></button>
        <button>Platform <ChevronDownIcon /></button>
        <button>Solutions <ChevronDownIcon /></button>
        <button>Pricing</button>
        <button>Resources <ChevronDownIcon /></button>
      </nav>
      <div> (right side)
        <a href="/login">Login</a>
        <a href="/contact-sales">Contact sales</a>
        <a href="/try-claude">Try Claude</a>
      </div>
    </div>
  </div>
</div>
```

## Computed Styles (exact values)

### Nav component (fixed wrapper)
- position: fixed
- top: 0
- z-index: 20
- width: 100%

### Nav wrap (visible bar)
- background: #faf9f5
- border-bottom: 0.8px solid #e8e6dc
- height: ~85px

### Nav container
- display: flex
- justify-content: space-between
- align-items: center
- padding: 24px 0
- max-width: 90rem (1440px)
- margin: 0 auto

### Logo link
- display: flex
- SVG width: auto, height: ~28px
- color: #141413

### Nav menu buttons (Meet Claude, Platform, etc.)
- font-size: 20px (at 1440px viewport - this is responsive, actually 15px at base)
- font-weight: 400
- color: #141413
- padding: 8px 12px
- border-radius: 4px
- font-family: "Anthropic Sans"
- display: flex
- align-items: center
- gap: 8px

### Login link
- font-size: 20px (responsive)
- font-weight: 400
- color: #141413
- padding: 8px 8px 8px 12px

### Contact sales button
- font-size: 15px
- font-weight: 400
- color: #5e5d59
- border-radius: 7.5px
- display: block

### Try Claude button
- font-size: 15px
- font-weight: 400
- color: #faf9f5
- background: #c96442 (brand/clay-interactive)
- border-radius: 7.5px
- padding: 8px 16px
- display: block

## States & Behaviors

### Dropdown menus
- Click on "Meet Claude", "Platform", "Solutions", "Resources" opens mega-menu dropdown
- Mega-menu: absolute positioned, bg white, full-width panel with link columns
- For this clone: implement as simple dropdown that toggles visibility on click
- Not critical for visual clone - can be static links or simple hover dropdowns

### Hover states
- Nav buttons: subtle background change on hover (bg: rgba(0,0,0,0.04))
- Try Claude button: background darkens slightly on hover

## Text Content (verbatim)
- Logo: "Claude" (SVG wordmark)
- Nav: "Meet Claude", "Platform", "Solutions", "Pricing", "Resources"
- Right: "Login", "Contact sales", "Try Claude"

## Responsive Behavior
- Desktop (1440px): Full nav visible, 20px font size
- Tablet (768px): Nav may collapse to hamburger
- Mobile (390px): Hamburger menu, logo + Try Claude button only
- Breakpoint: ~768px for nav collapse

## Notes
- The font sizes appear as 20px because the page sets body font-size to 20px (1.25rem base). The actual responsive value uses clamp. For the clone, use 15px as base and let the body scaling handle it.
- The header is always visible (fixed), so page content needs top padding/margin to account for ~85px header height.
- Use "use client" since dropdown interactivity requires client-side state.
