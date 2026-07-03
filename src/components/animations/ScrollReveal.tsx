"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({ children, className, style }: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = children.split("");

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);
        return (
          <CharacterSpan key={i} progress={scrollYProgress} start={start} end={end}>
            {char}
          </CharacterSpan>
        );
      })}
    </p>
  );
}

function CharacterSpan({
  children,
  progress,
  start,
  end,
}: {
  children: ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
