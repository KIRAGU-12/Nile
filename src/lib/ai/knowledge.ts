import { ALL_COURSES } from "@/lib/curriculum";
import { getUnitNotes } from "@/lib/curriculum/units";

export interface KBChunk {
  id: string;
  text: string;
  courseCode: string;
  title: string;
  year: number;
  semester: number;
  /** Heading path of the section this chunk came from, e.g. "Detailed notes". */
  section?: string;
}

const CHUNK_MAX = 900;

// Split markdown notes into labelled sections based on headings, keeping the
// heading path (e.g. "Detailed notes > Old English metre and poetic diction")
// so every chunk knows which part of the notes it came from. This lets Nile's
// retriever match on heading words and lets the model read section context.
function splitSections(md: string): Array<{ path: string[]; body: string }> {
  const sections: Array<{ path: string[]; body: string }> = [];
  const stack: Array<{ level: number; title: string }> = [];
  let body: string[] = [];

  const flush = () => {
    if (body.join("\n").trim()) {
      sections.push({ path: stack.map((s) => s.title), body: body.join("\n").trim() });
    }
    body = [];
  };

  for (const rawLine of md.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) {
      flush();
      const level = m[1].length;
      const title = m[2].trim().replace(/\*\*/g, "");
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      stack.push({ level, title });
    } else {
      body.push(line);
    }
  }
  flush();
  return sections;
}

// Split a section body into chunks of at most `max` characters, splitting on
// blank lines and, when still too long, on sentence boundaries.
function chunkBody(body: string, max: number): string[] {
  if (!body) return [];
  const out: string[] = [];
  const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  for (const para of paragraphs) {
    if (para.length <= max) {
      out.push(para);
      continue;
    }
    const sentences = para.split(/(?<=[.!?])\s+/);
    let buf = "";
    for (const s of sentences) {
      if (buf.length + s.length + 1 > max && buf) {
        out.push(buf);
        buf = "";
      }
      buf += buf ? " " + s : s;
    }
    if (buf) out.push(buf);
  }
  const final: string[] = [];
  for (const c of out) {
    if (c.length <= max) {
      final.push(c);
      continue;
    }
    for (let i = 0; i < c.length; i += max) {
      final.push(c.slice(i, i + max));
    }
  }
  return final;
}

// Render the heading path into a short label, e.g. "Detailed notes > Old English metre".
function sectionLabel(path: string[]): string {
  const meaningful = path.filter((p) => p && !/^[0-9]+\./.test(p));
  const label = meaningful.join(" > ");
  return label ? label : "Overview";
}

let cached: KBChunk[] | null = null;
export function buildChunks(): KBChunk[] {
  if (cached?.length) return cached;
  const chunks: KBChunk[] = [];
  for (const c of ALL_COURSES) {
    const unitMd = getUnitNotes(c.code);
    let idx = 0;
    const push = (text: string, section?: string) => {
      for (const seg of chunkBody(text, CHUNK_MAX)) {
        chunks.push({
          id: `${c.code}-${idx}`,
          text: section ? `${section} — ${seg}` : seg,
          courseCode: c.code,
          title: c.title,
          year: c.year,
          semester: c.semester,
          section,
        });
        idx++;
      }
    };

    if (unitMd) {
      // Full notes file: split into labelled sections so each chunk knows its
      // heading path and the retriever can match on section titles too.
      for (const s of splitSections(unitMd)) {
        if (!s.body.trim()) continue;
        push(s.body, sectionLabel(s.path));
      }
    } else {
      // Fallback for courses without a full notes file.
      if (c.notes) push(c.notes, "Overview");
      for (const t of c.topics) {
        if (t.notes) push(t.notes, `Topic — ${t.title}`);
      }
      if (c.setBooks.length) {
        push(
          "Set texts and books: " +
            c.setBooks
              .map((b) => `${b.title} by ${b.author}` + (b.note ? ` (${b.note})` : ""))
              .join("; "),
          "Set texts"
        );
      }
      for (const a of c.keyAuthors) {
        push(
          `Author ${a.name}` +
            (a.lifespan ? ` (${a.lifespan})` : "") +
            (a.nationality ? ` — ${a.nationality}.` : "") +
            (a.notableWorks && a.notableWorks.length
              ? ` Notable works: ${a.notableWorks.join(", ")}.`
              : "") +
            ` ${a.bio}`,
          "Authors"
        );
      }
    }
  }
  cached = chunks;
  return chunks;
}

