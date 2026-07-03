"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordsPullUp({ text, className, delay = 0, stagger = 0.08 }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </div>
  );
}
