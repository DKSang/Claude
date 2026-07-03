"use client";

import { useState } from "react";
import { Loader2, Send, RotateCcw, Check, AlertCircle } from "lucide-react";

interface FeynmanBlockProps {
  id: string;
  topic: string;
  moduleId: string;
  onSaveScore: (score: number, feedback: string) => void;
}

interface Evaluation {
  score: number;
  correctPoints: string[];
  missingPoints: string[];
  suggestions: string;
}

export function FeynmanBlock({ id, topic, moduleId, onSaveScore }: FeynmanBlockProps) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (explanation.trim().length < 20) {
      setError("Hay viet it nhat 20 ky tu de giai thich.");
      return;
    }
    setLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      const res = await fetch("/api/feynman/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, feynmanId: id, explanation }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.fallback) {
          setError("Khong the ket noi AI. Thu lai sau.");
        } else {
          setError("Loi danh gia. Thu lai.");
        }
        setLoading(false);
        return;
      }

      const data: Evaluation = await res.json();
      setEvaluation(data);
      onSaveScore(data.score, data.suggestions);
    } catch {
      setError("Loi ket noi. Thu lai sau.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setExplanation("");
    setEvaluation(null);
    setError(null);
  }

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
        marginBottom: "var(--space-0-5)",
      }}>
        Kiem tra hieu biet: {topic}
      </div>
      <p style={{
        fontSize: "var(--text-body-3)",
        fontFamily: "var(--font-sans)",
        color: "var(--fg-tertiary)",
        margin: "0 0 var(--space-1) 0",
        lineHeight: "24px",
      }}>
        Giai thich chu de nay bang loi cua ban, nhu dang day cho nguoi moi bat dau. AI se danh gia ban hieu biet cua ban.
      </p>

      {!evaluation && (
        <>
          <textarea
            value={explanation}
            onChange={(e) => {
              setExplanation(e.target.value);
              if (error) setError(null);
            }}
            disabled={loading}
            placeholder="Giai thich o day..."
            style={{
              width: "100%",
              minHeight: 120,
              padding: "var(--space-1)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body-2)",
              lineHeight: "28px",
              color: "var(--fg-secondary)",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-tertiary)",
              borderRadius: "var(--radius-x-small)",
              resize: "vertical",
              outline: "none",
              opacity: loading ? 0.6 : 1,
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--text-accent)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-tertiary)"; }}
          />

          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: "var(--space-0-5)",
              fontSize: "var(--text-body-3)",
              color: "var(--color-error)",
            }}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={loading || explanation.trim().length < 20}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: "var(--space-1)",
              padding: "8px 16px",
              fontSize: "15px",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              color: "var(--card)",
              background: loading || explanation.trim().length < 20 ? "var(--border-secondary)" : "var(--text-accent)",
              border: "none",
              borderRadius: "var(--radius-x-small)",
              cursor: loading || explanation.trim().length < 20 ? "not-allowed" : "pointer",
              transition: "background 0.2s var(--ease-expo-out)",
            }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {loading ? "Dang danh gia..." : "Gui danh gia"}
          </button>
        </>
      )}

      {evaluation && (
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            marginBottom: "var(--space-1)",
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: `3px solid ${evaluation.score >= 70 ? "var(--color-mineral)" : evaluation.score >= 40 ? "var(--text-accent)" : "var(--color-error)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontSize: "20px",
              fontWeight: 500,
              color: "var(--fg-primary)",
              flexShrink: 0,
            }}>
              {evaluation.score}
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                color: "var(--fg-secondary)",
                fontWeight: 500,
              }}>
                Diem hieu biet
              </div>
              <div style={{
                fontSize: "var(--text-body-3)",
                color: "var(--fg-tertiary)",
                fontFamily: "var(--font-sans)",
              }}>
                {evaluation.score >= 70 ? "Ban hieu rat tot!" : evaluation.score >= 40 ? "Ban hieu co ban, con co the cai thien." : "Can on tap lai chu de nay."}
              </div>
            </div>
          </div>

          {evaluation.correctPoints.length > 0 && (
            <div style={{ marginBottom: "var(--space-0-75)" }}>
              <div style={{
                fontSize: "14px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--color-mineral)",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}>
                <Check size={14} /> Diem da hieu dung
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, listStyleType: "disc" }}>
                {evaluation.correctPoints.map((p, i) => (
                  <li key={i} style={{
                    fontSize: "var(--text-body-3)",
                    fontFamily: "var(--font-sans)",
                    color: "var(--fg-secondary)",
                    lineHeight: "24px",
                    marginBottom: 2,
                  }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.missingPoints.length > 0 && (
            <div style={{ marginBottom: "var(--space-0-75)" }}>
              <div style={{
                fontSize: "14px",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-accent)",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}>
                <AlertCircle size={14} /> Diem chua hoac hieu sai
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, listStyleType: "disc" }}>
                {evaluation.missingPoints.map((p, i) => (
                  <li key={i} style={{
                    fontSize: "var(--text-body-3)",
                    fontFamily: "var(--font-sans)",
                    color: "var(--fg-secondary)",
                    lineHeight: "24px",
                    marginBottom: 2,
                  }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.suggestions && (
            <div style={{
              padding: "var(--space-0-75) var(--space-1)",
              background: "var(--bg-tertiary)",
              borderRadius: "var(--radius-x-small)",
              marginBottom: "var(--space-1)",
            }}>
              <span style={{
                fontSize: "var(--text-body-3)",
                fontFamily: "var(--font-sans)",
                color: "var(--fg-tertiary)",
              }}>
                <strong style={{ fontWeight: 500, color: "var(--fg-secondary)" }}>Goi y: </strong>
                {evaluation.suggestions}
              </span>
            </div>
          )}

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
            Thu lai
          </button>
        </div>
      )}
    </div>
  );
}
