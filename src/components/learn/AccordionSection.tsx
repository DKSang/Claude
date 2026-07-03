"use client";

import { useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE_EXPO_OUT } from "@/lib/motion";

interface AccordionSectionProps {
  id: string;
  title: string;
  blockCount: number;
  children: ReactNode;
}

export function AccordionSection({ id, title, blockCount, children }: AccordionSectionProps) {
  const defaultOpen = blockCount <= 5;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id={id} ref={ref} style={{ scrollMarginTop: "100px" }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-0-5)",
          width: "100%",
          padding: "var(--space-0-75) 0",
          background: "transparent",
          border: "none",
          borderTop: "1px solid var(--border-tertiary)",
          cursor: "pointer",
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "var(--text-body-large-1)",
          color: "var(--fg-primary)",
          textAlign: "left",
        }}
      >
        <ChevronDown
          size={20}
          style={{
            flexShrink: 0,
            transition: "transform 0.3s var(--ease-expo-out)",
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            color: "var(--fg-tertiary)",
          }}
        />
        {title}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO_OUT }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "var(--space-1)" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
