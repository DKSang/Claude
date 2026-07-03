"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { EASE_EXPO_OUT } from "@/lib/motion";

export function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  }

  return (
    <section
      ref={ref}
      className="mx-auto w-full"
      style={{
        maxWidth: "90rem",
        padding: "0 var(--container-margin) var(--section-space-main)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
        style={{ textAlign: "center", marginBottom: "var(--space-3)" }}
      >
        <h2
          className="text-h1"
          style={{
            color: "var(--fg-primary)",
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: "var(--space-1)",
          }}
        >
          Khám phá sâu hơn
        </h2>
        <p
          style={{
            fontSize: "20px",
            lineHeight: "32px",
            fontFamily: "var(--font-sans)",
            color: "var(--fg-tertiary)",
            maxWidth: "34rem",
            margin: "0 auto",
          }}
        >
          Mỗi module là một bước trong vòng đời dữ liệu — từ nguồn, lưu trữ, nạp, biến đổi đến phục vụ phân tích.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_EXPO_OUT }}
        style={{
          position: "relative",
          borderRadius: "var(--radius-xx-large)",
          overflow: "hidden",
          border: "1px solid var(--border-tertiary)",
          background: "var(--bg-tertiary)",
          aspectRatio: "16 / 9",
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        {isInView ? (
          <video
            ref={videoRef}
            src="/videos/keep-thinking.mp4"
            autoPlay
            loop
            muted
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "var(--bg-tertiary)" }} />
        )}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Tạm dừng video" : "Phát video"}
          style={{
            position: "absolute",
            bottom: "var(--space-1-5)",
            right: "var(--space-1-5)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "none",
            background: "rgba(20,20,19,0.55)",
            color: "#faf9f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            transition: "background 0.2s var(--ease-expo-out)",
          }}
        >
          {playing ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
        </button>
      </motion.div>
    </section>
  );
}