// Very light English suffix-stemmer (dependency-free). Both the raw word and its
// stem are kept as tokens, so "explains", "explaining" and "explained" all
// match "explain", improving recall over the notes without an external API.
function stem(word: string): string {
  if (word.length <= 3) return word;
  const rules: Array<[RegExp, string]> = [
    [/ies$/, "y"],
    [/ing$/, ""],
    [/ed$/, ""],
    [/es$/, ""],
    [/s$/, ""],
  ];
  for (const [re, rep] of rules) {
    const cand = word.replace(re, rep);
    if (cand.length >= 3 && cand !== word) return cand;
  }
  return word;
}

function tokenize(s: string): string[] {
  const raw = s.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const out: string[] = [];
  for (const w of raw) {
    out.push(w);
    const st = stem(w);
    if (st !== w) out.push(st);
  }
  return out;
}

// Substantive notes sections should outrank question lists and bibliographies,
// so concept queries pull the actual explanations rather than the practice
// questions (which often repeat the question wording).
function sectionWeight(section?: string): number {
  if (!section) return 1;
  if (section.startsWith("Detailed notes")) return 1.25;
  if (section.startsWith("Unit overview")) return 1.15;
  if (section.startsWith("Learning outcomes")) return 1.1;
  if (section.startsWith("Practice exercises")) return 0.85;
  if (section.startsWith("References")) return 0.7;
  return 1;
}

// Local TF-IDF (cosine) retrieval over the curriculum chunks.
// No external API and no quota — retrieval is purely in-process.
// When `scopeCourseCode` is given (the unit the student is currently viewing),
// that unit's chunks are boosted so Nile recognises and prioritises the unit.
export function retrieveRelevant(
  question: string,
  k = 8,
  scopeCourseCode?: string
): Array<KBChunk & { score: number }> {
  const chunks = buildChunks();
  if (!chunks.length) return [];

  const qTokens = tokenize(question);
  if (!qTokens.length) {
    return chunks.slice(0, k).map((c) => ({ ...c, score: 0 }));
  }

  const N = chunks.length;
  const docTokens = chunks.map((c) => tokenize(c.text));
  const df = new Map<string, number>();
  for (const d of docTokens) {
    const seen = new Set(d);
    for (const t of seen) df.set(t, (df.get(t) ?? 0) + 1);
  }
  const idf = (t: string) => Math.log((1 + N) / (1 + (df.get(t) ?? 0))) + 1;

  const qtf = new Map<string, number>();
  for (const t of qTokens) qtf.set(t, (qtf.get(t) ?? 0) + 1);
  let qNorm = 0;
  const qVec = new Map<string, number>();
  for (const [t, f] of qtf) {
    const w = f * idf(t);
    qVec.set(t, w);
    qNorm += w * w;
  }
  qNorm = Math.sqrt(qNorm) || 1;

  const scored: Array<[number, number]> = chunks.map((_c, i) => {
    const tf = new Map<string, number>();
    for (const t of docTokens[i]) tf.set(t, (tf.get(t) ?? 0) + 1);
    let dot = 0;
    let dNorm2 = 0;
    for (const [t, f] of tf) {
      const w = f * idf(t);
      dNorm2 += w * w;
      const qw = qVec.get(t);
      if (qw) dot += w * qw;
    }
    const dNorm = Math.sqrt(dNorm2) || 1;
    return [i, (dot / (qNorm * dNorm)) * sectionWeight(chunks[i].section)];
  });

  // Course codes come in either canonical form ("ENG 215") or the URL slug
  // ("eng-215"), so compare normalized to be safe.
  const scopeNorm = scopeCourseCode
    ? scopeCourseCode.toLowerCase().replace(/[^a-z0-9]/g, "")
    : undefined;
  const isScope = (i: number) =>
    !!scopeNorm &&
    chunks[i].courseCode.toLowerCase().replace(/[^a-z0-9]/g, "") === scopeNorm;

  if (scopeNorm) {
    // Boost the unit the student is currently viewing so it wins ties.
    for (const entry of scored) {
      if (isScope(entry[0])) entry[1] += 1.5;
    }
  }

  scored.sort((a, b) => b[1] - a[1]);
  const top = scored.slice(0, k);

  // When the student is viewing a unit, always keep at least 3 of its chunks in
  // the context even if the lexical match was weak, so Nile never loses the
  // current unit's material.
  if (scopeNorm) {
    const inScope = top.filter(([i]) => isScope(i)).length;
    if (inScope < 3) {
      let missing = 3 - inScope;
      for (const [i, sc] of scored) {
        if (missing === 0) break;
        if (!top.some(([j]) => j === i) && isScope(i)) {
          top.push([i, sc]);
          missing--;
        }
      }
      top.sort((a, b) => b[1] - a[1]);
    }
  }

  return top.map(([i, score]) => ({ ...chunks[i], score }));
}
