"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  XIcon,
  LinkedInIcon,
  YouTubeIcon,
  InstagramIcon,
} from "@/components/icons";

const footerColumns: { header: string; links: { label: string; href: string }[] }[] = [
  {
    header: "Products",
    links: [
      { label: "Claude", href: "/" },
      { label: "Claude Code", href: "/claude-code" },
      { label: "Claude Code for Enterprise", href: "/claude-code/enterprise" },
      { label: "Claude Cowork", href: "/claude-cowork" },
      { label: "@Claude", href: "/at-claude" },
      { label: "Claude Design", href: "/claude-design" },
      { label: "Claude Science", href: "/claude-science" },
      { label: "Claude Security", href: "/claude-security" },
      { label: "Download app", href: "/download" },
      { label: "Pricing", href: "/pricing" },
      { label: "Log in", href: "/login" },
    ],
  },
  {
    header: "Features",
    links: [
      { label: "Claude for Chrome", href: "/chrome" },
      { label: "Claude for Microsoft 365", href: "/microsoft-365" },
      { label: "Skills", href: "/skills" },
    ],
  },
  {
    header: "Models",
    links: [
      { label: "Mythos", href: "/models/mythos" },
      { label: "Fable", href: "/models/fable" },
      { label: "Opus", href: "/models/opus" },
      { label: "Sonnet", href: "/models/sonnet" },
      { label: "Haiku", href: "/models/haiku" },
    ],
  },
  {
    header: "Solutions",
    links: [
      { label: "AI agents", href: "/solutions/ai-agents" },
      { label: "Code modernization", href: "/solutions/code-modernization" },
      { label: "Coding", href: "/solutions/coding" },
      { label: "Customer support", href: "/solutions/customer-support" },
      { label: "Education", href: "/solutions/education" },
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "Financial services", href: "/solutions/financial-services" },
      { label: "Government", href: "/solutions/government" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Legal", href: "/solutions/legal" },
      { label: "Life sciences", href: "/solutions/life-sciences" },
      { label: "Nonprofits", href: "/solutions/nonprofits" },
      { label: "Security", href: "/solutions/security" },
      { label: "Small business", href: "/solutions/small-business" },
    ],
  },
  {
    header: "Claude Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Developer docs", href: "/docs" },
      { label: "Pricing", href: "/platform/pricing" },
      { label: "Ecosystem", href: "/platform/ecosystem" },
      { label: "Marketplace", href: "/platform/marketplace" },
      { label: "Claude on AWS", href: "/platform/aws" },
      { label: "Google Cloud", href: "/platform/google-cloud" },
      { label: "Microsoft Foundry", href: "/platform/microsoft-foundry" },
      { label: "Regional compliance", href: "/platform/regional-compliance" },
      { label: "Console login", href: "https://console.anthropic.com/" },
    ],
  },
  {
    header: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Claude partner network", href: "/partners" },
      { label: "Community", href: "/community" },
      { label: "Connectors", href: "/connectors" },
      { label: "Courses", href: "/courses" },
      { label: "Customer stories", href: "/customer-stories" },
      { label: "Engineering at Anthropic", href: "/engineering" },
      { label: "Events", href: "/events" },
      { label: "Plugins", href: "/plugins" },
      { label: "Powered by Claude", href: "/powered-by-claude" },
      { label: "Service partners", href: "/service-partners" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Use cases", href: "/use-cases" },
    ],
  },
  {
    header: "Company",
    links: [
      { label: "Anthropic", href: "https://www.anthropic.com/" },
      { label: "Careers", href: "https://www.anthropic.com/careers" },
      { label: "Policy", href: "/policy" },
      { label: "Economic Futures", href: "/economic-futures" },
      { label: "Research", href: "/research" },
      { label: "News", href: "/news" },
      { label: "Policy on the AI Exponential", href: "/policy/ai-exponential" },
      { label: "Responsible Scaling Policy", href: "/responsible-scaling" },
      { label: "Security and compliance", href: "/security" },
      { label: "Transparency", href: "/transparency" },
    ],
  },
  {
    header: "Programs",
    links: [
      { label: "Startups", href: "/startups" },
      { label: "Research Labs", href: "/research-labs" },
    ],
  },
  {
    header: "Help and security",
    links: [
      { label: "Availability", href: "/availability" },
      { label: "Status", href: "https://status.anthropic.com/" },
      { label: "Support center", href: "https://support.anthropic.com/" },
    ],
  },
  {
    header: "Terms and policies",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Responsible disclosure policy", href: "/responsible-disclosure" },
      { label: "Terms of service: Commercial", href: "/terms/commercial" },
      { label: "Terms of service: Consumer", href: "/terms/consumer" },
      { label: "Usage policy", href: "/usage-policy" },
    ],
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com/claudeai", icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/showcase/claude/", icon: LinkedInIcon },
  { label: "YouTube", href: "https://www.youtube.com/@anthropic-ai", icon: YouTubeIcon },
  { label: "Instagram", href: "https://www.instagram.com/claudeai", icon: InstagramIcon },
];

function LanguageSelector() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-[15px] text-[#141413] hover:text-[#d97757] transition-colors"
    >
      English (US)
      <ChevronDownIcon className="size-4" />
    </button>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#faf9f5] text-[#141413]">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-8">
        <div className="mb-12 flex flex-col gap-6">
          <Link
            href="/"
            className="text-[15px] font-medium text-[#141413] hover:text-[#d97757] transition-colors self-start"
          >
            Homepage
          </Link>
          <form className="flex w-full max-w-2xl flex-col gap-3">
            <textarea
              placeholder="How can I help you today?"
              rows={3}
              className="w-full resize-none rounded-xl border border-[#e5e4de] bg-white px-4 py-3 text-[15px] text-[#141413] placeholder:text-[#87867f] focus:outline-none focus:ring-2 focus:ring-[#d97757]/30 focus:border-[#d97757] transition-colors"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#141413] px-5 py-2 text-[14px] font-medium text-white hover:bg-[#2c2c2a] transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-10">
          {footerColumns.map((column) => (
            <div key={column.header} className="flex flex-col gap-1">
              <h3 className="mb-2 text-[12px] font-normal leading-7 text-[#87867f]">
                {column.header}
              </h3>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block text-[15px] leading-[28px] text-[#141413] transition-colors hover:text-[#d97757]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#e5e4de] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px]">
            <Link
              href="https://www.anthropic.com/"
              className="text-[#141413] hover:text-[#d97757] transition-colors"
            >
              Anthropic
            </Link>
            <span className="text-[#87867f]">&copy; 2026 ANTHROPIC PBC</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#141413] hover:text-[#d97757] transition-colors"
                >
                  <social.icon className="size-[18px]" />
                </Link>
              ))}
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
