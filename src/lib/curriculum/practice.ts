export type PracticeCategory = "short" | "essay" | "objective";

export interface PracticeQuestion {
  id: string;
  category: PracticeCategory;
  text: string;
  /** When this question is a sub-question (a., b., c.), the parent numbered item text. */
  parent?: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard" | null;
}

const CATEGORY_RULES: Array<{ re: RegExp; category: PracticeCategory }> = [
  { re: /essay/i, category: "essay" },
  { re: /objective|passage|multiple\s*choice|mcq/i, category: "objective" },
  { re: /short\s*answer|answer/i, category: "short" },
];

const DEFAULT_MARKS: Record<PracticeCategory, number> = {
  short: 4,
  essay: 10,
  objective: 2,
};

function detectCategory(label: string): PracticeCategory | null {
  for (const rule of CATEGORY_RULES) {
    if (rule.re.test(label)) return rule.category;
  }
  return null;
}

function marksOf(text: string): number | null {
  const m = text.match(/\((\d+)\s*marks?\)/i);
  return m ? parseInt(m[1], 10) : null;
}

/** Remove difficulty tags ("(Easy)", "**(Easy)**") and mark tags ("(4 marks)") from display text. */
function cleanText(text: string): string {
  return text
    .replace(/\*\*\(?(Easy|Medium|Hard)\)?\*\*/gi, "")
    .replace(/\((Easy|Medium|Hard)\)/gi, "")
    .replace(/\((\d+)\s*marks?\)/gi, "")
    .trim();
}

function difficultyOf(text: string, heading: string): PracticeQuestion["difficulty"] {
  const t = `${heading} ${text}`;
  if (/\bhard\b|\bchallenging\b/i.test(t)) return "hard";
  if (/\bmedium\b|\bmoderate\b/i.test(t)) return "medium";
  if (/\beasy\b/i.test(t)) return "easy";
  return null;
}

const HEADING_RE = /^#{1,6}\s+(.+)$/;
const BOLD_HEADING_RE = /^\*\*(.+?)\*\*\s*$/;
const NUMBERED_RE = /^(\d+)[.)]\s+(.+)$/;
const SUB_RE = /^([a-z])[.)]\s+(.+)$/;

/**
 * Remove the "## Practice exercises" section from rendered notes so the
 * questions are presented once, as the interactive quiz below the notes.
 */
export function stripPracticeSection(notes: string): string {
  const idx = notes.search(/^##\s*Practice exercises/m);
  if (idx === -1) return notes;
  const before = notes.slice(0, idx);
  const body = notes.slice(idx);
  const nl = body.indexOf("\n");
  const rest = nl === -1 ? "" : body.slice(nl);
  const end = rest.search(/^##\s/m);
  return end === -1 ? before.trimEnd() : `${before}${rest.slice(end)}`.trim();
}

/** Extract the first paragraph of the "## Unit overview" section, if present. */
export function extractUnitOverview(notes: string, fallback = ""): string {
  const m = notes.match(/^##\s*Unit overview\s*\n+([\s\S]*?)(?=\n##\s)/);
  if (!m) return fallback;
  const paras = m[1]
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paras[0] ?? fallback;
}

/**
 * Parse the practice/exam-revision questions out of a unit's markdown notes.
 * Handles both formats used across the curriculum:
 *  - `**Short answer**` / `### Short answer (moderate)` section headings
 *  - numbered items (`1.`, `1)`) with optional "(Easy)" and "(4 marks)" tags
 *  - lettered sub-questions (`a.`, `b.`) that carry their own marks
 */
export function parsePracticeQuestions(notes: string): PracticeQuestion[] {
  const start = notes.search(/^##\s*Practice exercises/m);
  if (start === -1) return [];

  const body = notes.slice(start);
  const nl = body.indexOf("\n");
  const rest = nl === -1 ? "" : body.slice(nl);
  const end = rest.search(/^##\s/m);
  const section = (end === -1 ? rest : rest.slice(0, end))
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const out: PracticeQuestion[] = [];
  let category: PracticeCategory = "short";
  let heading = "";
  let counter = 0;
  let parent: string | null = null;

  const add = (q: PracticeQuestion) => {
    if (q.text.trim()) out.push(q);
  };

  for (const line of section) {
    let m = line.match(BOLD_HEADING_RE) || line.match(HEADING_RE);
    if (m) {
      const label = m[1];
      const cat = detectCategory(label);
      if (cat) {
        category = cat;
        heading = label;
      }
      continue;
    }

    m = line.match(NUMBERED_RE);
    if (m) {
      const raw = m[2];
      parent = cleanText(raw);
      add({
        id: `q${++counter}`,
        category,
        text: parent,
        marks: marksOf(raw) ?? DEFAULT_MARKS[category],
        difficulty: difficultyOf(raw, heading),
      });
      continue;
    }

    m = line.match(SUB_RE);
    if (m && parent) {
      const raw = m[2];
      add({
        id: `q${++counter}`,
        category,
        text: cleanText(raw),
        parent,
        marks: marksOf(raw) ?? 2,
        difficulty: difficultyOf(raw, heading),
      });
      continue;
    }

    // Continuation line (e.g. MCQ options on the next line) — append to the last question.
    if (out.length) {
      out[out.length - 1].text = `${out[out.length - 1].text} ${line}`.trim();
    }
  }

  return out;
}
