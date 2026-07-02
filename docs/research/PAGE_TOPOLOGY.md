# Page Topology

## Overall Structure
- Fixed header (z-index 20) overlaying all content
- Breadcrumb sub-nav (static, below header)
- Main content (5 sections, top to bottom)
- Footer (full page width)
- Floating toast notification card (fixed position)

## Sections (top to bottom)

### 1. Header (Fixed)
- **Position:** Fixed, top: 0, z-index: 20
- **z-index layer:** Above all content
- **Contains:** Logo (Claude wordmark SVG), nav menu (5 dropdown buttons), Login link, Contact sales button, Try Claude button

### 2. Breadcrumb (Static)
- "Product" breadcrumb, 21px height

### 3. Hero Section (y=0, h=977px)
- **Background:** transparent (page bg #faf9f5 shows through)
- **Layout:** Grid, padding 200px 0 96px
- **Content:** Heading + paragraph + prompt form + quick buttons + lottie animation (680x680)

### 4. Section 2: "The AI for problem solvers" (y=977, h=1890px)
- **Background:** #f0eee6 (bg-tertiary)
- **Container:** maxWidth 1440px
- **Content:** Centered heading, 3 columns with text, SVG use case diagram, import CTA card

### 5. Section 3: "How you can use Claude" (y=2867, h=1493px)
- **Background:** #ffffff
- **Content:** Centered heading, 6 tabs (click-driven), dark prompt panel with chat UI mockup, "Delegate tasks" section

### 6. Section 4: "Keep thinking with Claude" (y=4361, h=1597px)
- **Background:** #faf9f5
- **Content:** Centered heading, video (1155x650), bottom prompt section with "What problem are you up against?"

### 7. Section 5: "Claude models" (y=5957, h=2655px)
- **Background:** #f5f4ed (bg-secondary)
- **Content:** Centered heading, 4 model cards, "Explore the latest releases" heading

### 8. Footer
- **Background:** #faf9f5
- **Content:** Homepage link + prompt form, link columns (10 categories), social links, copyright, language selector

### 9. Toast Notification (Floating, Fixed)
- **Position:** Fixed, bottom area
- **Card:** 384px max width, floating notification with news carousel

## Dependencies
- Header overlays all sections (fixed positioning)
- Toast notification overlays content (fixed positioning)
- No section depends on another's state
- Sections are sequential flow content (no sticky elements within sections)
