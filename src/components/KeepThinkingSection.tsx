"use client";

import { useState, useRef } from "react";
import { PlayIcon } from "@/components/icons";

export function KeepThinkingSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="w-full"
      style={{
        background: "var(--bg-primary)",
        paddingTop: "var(--section-space-main)",
        paddingBottom: "var(--section-space-main)",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1440px", paddingInline: "var(--container-margin)" }}
      >
        <h2
          className="font-serif-anthropic text-center"
          style={{
            fontSize: "clamp(1.875rem, calc(1.875rem + (2.75 - 1.875) * (100vw - 20rem) / (90rem - 20rem)), 2.75rem)",
            fontWeight: 500,
            lineHeight: 1.2,
            color: "var(--fg-primary)",
            maxWidth: "1012px",
            margin: "0 auto 64px",
          }}
        >
          Keep thinking with Claude
        </h2>

        <div
          className="relative mx-auto mb-16"
          style={{ maxWidth: "1155px" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full block"
            style={{
              aspectRatio: "1155 / 650",
              objectFit: "cover",
              borderRadius: "var(--radius-large)",
            }}
          >
            <source src="/videos/keep-thinking.mp4" type="video/mp4" />
          </video>

          <button
            onClick={togglePlay}
            className="absolute flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              cursor: "pointer",
              opacity: isPlaying ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
            aria-label="Play video"
          >
            <PlayIcon style={{ width: "24px", height: "24px", color: "#141413" }} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-6">
          <p
            className="font-sans-anthropic"
            style={{
              fontSize: "var(--text-body-3)",
              lineHeight: "24px",
              color: "var(--fg-tertiary)",
              maxWidth: "600px",
            }}
          >
            There&apos;s never been a worse time to be a problem, or a better time
            to be a problem solver.
          </p>

          <h3
            className="font-serif-anthropic"
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "var(--fg-primary)",
              lineHeight: 1.2,
            }}
          >
            What problem are you up against?
          </h3>

          <form
            className="flex items-center"
            style={{
              width: "480px",
              maxWidth: "100%",
              background: "var(--card)",
              borderRadius: "var(--radius-large)",
              border: "0.8px solid var(--border-tertiary)",
              padding: "12px 12px 12px 16px",
              gap: "12px",
            }}
          >
            <textarea
              placeholder="How can I help you today?"
              className="flex-1 resize-none border-none bg-transparent outline-none font-sans-anthropic"
              style={{
                fontSize: "var(--text-body-3)",
                lineHeight: "24px",
                color: "var(--fg-primary)",
                minHeight: "24px",
              }}
              rows={1}
            />
            <button
              type="submit"
              className="flex items-center justify-center font-sans-anthropic transition-colors"
              style={{
                fontSize: "var(--text-body-3)",
                fontWeight: 500,
                color: "var(--bg-primary)",
                background: "var(--fg-primary)",
                borderRadius: "7.5px",
                width: "133px",
                height: "36px",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Ask Claude
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
