"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Curriculum } from "@/types/curriculum";

interface LearnSidebarProps {
  curriculum: Curriculum;
  currentModuleId: string;
}

function groupModules(curriculum: Curriculum) {
  const groups = new Map<number, typeof curriculum.modules>();
  for (const mod of curriculum.modules) {
    const group = groups.get(mod.number) ?? [];
    group.push(mod);
    groups.set(mod.number, group);
  }
  return Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
}

export function LearnSidebar({ curriculum, currentModuleId }: LearnSidebarProps) {
  const currentModule = curriculum.modules.find((m) => m.id === currentModuleId);
  const currentGroup = currentModule?.number ?? 0;

  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set([currentGroup]));
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("section[id]");
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [currentModuleId]);

  const groups = groupModules(curriculum);

  function toggleGroup(num: number) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  return (
    <nav
      className="hidden md:block"
      style={{
        width: 280,
        flexShrink: 0,
        position: "sticky",
        top: 56,
        height: "calc(100vh - 56px)",
        overflowY: "auto",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-tertiary)",
      }}
    >
      <div style={{ padding: "var(--space-1) 0" }}>
        {groups.map(([groupNum, modules]) => {
          const isExpanded = expandedGroups.has(groupNum);
          return (
            <div key={groupNum}>
              <button
                type="button"
                onClick={() => toggleGroup(groupNum)}
                className="flex items-center gap-1 w-full"
                style={{
                  padding: "8px 16px",
                  fontSize: "var(--text-caption)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "var(--fg-tertiary)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <ChevronDown
                  size={14}
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                  }}
                />
                Module {groupNum}
              </button>

              {isExpanded &&
                modules.map((mod) => {
                  const isActive = mod.id === currentModuleId;
                  return (
                    <div key={mod.id}>
                      <Link
                        href={`/learn/${mod.id}`}
                        className={cn("block")}
                        style={{
                          padding: "8px 16px 8px 24px",
                          fontSize: "var(--text-body-3)",
                          color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)",
                          fontWeight: isActive ? 500 : 400,
                          background: isActive ? "var(--bg-tertiary)" : "transparent",
                          borderLeft: isActive ? "3px solid var(--text-accent)" : "3px solid transparent",
                        }}
                      >
                        {mod.title}
                      </Link>

                      {isActive &&
                        currentModule &&
                        currentModule.sections.map((section) => (
                          <a
                            key={section.id}
                            href={`#${section.id}`}
                            style={{
                              display: "block",
                              padding: "6px 16px 6px 36px",
                              fontSize: "var(--text-body-3)",
                              color:
                                activeSection === section.id
                                  ? "var(--text-accent)"
                                  : "var(--fg-tertiary)",
                              fontWeight: activeSection === section.id ? 500 : 400,
                            }}
                          >
                            {section.title}
                          </a>
                        ))}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
