"use client";

import { motion } from "framer-motion";
import { EASE_EXPO_OUT, EASE_OUT_QUART } from "@/lib/motion";

const NODES = [
  { id: 0, x: 90, y: 120, label: "Gen", color: "var(--color-clay)" },
  { id: 1, x: 210, y: 70, label: "Store", color: "var(--color-mineral)" },
  { id: 2, x: 330, y: 140, label: "Ingest", color: "var(--color-sky)" },
  { id: 3, x: 280, y: 270, label: "Transform", color: "var(--color-fig)" },
  { id: 4, x: 130, y: 300, label: "Serve", color: "var(--color-olive)" },
] as const;

const PATHS: Array<{ d: string; delay: number }> = [
  { d: "M 110 120 C 150 120, 170 70, 190 70", delay: 0 },
  { d: "M 230 70 C 270 70, 290 140, 310 140", delay: 0.4 },
  { d: "M 330 160 C 340 200, 310 240, 296 256", delay: 0.8 },
  { d: "M 270 286 C 240 320, 180 320, 150 306", delay: 1.2 },
  { d: "M 130 280 C 110 240, 100 180, 92 140", delay: 1.6 },
];

const FLOATERS = [
  { x: 50, y: 200, r: 4, dur: 6 },
  { x: 380, y: 60, r: 3, dur: 7 },
  { x: 60, y: 350, r: 5, dur: 5.5 },
  { x: 400, y: 320, r: 3, dur: 8 },
  { x: 240, y: 380, r: 4, dur: 6.5 },
];

export function HeroAnimation() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1", maxWidth: 480 }}>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_EXPO_OUT }}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(217,119,87,0.10), rgba(235,201,183,0.06) 45%, transparent 70%)",
          borderRadius: "var(--radius-xx-large)",
        }}
      />

      <svg viewBox="0 0 480 400" className="relative w-full h-full" fill="none">
        {PATHS.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke="var(--border-secondary)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE_EXPO_OUT }}
          />
        ))}

        {PATHS.map((p, i) => (
          <motion.path
            key={`flow-${i}`}
            d={p.d}
            stroke="var(--text-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            className="anim-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 1.2 + i * 0.15 }}
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}

        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE_OUT_QUART }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={26}
              fill={node.color}
              opacity={0.1}
              className="anim-pulse-soft"
              style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <circle cx={node.x} cy={node.y} r={16} fill={node.color} opacity={0.16} />
            <circle
              cx={node.x}
              cy={node.y}
              r={11}
              fill="var(--card)"
              stroke={node.color}
              strokeWidth={2}
            />
            <circle cx={node.x} cy={node.y} r={4} fill={node.color} />
            <text
              x={node.x}
              y={node.y + 36}
              textAnchor="middle"
              fontFamily="var(--font-serif)"
              fontSize={12}
              fill="var(--fg-tertiary)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {FLOATERS.map((f, i) => (
          <motion.circle
            key={`f-${i}`}
            cx={f.x}
            cy={f.y}
            r={f.r}
            fill="var(--text-accent)"
            opacity={0.25}
            className="anim-float"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 1, delay: 1 + i * 0.2 }}
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
