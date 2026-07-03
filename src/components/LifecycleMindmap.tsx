"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SubItem {
  label: string;
  x: number;
  y: number;
  r: number;
}

interface MindmapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  isMain: boolean;
  moduleId?: string;
  subItems?: SubItem[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

const MAIN_NODES: MindmapNode[] = [
  {
    id: "generation",
    label: "Generation",
    x: 250,
    y: 200,
    r: 32,
    isMain: true,
    moduleId: "module-00-source-systems",
    subItems: [
      { label: "APIs", x: 130, y: 130, r: 18 },
      { label: "Logs", x: 130, y: 230, r: 18 },
      { label: "Events", x: 200, y: 90, r: 18 },
      { label: "Files", x: 330, y: 130, r: 18 },
      { label: "Databases", x: 350, y: 260, r: 20 },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    x: 700,
    y: 200,
    r: 32,
    isMain: true,
    moduleId: "module-00-storage-systems",
    subItems: [
      { label: "Lakes", x: 620, y: 130, r: 18 },
      { label: "Warehouses", x: 780, y: 130, r: 20 },
      { label: "Lakehouse", x: 820, y: 230, r: 18 },
      { label: "Files", x: 750, y: 90, r: 18 },
      { label: "Caches", x: 620, y: 260, r: 18 },
    ],
  },
  {
    id: "ingestion",
    label: "Ingestion",
    x: 750,
    y: 500,
    r: 32,
    isMain: true,
    moduleId: "module-01-ingestion",
    subItems: [
      { label: "Batch", x: 870, y: 450, r: 18 },
      { label: "Streaming", x: 870, y: 550, r: 20 },
      { label: "CDC", x: 820, y: 620, r: 18 },
      { label: "ELT", x: 700, y: 620, r: 18 },
      { label: "Validation", x: 680, y: 400, r: 20 },
    ],
  },
  {
    id: "transformation",
    label: "Transformation",
    x: 650,
    y: 750,
    r: 32,
    isMain: true,
    moduleId: "module-02-modeling",
    subItems: [
      { label: "dbt", x: 770, y: 700, r: 18 },
      { label: "SQL", x: 770, y: 800, r: 18 },
      { label: "Python", x: 700, y: 850, r: 18 },
      { label: "Schemas", x: 580, y: 850, r: 18 },
      { label: "Quality", x: 530, y: 700, r: 18 },
    ],
  },
  {
    id: "serving",
    label: "Serving",
    x: 250,
    y: 750,
    r: 32,
    isMain: true,
    moduleId: "module-05-enterprise",
    subItems: [
      { label: "BI", x: 130, y: 700, r: 18 },
      { label: "Dashboards", x: 130, y: 800, r: 20 },
      { label: "ML", x: 200, y: 850, r: 18 },
      { label: "APIs", x: 330, y: 850, r: 18 },
      { label: "Reports", x: 370, y: 700, r: 18 },
    ],
  },
];

const CENTER = { x: 464, y: 464, r: 40 };

export function LifecycleMindmap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);

  const goToModule = (moduleId?: string) => {
    if (moduleId) router.push(`/learn/${moduleId}`);
  };

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 928, aspectRatio: "1 / 1", margin: "0 auto" }}>
      <svg viewBox="0 0 928 928" style={{ width: "100%", height: "100%" }}>
        <title>Data Engineering lifecycle mind map</title>

        {MAIN_NODES.map((node, i) => (
          <motion.line
            key={`line-center-${node.id}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={node.x}
            y2={node.y}
            stroke="var(--border-tertiary)"
            strokeWidth={1}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 0.6, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
          />
        ))}

        {MAIN_NODES.map((node) =>
          (node.subItems ?? []).map((sub, j) => (
            <motion.line
              key={`line-${node.id}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={sub.x}
              y2={sub.y}
              stroke="var(--border-tertiary)"
              strokeWidth={1}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 0.6, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + j * 0.05, ease: EASE }}
            />
          )),
        )}

        {MAIN_NODES.map((node) =>
          (node.subItems ?? []).map((sub, j) => (
            <motion.g
              key={`sub-${node.id}-${j}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + j * 0.05, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle cx={sub.x} cy={sub.y} r={sub.r} fill="var(--card)" stroke="var(--border-tertiary)" strokeWidth={1} />
              <text
                x={sub.x}
                y={sub.y + 4}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fill: "var(--fg-tertiary)",
                  pointerEvents: "none",
                }}
              >
                {sub.label}
              </text>
            </motion.g>
          )),
        )}

        {MAIN_NODES.map((node, i) => (
          <motion.g
            key={`main-${node.id}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
            role="link"
            tabIndex={0}
            aria-label={`${node.label} module`}
            onClick={() => goToModule(node.moduleId)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToModule(node.moduleId);
              }
            }}
            onMouseEnter={() => setHoveredMain(node.id)}
            onMouseLeave={() => setHoveredMain(null)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="var(--card)"
              stroke={hoveredMain === node.id ? "var(--text-accent)" : "var(--border-secondary)"}
              strokeWidth={1}
              style={{ transition: "stroke 0.2s ease" }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "13px",
                fill: "var(--fg-primary)",
                fontWeight: 500,
                pointerEvents: "none",
              }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r} fill="var(--text-accent)" />
          <text
            x={CENTER.x}
            y={CENTER.y + 5}
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "14px",
              fill: "var(--bg-primary)",
              fontWeight: 500,
              pointerEvents: "none",
            }}
          >
            DE
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
