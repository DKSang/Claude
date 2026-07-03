import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "learning.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS module_progress (
        module_id TEXT PRIMARY KEY,
        sections_read TEXT DEFAULT '[]',
        checkpoint_goals TEXT DEFAULT '[]',
        quiz_score INTEGER DEFAULT 0,
        quiz_attempts TEXT DEFAULT '[]',
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);
  }
  return db;
}

export interface ModuleProgress {
  moduleId: string;
  sectionsRead: string[];
  checkpointGoals: string[];
  quizScore: number;
  quizAttempts: { score: number; date: string }[];
}

export function getProgress(moduleId: string): ModuleProgress | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM module_progress WHERE module_id = ?").get(moduleId) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    moduleId: row.module_id as string,
    sectionsRead: JSON.parse(row.sections_read as string),
    checkpointGoals: JSON.parse(row.checkpoint_goals as string),
    quizScore: row.quiz_score as number,
    quizAttempts: JSON.parse(row.quiz_attempts as string),
  };
}

export function getAllProgress(): ModuleProgress[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM module_progress").all() as Record<string, unknown>[];
  return rows.map((row) => ({
    moduleId: row.module_id as string,
    sectionsRead: JSON.parse(row.sections_read as string),
    checkpointGoals: JSON.parse(row.checkpoint_goals as string),
    quizScore: row.quiz_score as number,
    quizAttempts: JSON.parse(row.quiz_attempts as string),
  }));
}

export function upsertProgress(
  moduleId: string,
  updates: Partial<Pick<ModuleProgress, "sectionsRead" | "checkpointGoals" | "quizScore">>
): ModuleProgress {
  const db = getDb();
  const existing = getProgress(moduleId);
  const merged: ModuleProgress = {
    moduleId,
    sectionsRead: updates.sectionsRead ?? existing?.sectionsRead ?? [],
    checkpointGoals: updates.checkpointGoals ?? existing?.checkpointGoals ?? [],
    quizScore: updates.quizScore ?? existing?.quizScore ?? 0,
    quizAttempts: existing?.quizAttempts ?? [],
  };
  db.prepare(`
    INSERT INTO module_progress (module_id, sections_read, checkpoint_goals, quiz_score, quiz_attempts, updated_at)
    VALUES (@moduleId, @sectionsRead, @checkpointGoals, @quizScore, @quizAttempts, datetime('now'))
    ON CONFLICT(module_id) DO UPDATE SET
      sections_read = @sectionsRead,
      checkpoint_goals = @checkpointGoals,
      quiz_score = @quizScore,
      updated_at = datetime('now')
  `).run({
    moduleId,
    sectionsRead: JSON.stringify(merged.sectionsRead),
    checkpointGoals: JSON.stringify(merged.checkpointGoals),
    quizScore: merged.quizScore,
    quizAttempts: JSON.stringify(merged.quizAttempts),
  });
  return merged;
}

export function addQuizAttempt(moduleId: string, score: number): ModuleProgress {
  const db = getDb();
  const existing = getProgress(moduleId);
  const attempts = existing?.quizAttempts ?? [];
  attempts.push({ score, date: new Date().toISOString() });
  const bestScore = Math.max(existing?.quizScore ?? 0, score);
  db.prepare(`
    INSERT INTO module_progress (module_id, sections_read, checkpoint_goals, quiz_score, quiz_attempts, updated_at)
    VALUES (@moduleId, @sectionsRead, @checkpointGoals, @quizScore, @quizAttempts, datetime('now'))
    ON CONFLICT(module_id) DO UPDATE SET
      quiz_score = @quizScore,
      quiz_attempts = @quizAttempts,
      updated_at = datetime('now')
  `).run({
    moduleId,
    sectionsRead: JSON.stringify(existing?.sectionsRead ?? []),
    checkpointGoals: JSON.stringify(existing?.checkpointGoals ?? []),
    quizScore: bestScore,
    quizAttempts: JSON.stringify(attempts),
  });
  return getProgress(moduleId)!;
}
