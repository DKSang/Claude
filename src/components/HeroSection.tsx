"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = ["Summarize", "Brainstorm", "Code"] as const;

export function HeroSection() {
  const [prompt, setPrompt] = useState("");

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1400px] mx-auto px-6"
      style={{ paddingTop: 200, paddingBottom: 96 }}
    >
      <div className="flex flex-col gap-8">
        <h1
          className="font-serif font-medium leading-[1.1]"
          style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            color: "var(--fg-primary)",
            maxWidth: 664,
          }}
        >
          Meet your thinking partner
        </h1>

        <p
          className="leading-[32px]"
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "var(--fg-tertiary)",
            maxWidth: 545,
          }}
        >
          Tackle any big, bold, bewildering challenge with Claude.
        </p>

        <form
          className="flex flex-col gap-3"
          style={{ width: 480, maxWidth: "100%" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className="flex items-end gap-3 rounded-2xl border border-[#e5e3db] bg-white p-3 shadow-sm"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How can I help you today?"
              rows={1}
              className="flex-1 resize-none border-none bg-transparent outline-none placeholder:text-[#a8a59b]"
              style={{
                fontSize: 15,
                lineHeight: "24px",
                color: "var(--fg-primary)",
                minHeight: 24,
              }}
            />
            <button
              type="submit"
              className={cn(
                "flex items-center justify-center gap-2 shrink-0",
                "rounded-[7.5px] text-[15px] font-medium cursor-pointer",
                "transition-opacity hover:opacity-90"
              )}
              style={{
                width: 133,
                height: 36,
                color: "#faf9f5",
                backgroundColor: "var(--fg-primary)",
              }}
            >
              Ask Claude
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                type="button"
                className={cn(
                  "rounded-lg text-[15px] cursor-pointer",
                  "transition-colors hover:bg-[#e5e3db]"
                )}
                style={{
                  padding: "6px 12px",
                  color: "var(--fg-secondary)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center">
        <div className="relative" style={{ width: 680, height: 680 }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, #ebc9b7 0%, #d97757 50%, #c4623f 100%)",
              animation: "orb-rotate 20s ease-in-out infinite",
              filter: "blur(1px)",
            }}
          />
          <div
            className="absolute inset-[10%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 60% 30%, #f0d5c4 0%, #d97757 60%, #b8533a 100%)",
              animation: "orb-pulse 8s ease-in-out infinite",
              opacity: 0.7,
            }}
          />
          <div
            className="absolute inset-[25%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #f5e1d4 0%, #ebc9b7 40%, #d97757 100%)",
              animation: "orb-drift 15s ease-in-out infinite",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 70%, rgba(235, 201, 183, 0.4) 0%, transparent 60%)",
              animation: "orb-drift 25s ease-in-out infinite reverse",
            }}
          />
        </div>
      </div>
    </section>
  );
}
