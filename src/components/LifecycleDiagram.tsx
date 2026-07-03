"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { EASE_OUT_QUART, EASE_EXPO_OUT } from "@/lib/motion";

const LIFECYCLE_STAGES = [
  {
    vi: "Sinh dữ liệu",
    en: "Generation",
    moduleId: "module-1-source-systems",
    description: "Dữ liệu sinh ra từ source systems — API, database, sensor, file. Giai đoạn này trả lời: dữ liệu đến từ đâu, kiểu gì, tần suất cập nhật ra sao.",
  },
  {
    vi: "Lưu trữ",
    en: "Storage",
    moduleId: "module-2-storage-systems",
    description: "Dữ liệu hạ cánh và nằm lại ở storage layer — data lake, lakehouse, warehouse. Kiến trúc Bronze/Silver/Gold medallion.",
  },
  {
    vi: "Nạp dữ liệu",
    en: "Ingestion",
    moduleId: "module-3-ingestion",
    description: "Đưa dữ liệu từ nguồn về lưu trữ đầu tiên (Bronze). Batch, micro-batch, hoặc streaming. Đảm bảo trung thực, có thể truy vết.",
  },
  {
    vi: "Biến đổi",
    en: "Transformation",
    moduleId: "module-4-modeling",
    description: "Biến đổi dữ liệu thô thành mô hình phân tích — Silver/Gold layers. dbt, Trino, SQL transformations, data modeling.",
  },
  {
    vi: "Phục vụ",
    en: "Serving",
    moduleId: "module-7-enterprise",
    description: "Phục vụ dữ liệu cho downstream — dashboard, API, ML pipeline, ứng dụng. Security, governance, access patterns.",
  },
] as const;

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
          aria-label="Đóng"
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
        {"Học module này →"}
      </Link>
    </div>
  );
}

export function LifecycleDiagram({ activeModuleId }: LifecycleDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 w-full">
      {LIFECYCLE_STAGES.map((stage, i) => {
        const isActive = activeModuleId === stage.moduleId;
        return (
          <div key={stage.moduleId} className="flex flex-col md:flex-row items-center gap-3 md:gap-2">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE_OUT_QUART }}
              onClick={() => setOpenPopover(openPopover === i ? null : i)}
              style={{
                background: isActive ? "rgba(217,119,87,0.08)" : "var(--card)",
                border: `1px solid ${isActive ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-large)",
                padding: "14px 28px",
                textAlign: "center",
                minWidth: 160,
                flex: "1 1 0",
                maxWidth: 220,
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
                width="40"
                height="24"
                viewBox="0 0 40 24"
                className="hidden md:block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: EASE_EXPO_OUT }}
              >
                <path d="M4 12 L36 12" stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
                <path d="M4 12 L36 12" stroke="var(--text-accent)" strokeWidth="1.5" fill="none" className="anim-flow" />
                <path d="M32 8 L36 12 L32 16" stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
              </motion.svg>
            )}
            {i < LIFECYCLE_STAGES.length - 1 && (
              <motion.svg
                width="24"
                height="40"
                viewBox="0 0 24 40"
                className="md:hidden"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: EASE_EXPO_OUT }}
              >
                <path d="M12 4 L12 36" stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
                <path d="M12 4 L12 36" stroke="var(--text-accent)" strokeWidth="1.5" fill="none" className="anim-flow" />
                <path d="M8 32 L12 36 L16 32" stroke="var(--border-secondary)" strokeWidth="1.5" fill="none" />
              </motion.svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
