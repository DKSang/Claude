"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClaudeLogoIcon, ChevronDownIcon } from "@/components/icons";

const NAV_ITEMS = [
  { label: "Meet Claude", hasDropdown: true },
  { label: "Platform", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Pricing", hasDropdown: false },
  { label: "Resources", hasDropdown: true },
] as const;

const DROPDOWN_CONTENT: Record<string, string[]> = {
  "Meet Claude": ["Overview", "Capabilities", "Safety", "Research"],
  Platform: ["API", "Models", "Tools", "Documentation"],
  Solutions: ["Enterprise", "Developers", "Education", "Healthcare"],
  Resources: ["Blog", "Help Center", "Community", "Status"],
};

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const handleNavClick = useCallback(
    (label: string, hasDropdown: boolean) => {
      if (!hasDropdown) {
        setOpenDropdown(null);
        return;
      }
      setOpenDropdown((prev) => (prev === label ? null : label));
    },
    []
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-20"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderBottom: "0.8px solid var(--border-tertiary)",
      }}
    >
      <div
        className="mx-auto flex w-full max-w-[90rem] items-center justify-between"
        style={{ padding: "24px 32px" }}
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Home">
            <ClaudeLogoIcon style={{ width: "28px", height: "auto" }} />
          </Link>

          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => handleNavClick(item.label, item.hasDropdown)}
                  className={cn(
                    "flex items-center gap-1 cursor-pointer border-none bg-transparent",
                    "text-[15px] font-normal leading-none whitespace-nowrap",
                    "rounded-[4px] transition-colors duration-150",
                    "hover:bg-black/[0.04]"
                  )}
                  style={{
                    padding: "8px 12px",
                    color: "var(--fg-primary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDownIcon
                      style={{ width: "14px", height: "14px" }}
                      className={cn(
                        "transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {item.hasDropdown && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border shadow-sm"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-tertiary)",
                      padding: "8px 0",
                    }}
                  >
                    {DROPDOWN_CONTENT[item.label]?.map((entry) => (
                      <Link
                        key={entry}
                        href="#"
                        className="block text-[14px] font-normal transition-colors duration-150 hover:bg-black/[0.04]"
                        style={{
                          padding: "8px 16px",
                          color: "var(--fg-primary)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {entry}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[15px] font-normal transition-colors duration-150 hover:opacity-70"
            style={{
              color: "var(--fg-primary)",
              fontFamily: "var(--font-sans)",
              padding: "8px 12px",
            }}
          >
            Login
          </Link>

          <Link
            href="/contact-sales"
            className="text-[15px] font-normal border rounded-[7.5px] transition-colors duration-150 hover:bg-black/[0.04] cursor-pointer"
            style={{
              color: "var(--fg-secondary, #5e5d59)",
              borderColor: "var(--border-tertiary)",
              padding: "8px 16px",
              fontFamily: "var(--font-sans)",
            }}
          >
            Contact sales
          </Link>

          <Link
            href="/chat"
            className="text-[15px] font-normal rounded-[7.5px] transition-opacity duration-150 hover:opacity-90 cursor-pointer"
            style={{
              color: "var(--bg-primary)",
              backgroundColor: "var(--accent-brand, #c96442)",
              padding: "8px 16px",
              fontFamily: "var(--font-sans)",
            }}
          >
            Try Claude
          </Link>
        </div>
      </div>
    </header>
  );
}
