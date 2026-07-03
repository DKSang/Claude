"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE_EXPO_OUT } from "@/lib/motion";

interface WordsPullUpProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
}

export function WordsPullUp({ text, className, style, delay = 0, stagger = 0.08 }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <div ref={ref} className={className} style={style}>{text}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: EASE_EXPO_OUT,
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </div>
  );
}
