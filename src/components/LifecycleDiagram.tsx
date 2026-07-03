"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_QUART, EASE_EXPO_OUT } from "@/lib/motion";

const LIFECYCLE_STAGES = [
  { vi: "Sinh dữ liệu", en: "Generation", moduleId: "module-00-source-systems" },
  { vi: "Lưu trữ", en: "Storage", moduleId: "module-00-storage-systems" },
  { vi: "Nạp dữ liệu", en: "Ingestion", moduleId: "module-01-ingestion" },
  { vi: "Biến đổi", en: "Transformation", moduleId: "module-02-modeling" },
  { vi: "Phục vụ", en: "Serving", moduleId: "module-05-enterprise" },
] as const;

const ARROW_H = "M4 12 L20 12";
const ARROW_H_HEAD = "M16 8 L20 12 L16 16";
const ARROW_V = "M12 4 L12 20";
const ARROW_V_HEAD = "M8 16 L12 20 L16 16";

interface LifecycleDiagramProps {
  activeModuleId?: string;
}

export function LifecycleDiagram({ activeModuleId }: LifecycleDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-2 md:gap-1">
      {LIFECYCLE_STAGES.map((stage, i) => {
        const isActive = activeModuleId === stage.moduleId;
        return (
          <div key={stage.moduleId} className="flex flex-col md:flex-row items-center gap-2 md:gap-1">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE_OUT_QUART }}
              style={{
                background: isActive ? "rgba(217,119,87,0.08)" : "var(--card)",
                border: `1px solid ${isActive ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-large)",
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 120,
                position: "relative",
                transition: "border-color 0.3s var(--ease-expo-out), background 0.3s var(--ease-expo-out)",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="lifecycle-active-glow"
                  className="absolute inset-0 rounded-[var(--radius-large)] pointer-events-none"
                  style={{ boxShadow: "0 0 0 3px rgba(217,119,87,0.12)" }}
                />
              )}
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  color: "var(--fg-primary)",
                  fontWeight: 500,
                }}
              >
                {stage.vi}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--font-sans)",
                  color: "var(--fg-tertiary)",
                  marginTop: 2,
                }}
              >
                {stage.en}
              </div>
            </motion.div>

            {i < LIFECYCLE_STAGES.length - 1 && (
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="hidden md:block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: EASE_EXPO_OUT }}
              >
                <path d={ARROW_H} stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
                <path d={ARROW_H} stroke="var(--text-accent)" strokeWidth="1.5" fill="none" className="anim-flow" />
                <path d={ARROW_H_HEAD} stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
              </motion.svg>
            )}
            {i < LIFECYCLE_STAGES.length - 1 && (
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="md:hidden"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: EASE_EXPO_OUT }}
              >
                <path d={ARROW_V} stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
                <path d={ARROW_V} stroke="var(--text-accent)" strokeWidth="1.5" fill="none" className="anim-flow" />
                <path d={ARROW_V_HEAD} stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
              </motion.svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
