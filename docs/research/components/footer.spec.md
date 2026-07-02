# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** Static (links, language selector dropdown)

## DOM Structure
```
<footer> (bg: #faf9f5)
  <div class="footer_top"> (Homepage link + prompt form)
    <a href="/">Homepage</a>
    <form>
      <textarea placeholder="How can I help you today?" />
      <button>Next</button> (submit)
    </form>
  </div>
  <div class="footer_links"> (link columns)
    <div> (Products column)
      <h4>Products</h4>
      <a>Claude</a> <a>Claude Code</a> <a>Claude Cowork</a> ...
    </div>
    <div> (Features column)
      <h4>Features</h4>
      ...
    </div>
    ... (10 columns total)
  </div>
  <div class="footer_bottom">
    <a href="anthropic.com">Anthropic</a>
    <span>© 2026 ANTHROPIC PBC</span>
    <div> (social links)
      <a>x.com</a> <a>LinkedIn</a> <a>YouTube</a> <a>Instagram</a>
    </div>
    <button>English (US)</button> (language selector)
  </div>
</footer>
```

## Computed Styles (exact values)

### Footer
- background: #faf9f5 (bg-primary, same as page)
- color: #141413
- padding: ~4rem top, ~2rem bottom
- Full width

### Footer top section
- Contains "Homepage" link and prompt form
- Prompt form same style as hero/keep-thinking prompt

### Column headers (h4)
- font-size: 12px (caption size)
- font-weight: 400
- font-family: "Anthropic Sans"
- color: #87867f (gray-500, muted)
- text-transform: none

### Column links
- font-size: 15px (body-3) or 12px
- font-weight: 400
- font-family: "Anthropic Sans"
- color: #141413 or #4d4c48
- line-height: ~28px (generous spacing between links)
- text-decoration: none

### Social links
- font-size: 12px or 15px
- color: #5e5d59 or #4d4c48
- Links: x.com, LinkedIn, YouTube, Instagram

### Copyright
- font-size: 12px
- color: #5e5d59
- Text: "© 2026 ANTHROPIC PBC"

### Anthropic link
- Links to https://www.anthropic.com/
- Text: "Anthropic"

### Language selector
- Button: "English (US)"
- font-size: 12px or 15px
- color: #5e5d59
- Has dropdown icon (ChevronDownIcon)

## States & Behaviors

### Hover states
- All links: color changes to #d97757 on hover, or underline appears
- Social links: same hover behavior

### Language selector
- Click opens dropdown with language options
- For clone: can be a static button or simple dropdown

## Text Content (verbatim)

### Footer top
- "Homepage" link
- Prompt placeholder: "How can I help you today?"
- Submit button: "Next"

### Link columns (10 total):

**Products:** Claude, Claude Code, Claude Code for Enterprise, Claude Cowork, @Claude, Claude Design, Claude Science, Claude Security, Download app, Pricing, Log in

**Features:** Claude for Chrome, Claude for Microsoft 365, Skills

**Models:** Mythos, Fable, Opus, Sonnet, Haiku

**Solutions:** AI agents, Code modernization, Coding, Customer support, Education, Enterprise, Financial services, Government, Healthcare, Legal, Life sciences, Nonprofits, Security, Small business

**Claude Platform:** Overview, Developer docs, Pricing, Ecosystem, Marketplace, Claude on AWS, Google Cloud, Microsoft Foundry, Regional compliance, Console login

**Resources:** Blog, Claude partner network, Community, Connectors, Courses, Customer stories, Engineering at Anthropic, Events, Plugins, Powered by Claude, Service partners, Tutorials, Use cases

**Company:** Anthropic, Careers, Policy, Economic Futures, Research, News, Policy on the AI Exponential, Responsible Scaling Policy, Security and compliance, Transparency

**Programs:** Startups, Research Labs

**Help and security:** Availability, Status, Support center

**Terms and policies:** Privacy policy, Responsible disclosure policy, Terms of service: Commercial, Terms of service: Consumer, Usage policy

### Footer bottom
- "Anthropic" link (href: https://www.anthropic.com/)
- "© 2026 ANTHROPIC PBC"
- Social: "x.com", "LinkedIn", "YouTube", "Instagram"
- Language: "English (US)"

## Social links (with URLs)
- x.com: https://x.com/claudeai
- LinkedIn: https://www.linkedin.com/showcase/claude/
- YouTube: https://www.youtube.com/@anthropic-ai
- Instagram: https://www.instagram.com/claudeai

## Assets
- No images needed
- Use ChevronDownIcon for language selector

## Responsive Behavior
- Desktop (1440px): 10-column grid for link columns, full footer
- Tablet (768px): Columns wrap to fewer columns (e.g., 4-5 per row)
- Mobile (390px): Single or 2-column layout, collapsed sections
- Breakpoint: ~768px for column wrapping

## Notes
- The footer is very large with 10 link columns and many links
- Use a grid layout with auto-fit columns
- The footer top has a "Homepage" link and prompt form (similar to the hero prompt)
- Keep the link text verbatim from the spec
- The footer bottom has: Anthropic link, copyright, social links, language selector
- Use "use client" if implementing language selector dropdown
