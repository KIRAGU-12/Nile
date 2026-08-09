import { ALL_COURSES } from "@/lib/curriculum";
import { getUnitNotes } from "@/lib/curriculum/units";

export interface KBChunk {
  id: string;
  text: string;
  courseCode: string;
  title: string;
  year: number;
  semester: number;
}

const CHUNK_MAX = 900;

function chunkText(text: string): string[] {
  if (!text) return [];
  const out: string[] = [];
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  for (const para of paragraphs) {
    if (para.length <= CHUNK_MAX) {
      out.push(para);
      continue;
    }
    const sentences = para.split(/(?<=[.!?])\s+/);
    let buf = "";
    for (const s of sentences) {
      if (buf.length + s.length + 1 > CHUNK_MAX && buf) {
        out.push(buf);
        buf = "";
      }
      buf += buf ? " " + s : s;
    }
    if (buf) out.push(buf);
  }
  const final: string[] = [];
  for (const c of out) {
    if (c.length <= CHUNK_MAX) {
      final.push(c);
      continue;
    }
    for (let i = 0; i < c.length; i += CHUNK_MAX) {
      final.push(c.slice(i, i + CHUNK_MAX));
    }
  }
  return final;
}

let cached: KBChunk[] | null = null;
export function buildChunks(): KBChunk[] {
  if (cached?.length) return cached;
  const chunks: KBChunk[] = [];
  for (const c of ALL_COURSES) {
    const parts: string[] = [];
    const unitMd = getUnitNotes(c.code);
    if (unitMd) {
      parts.push(unitMd);
    } else {
      if (c.notes) parts.push(c.notes);
      for (const t of c.topics) {
        if (t.notes) parts.push(`Topic — ${t.title}.\n\n${t.notes}`);
      }
    }
    if (c.setBooks.length) {
      parts.push(
        "Set texts and books: " +
          c.setBooks
            .map((b) => `${b.title} by ${b.author}` + (b.note ? ` (${b.note})` : ""))
            .join("; ")
      );
    }
    for (const a of c.keyAuthors) {
      parts.push(
        `Author ${a.name}` +
          (a.lifespan ? ` (${a.lifespan})` : "") +
          (a.nationality ? ` — ${a.nationality}.` : "") +
          (a.notableWorks && a.notableWorks.length
            ? ` Notable works: ${a.notableWorks.join(", ")}.`
            : "") +
          ` ${a.bio}`
      );
    }
    let idx = 0;
    for (const part of parts) {
      for (const seg of chunkText(part)) {
        chunks.push({
          id: `${c.code}-${idx}`,
          text: seg,
          courseCode: c.code,
          title: c.title,
          year: c.year,
          semester: c.semester,
        });
        idx++;
      }
    }
  }
  cached = chunks;
  return chunks;
}

function tokenize(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9]+/g) ?? []);
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
    return [i, dot / (qNorm * dNorm)];
  });

  if (scopeCourseCode) {
    for (const entry of scored) {
      if (chunks[entry[0]].courseCode === scopeCourseCode) entry[1] += 1.5;
    }
  }

  scored.sort((a, b) => b[1] - a[1]);
  return scored.slice(0, k).map(([i, score]) => ({ ...chunks[i], score }));
}
