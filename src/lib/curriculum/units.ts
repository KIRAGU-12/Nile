import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { ALL_COURSES } from "./index";
import type { Course } from "./types";
import { NOTES as BUNDLED_NOTES } from "./notesBundle.generated";

const NOTES_DIR = path.join(
  process.cwd(),
  "src",
  "lib",
  "curriculum",
  "notes"
);

export function unitSlug(code: string): string {
  return code.toLowerCase().replace(/\s+/g, "-");
}

export function unitNotesPath(code: string): string {
  return path.join(NOTES_DIR, `${unitSlug(code)}.md`);
}

export function getUnitNotes(code: string): string | null {
  const slug = unitSlug(code);
  // Prefer the live filesystem during development so note edits show immediately.
  try {
    if (existsSync(unitNotesPath(code))) {
      return readFileSync(unitNotesPath(code), "utf-8");
    }
  } catch {
    // fall through to the bundled copy
  }
  // Bundled copy (generated at build time by scripts/generate-notes-bundle.mjs).
  // This is what ships to serverless hosts, where the .md files aren't on disk.
  return BUNDLED_NOTES[slug] ?? null;
}

export function listUnitNotes(): Array<{
  code: string;
  course: Course;
  notes: string;
}> {
  if (!existsSync(NOTES_DIR)) return [];
  const bySlug = new Map<string, Course>();
  for (const c of ALL_COURSES) bySlug.set(unitSlug(c.code), c);

  const out: Array<{ code: string; course: Course; notes: string }> = [];
  for (const f of readdirSync(NOTES_DIR)) {
    if (!f.endsWith(".md")) continue;
    const slug = f.slice(0, -3);
    const course = bySlug.get(slug);
    if (!course) continue;
    try {
      out.push({
        code: course.code,
        course,
        notes: readFileSync(path.join(NOTES_DIR, f), "utf-8"),
      });
    } catch {}
  }
  return out;
}
