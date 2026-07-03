"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { EASE_OUT_QUART, EASE_EXPO_OUT } from "@/lib/motion";

const LIFECYCLE_STAGES = [
  {
    vi: "Sinh du lieu",
    en: "Generation",
    moduleId: "module-1-source-systems",
    description: "Du lieu sinh ra tu source systems — API, database, sensor, file. Giai doan nay tra loi: du lieu den tu dau, kieu gi, tan suat cap nhat ra sao.",
  },
  {
    vi: "Luu tru",
    en: "Storage",
    moduleId: "module-2-storage-systems",
    description: "Du lieu ha canh va nam lai o storage layer — data lake, lakehouse, warehouse. Bronze/Silver/Gold medallion architecture.",
  },
  {
    vi: "Nap du lieu",
    en: "Ingestion",
    moduleId: "module-3-ingestion",
    description: "Dua du lieu tu nguon ve luu tru dau tien (Bronze). Batch, micro-batch, hoac streaming. Dam bao trung thuc, co the truy vet.",
  },
  {
    vi: "Bien doi",
    en: "Transformation",
    moduleId: "module-4-modeling",
    description: "Bien doi du lieu tho thanh mo hinh phan tich — Silver/Gold layers. dbt, Trino, SQL transformations, data modeling.",
  },
  {
    vi: "Phuc vu",
    en: "Serving",
    moduleId: "module-7-enterprise",
    description: "Phuc vu du lieu cho downstream — dashboard, API, ML pipeline, ung dung. Security, governance, access patterns.",
  },
] as const;

const ARROW_H = "M4 12 L20 12";
const ARROW_H_HEAD = "M16 8 L20 12 L16 16";
const ARROW_V = "M12 4 L12 20";
const ARROW_V_HEAD = "M8 16 L12 20 L16 16";

interface LifecycleDiagramProps {
  activeModuleId?: string;
}

function StagePopover({
  stage,
  onClose,
}: {
  stage: (typeof LIFECYCLE_STAGES)[number];
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: 8,
        width: 260,
        background: "var(--card)",
        border: "1px solid var(--border-secondary)",
        borderRadius: "var(--radius-small)",
        padding: "var(--space-1)",
        boxShadow: "0 8px 24px rgba(20,20,19,0.08)",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-0-5)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 500, color: "var(--fg-primary)" }}>
            {stage.vi}
          </div>
          <div style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--fg-tertiary)" }}>
            {stage.en}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dong"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-tertiary)", padding: 0 }}
        >
          <X size={16} />
        </button>
      </div>
      <p style={{ fontSize: "14px", lineHeight: "22px", fontFamily: "var(--font-sans)", color: "var(--fg-secondary)", margin: "0 0 var(--space-0-75) 0" }}>
        {stage.description}
      </p>
      <Link
        href={`/learn/${stage.moduleId}`}
        style={{
          fontSize: "14px",
          fontFamily: "var(--font-sans)",
          color: "var(--text-accent)",
          textDecoration: "none",
          fontWeight: 500,
        }}
        className="hover-underline"
      >
        {"Hoc module nay ->"}
      </Link>
    </div>
  );
}

export function LifecycleDiagram({ activeModuleId }: LifecycleDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openPopover, setOpenPopover] = useState<number | null>(null);

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
              onClick={() => setOpenPopover(openPopover === i ? null : i)}
              style={{
                background: isActive ? "rgba(217,119,87,0.08)" : "var(--card)",
                border: `1px solid ${isActive ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-large)",
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 120,
                position: "relative",
                cursor: "pointer",
                transition: "border-color 0.3s var(--ease-expo-out), background 0.3s var(--ease-expo-out)",
              }}
            >
              {openPopover === i && (
                <StagePopover stage={stage} onClose={() => setOpenPopover(null)} />
              )}
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
