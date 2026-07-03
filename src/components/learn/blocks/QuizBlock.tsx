"use client";

import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

interface QuizBlockProps {
  id: string;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
  moduleId: string;
  onSaveScore: (score: number) => void;
}

export function QuizBlock({ question, options, onSaveScore }: QuizBlockProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function toggleOption(i: number) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function submit() {
    if (selected.size === 0) return;
    setSubmitted(true);
    const correctSelected = options.filter((_, i) => selected.has(i) && options[i].correct).length;
    const totalCorrect = options.filter((o) => o.correct).length;
    const score = Math.round((correctSelected / totalCorrect) * 100);
    onSaveScore(score);
  }

  function reset() {
    setSelected(new Set());
    setSubmitted(false);
  }

  const hasMultipleCorrect = options.filter((o) => o.correct).length > 1;
  const score = submitted
    ? Math.round(
        (options.filter((_, i) => selected.has(i) && options[i].correct).length /
          options.filter((o) => o.correct).length) * 100
      )
    : 0;

  return (
    <div style={{
      marginBottom: "var(--space-1-5)",
      border: "1px solid var(--border-tertiary)",
      borderRadius: "var(--radius-small)",
      padding: "var(--space-1-5)",
      background: "var(--card)",
    }}>
      <div style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-body-large-1)",
        fontWeight: 500,
        color: "var(--fg-primary)",
        marginBottom: "var(--space-1)",
      }}>
        {question}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-0-5)" }}>
        {options.map((opt, i) => {
          const isSelected = selected.has(i);
          const showCorrect = submitted && opt.correct;
          const showWrong = submitted && isSelected && !opt.correct;

          return (
            <button
              key={i}
              type="button"
              onClick={() => toggleOption(i)}
              disabled={submitted}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-0-5)",
                padding: "var(--space-0-75) var(--space-1)",
                border: `1px solid ${showCorrect ? "var(--color-mineral)" : showWrong ? "var(--color-error)" : isSelected ? "var(--text-accent)" : "var(--border-tertiary)"}`,
                borderRadius: "var(--radius-x-small)",
                background: showCorrect ? "rgba(98,153,135,0.08)" : showWrong ? "rgba(181,51,51,0.06)" : isSelected ? "rgba(217,119,87,0.06)" : "transparent",
                cursor: submitted ? "default" : "pointer",
                textAlign: "left",
                transition: "all 0.2s var(--ease-expo-out)",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                border: `1.5px solid ${showCorrect ? "var(--color-mineral)" : showWrong ? "var(--color-error)" : isSelected ? "var(--text-accent)" : "var(--border-secondary)"}`,
                borderRadius: hasMultipleCorrect ? 4 : "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}>
                {isSelected && !submitted && (
                  <span style={{ width: 8, height: 8, borderRadius: hasMultipleCorrect ? 2 : "50%", background: "var(--text-accent)" }} />
                )}
                {showCorrect && <Check size={14} color="var(--color-mineral)" />}
                {showWrong && <X size={14} color="var(--color-error)" />}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-2)",
                  color: "var(--fg-secondary)",
                }}>
                  {opt.text}
                </span>
                {submitted && opt.explanation && (
                  <span style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: "var(--text-body-3)",
                    color: opt.correct ? "var(--color-mineral)" : "var(--fg-tertiary)",
                    fontStyle: "italic",
                  }}>
                    {opt.explanation}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          disabled={selected.size === 0}
          style={{
            marginTop: "var(--space-1)",
            padding: "8px 16px",
            fontSize: "15px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "var(--card)",
            background: selected.size > 0 ? "var(--text-accent)" : "var(--border-secondary)",
            border: "none",
            borderRadius: "var(--radius-x-small)",
            cursor: selected.size > 0 ? "pointer" : "not-allowed",
            transition: "background 0.2s var(--ease-expo-out)",
          }}
        >
          Kiểm tra đáp án
        </button>
      ) : (
        <div style={{
          marginTop: "var(--space-1)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
        }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-body-large-1)",
            fontWeight: 500,
            color: score >= 70 ? "var(--color-mineral)" : score >= 40 ? "var(--text-accent)" : "var(--color-error)",
          }}>
            {score}%
          </span>
          <button
            type="button"
            onClick={reset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              fontSize: "14px",
              fontFamily: "var(--font-sans)",
              color: "var(--fg-secondary)",
              background: "transparent",
              border: "1px solid var(--border-tertiary)",
              borderRadius: "var(--radius-x-small)",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} />
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
}
