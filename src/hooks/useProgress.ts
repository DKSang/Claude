"use client";

import { useState, useEffect, useCallback } from "react";

export interface ModuleProgress {
  moduleId: string;
  sectionsRead: string[];
  checkpointGoals: string[];
  quizScore: number;
  quizAttempts: { score: number; date: string }[];
}

export function useProgress(moduleId: string) {
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/progress?moduleId=${moduleId}`);
        if (!cancelled) {
          const data = await res.json();
          setProgress(data);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProgress();
    return () => { cancelled = true; };
  }, [moduleId]);

  const markSectionRead = useCallback(async (sectionId: string) => {
    setProgress((prev) => {
      if (prev?.sectionsRead.includes(sectionId)) return prev;
      return {
        ...prev!,
        sectionsRead: [...(prev?.sectionsRead ?? []), sectionId],
      };
    });
    try {
      const res = await fetch("/api/progress/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, sectionId }),
      });
      const data = await res.json();
      setProgress(data);
    } catch {
    }
  }, [moduleId]);

  const toggleGoal = useCallback(async (goalLabel: string) => {
    setProgress((prev) => {
      const goals = prev?.checkpointGoals ?? [];
      const idx = goals.indexOf(goalLabel);
      return {
        ...prev!,
        checkpointGoals: idx >= 0
          ? goals.filter((g) => g !== goalLabel)
          : [...goals, goalLabel],
      };
    });
    try {
      const res = await fetch("/api/progress/checkpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, goalLabel }),
      });
      const data = await res.json();
      setProgress(data);
    } catch {
    }
  }, [moduleId]);

  const saveQuizScore = useCallback(async (score: number) => {
    try {
      const res = await fetch("/api/progress/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, score }),
      });
      const data = await res.json();
      setProgress(data);
    } catch {
    }
  }, [moduleId]);

  return { progress, loading, markSectionRead, toggleGoal, saveQuizScore };
}

export function useAllProgress() {
  const [allProgress, setAllProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const res = await fetch("/api/progress");
        if (!cancelled) {
          const data = await res.json();
          setAllProgress(data);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { allProgress, loading };
}
