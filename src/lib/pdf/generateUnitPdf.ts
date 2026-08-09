import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import type { PracticeQuestion } from "@/lib/curriculum/practice";
import type { Course } from "@/lib/curriculum/types";

const PAGE_W = 595.28; // A4 width (pt)
const PAGE_H = 841.89; // A4 height (pt)
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM = 54;

const COLOR = {
  primary: rgb(0.18, 0.34, 0.68),
  text: rgb(0.13, 0.15, 0.19),
  muted: rgb(0.42, 0.46, 0.54),
  line: rgb(0.84, 0.86, 0.9),
  white: rgb(1, 1, 1),
  answerBg: rgb(0.95, 0.965, 0.99),
};

interface RichRun {
  text: string;
  bold: boolean;
}

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "bullet"; text: string }
  | { type: "numbered"; num: string; text: string };

interface Cursor {
  doc: PDFDocument;
  page: PDFPage;
  y: number;
  font: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
  pageNumber: number;
}

function tokenizeRich(text: string): RichRun[] {
  const cleaned = text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  const parts = cleaned.split(/\*\*(.+?)\*\*/g);
  const out: RichRun[] = [];
  for (let i = 0; i < parts.length; i++) {
    const t = parts[i];
    if (!t) continue;
    const bold = i % 2 === 1;
    out.push({ text: t.replace(/\*/g, "").trim(), bold });
  }
  return out.filter((r) => r.text.length > 0);
}

function measure(text: string, font: PDFFont, size: number): number {
  return font.widthOfTextAtSize(text, size);
}

function wrapRuns(
  runs: RichRun[],
  maxWidth: number,
  size: number,
  font: PDFFont,
  boldFont: PDFFont
): Array<RichRun[]> {
  const lines: Array<RichRun[]> = [];
  let cur: RichRun[] = [];
  let curWidth = 0;

  const flush = () => {
    if (cur.length) {
      lines.push(cur);
      cur = [];
      curWidth = 0;
    }
  };

  for (const run of runs) {
    const f = run.bold ? boldFont : font;
    const words = run.text.split(/(\s+)/).filter((w) => w.length > 0);
    for (const w of words) {
      const isSpace = /^\s+$/.test(w);
      const ww = isSpace ? w : w;
      const wWidth = measure(ww, f, size);
      if (!isSpace && cur.length > 0 && curWidth + wWidth > maxWidth) {
        flush();
      }
      let tok = w;
      if (cur.length === 0) tok = tok.replace(/^\s+/, "");
      if (!tok) continue;
      cur.push({ text: tok, bold: run.bold });
      curWidth += measure(tok, f, size);
    }
  }
  flush();
  return lines;
}

function newPage(c: Cursor): void {
  c.page = c.doc.addPage([PAGE_W, PAGE_H]);
  c.y = PAGE_H - MARGIN;
  c.pageNumber++;
}

function ensure(c: Cursor, needed: number): void {
  if (c.y - BOTTOM < needed) {
    newPage(c);
    drawFooter(c);
  }
}

function drawFooter(c: Cursor): void {
  const label = `Nile — English & Literature study notes · Page ${c.pageNumber}`;
  const w = measure(label, c.font, 8);
  c.page.drawText(label, {
    x: PAGE_W / 2 - w / 2,
    y: 34,
    size: 8,
    font: c.font,
    color: COLOR.muted,
  });
}

function drawRichParagraph(
  c: Cursor,
  text: string,
  opts: { size?: number; x?: number; color?: ReturnType<typeof rgb>; leading?: number; maxWidth?: number } = {}
): void {
  const size = opts.size ?? 10.5;
  const x = opts.x ?? MARGIN;
  const color = opts.color ?? COLOR.text;
  const leading = opts.leading ?? size * 1.45;
  const maxWidth = opts.maxWidth ?? CONTENT_W - (x - MARGIN);
  const runs = tokenizeRich(text);
  const lines = wrapRuns(runs, maxWidth, size, c.font, c.bold);
  for (const line of lines) {
    ensure(c, leading);
    let cx = x;
    for (const run of line) {
      const font = run.bold ? c.bold : c.font;
      c.page.drawText(run.text, { x: cx, y: c.y - size, size, font, color });
      cx += measure(run.text, font, size);
    }
    c.y -= leading;
  }
}

function drawHeading(c: Cursor, text: string, level: 1 | 2 | 3): void {
  const sizes = { 1: 17, 2: 13.5, 3: 11.5 };
  const size = sizes[level];
  ensure(c, size + 16);
  if (level === 1) {
    c.y -= 6;
    drawRichParagraph(c, text, { size, color: COLOR.primary, leading: size * 1.3 });
    // underline
    ensure(c, 12);
    const y = c.y;
    c.page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 1.2, color: COLOR.line });
    c.y -= 12;
  } else if (level === 2) {
    c.y -= 4;
    drawRichParagraph(c, text, { size, color: COLOR.primary, leading: size * 1.3 });
    c.y -= 4;
  } else {
    c.y -= 2;
    drawRichParagraph(c, text, { size, color: COLOR.text, leading: size * 1.3 });
    c.y -= 2;
  }
}

function drawBullet(c: Cursor, text: string): void {
  const indent = 14;
  const bulletW = 12;
  const size = 10.5;
  const leading = size * 1.45;
  const x = MARGIN + indent;
  const runs = tokenizeRich(text);
  const lines = wrapRuns(runs, CONTENT_W - indent - bulletW, size, c.font, c.bold);
  ensure(c, leading * lines.length);
  const dotY = c.y - size * 0.72;
  c.page.drawCircle({ x: x - bulletW + 4, y: dotY, size: 1.8, color: COLOR.primary });
  let cy = c.y;
  for (const line of lines) {
    ensure(c, leading);
    let cx = x;
    for (const run of line) {
      const font = run.bold ? c.bold : c.font;
      c.page.drawText(run.text, { x: cx, y: cy - size, size, font, color: COLOR.text });
      cx += measure(run.text, font, size);
    }
    cy -= leading;
  }
  c.y = cy;
}

function drawNumbered(c: Cursor, num: string, text: string): void {
  const indent = 14;
  const numW = 22;
  const size = 10.5;
  const leading = size * 1.45;
  const x = MARGIN + indent;
  const runs = tokenizeRich(text);
  const lines = wrapRuns(runs, CONTENT_W - indent - numW, size, c.font, c.bold);
  ensure(c, leading * lines.length);
  c.page.drawText(num + ".", {
    x: MARGIN,
    y: c.y - size,
    size,
    font: c.bold,
    color: COLOR.primary,
  });
  let cy = c.y;
  for (const line of lines) {
    ensure(c, leading);
    let cx = x;
    for (const run of line) {
      const font = run.bold ? c.bold : c.font;
      c.page.drawText(run.text, { x: cx, y: cy - size, size, font, color: COLOR.text });
      cx += measure(run.text, font, size);
    }
    cy -= leading;
  }
  c.y = cy;
}

function drawDivider(c: Cursor): void {
  ensure(c, 20);
  c.y -= 10;
  c.page.drawLine({
    start: { x: MARGIN, y: c.y },
    end: { x: MARGIN + CONTENT_W, y: c.y },
    thickness: 0.8,
    color: COLOR.line,
  });
  c.y -= 14;
}

function parseMarkdown(md: string): Block[] {
  const lines = md.split(/\r?\n/);
  const blocks: Block[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
      para = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      continue;
    }
    let m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) {
      flushPara();
      const level = m[1].length;
      const text = m[2].trim();
      if (level === 1) blocks.push({ type: "h1", text });
      else if (level === 2) blocks.push({ type: "h2", text });
      else blocks.push({ type: "h3", text });
      continue;
    }
    m = line.match(/^[-*]\s+(.+)$/);
    if (m) {
      flushPara();
      blocks.push({ type: "bullet", text: m[1].trim() });
      continue;
    }
    m = line.match(/^(\d+)[.)]\s+(.+)$/);
    if (m) {
      flushPara();
      blocks.push({ type: "numbered", num: m[1], text: m[2].trim() });
      continue;
    }
    m = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (m) {
      flushPara();
      blocks.push({ type: "h3", text: m[1].trim() });
      continue;
    }
    para.push(line);
  }
  flushPara();
  return blocks;
}

function categoryLabel(cat: PracticeQuestion["category"]): string {
  if (cat === "short") return "Short Answer Questions";
  if (cat === "essay") return "Essay Questions";
  return "Objective / Passage-Based Questions";
}

export interface UnitPdfData {
  course: Course;
  notes: string; // markdown WITHOUT the practice section
  questions: PracticeQuestion[];
  answers: string[]; // model answers aligned with questions
  generatedAt?: string;
}

export async function generateUnitPdf(data: UnitPdfData): Promise<Uint8Array> {
  const { course, notes, questions, answers } = data;
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const c: Cursor = { doc, page: null as unknown as PDFPage, y: PAGE_H - MARGIN, font, bold, italic, pageNumber: 0 };
  newPage(c);

  // ---------- Title block ----------
  drawRichParagraph(c, "NILE — UNIT NOTES", { size: 12, color: COLOR.primary });
  c.y -= 4;
  drawHeading(c, `${course.code} — ${course.title}`, 1);
  drawRichParagraph(c, `Year ${course.year} · Semester ${course.semester} · ${course.credits} credits`, {
    size: 9.5,
    color: COLOR.muted,
  });
  c.y -= 10;

  // ---------- Overview ----------
  drawHeading(c, "Unit Overview", 2);
  drawRichParagraph(c, course.description);
  c.y -= 8;

  // ---------- Learning outcomes ----------
  if (course.learningOutcomes.length) {
    drawHeading(c, "Learning Outcomes", 2);
    for (const o of course.learningOutcomes) drawBullet(c, o);
    c.y -= 8;
  }

  // ---------- Set texts & books ----------
  if (course.setBooks.length) {
    drawHeading(c, "Set Texts and Books", 2);
    for (const b of course.setBooks) {
      drawBullet(c, `${b.title} by ${b.author}` + (b.edition ? ` (${b.edition})` : "") + (b.note ? ` — ${b.note}` : ""));
    }
    c.y -= 8;
  }

  // ---------- Key authors ----------
  if (course.keyAuthors.length) {
    drawHeading(c, "Key Authors and Figures", 2);
    for (const a of course.keyAuthors) {
      drawHeading(c, a.name, 3);
      const meta = [a.lifespan, a.nationality].filter(Boolean).join(", ");
      if (meta) drawRichParagraph(c, meta, { size: 9.5, color: COLOR.muted });
      if (a.notableWorks && a.notableWorks.length)
        drawRichParagraph(c, `Notable works: ${a.notableWorks.join(", ")}`);
      if (a.bio) drawRichParagraph(c, a.bio);
      c.y -= 4;
    }
  }

  // ---------- Detailed notes ----------
  drawHeading(c, "Detailed Notes", 2);
  const blocks = parseMarkdown(notes);
  for (const b of blocks) {
    switch (b.type) {
      case "h1":
        drawHeading(c, b.text, 2);
        break;
      case "h2":
        drawHeading(c, b.text, 2);
        break;
      case "h3":
        drawHeading(c, b.text, 3);
        break;
      case "p":
        drawRichParagraph(c, b.text);
        c.y -= 2;
        break;
      case "bullet":
        drawBullet(c, b.text);
        break;
      case "numbered":
        drawNumbered(c, b.num, b.text);
        break;
    }
  }

  // ---------- Practice questions ----------
  newPage(c);
  drawHeading(c, "Practice Questions (Exam Revision)", 1);
  if (!questions.length) {
    drawRichParagraph(c, "No practice questions were provided for this unit.");
  } else {
    const cats: PracticeQuestion["category"][] = ["short", "essay", "objective"];
    let global = 0;
    for (const cat of cats) {
      const group = questions.filter((q) => q.category === cat);
      if (!group.length) continue;
      drawHeading(c, categoryLabel(cat), 2);
      for (const q of group) {
        global++;
        const label = q.parent ? `${q.parent}` : `${global}`;
        const marks = q.marks ? ` (${q.marks} marks)` : "";
        drawNumbered(c, label, `${q.text}${marks}`);
      }
      c.y -= 6;
    }
  }

  // ---------- Model answers ----------
  newPage(c);
  drawHeading(c, "Model Answers", 1);
  drawRichParagraph(c, "Concise model answers for the practice questions above. Use them to check your own work, then expand in your own words in an exam.", {
    size: 9.5,
    color: COLOR.muted,
  });
  c.y -= 6;

  if (!questions.length || !answers.length) {
    drawRichParagraph(c, "Model answers are not available for this unit.");
  } else {
    questions.forEach((q, i) => {
      const ans = answers[i]?.trim();
      if (!ans) return;
      const qLabel = q.parent ? `Q${i + 1} (${q.parent})` : `Q${i + 1}`;
      const marks = q.marks ? ` — ${q.marks} marks` : "";
      drawHeading(c, `${qLabel}${marks}`, 3);
      drawRichParagraph(c, q.text, { size: 9.5, color: COLOR.muted });
      drawAnswerBox(c, ans);
      c.y -= 6;
    });
  }

  drawFooter(c);

  return doc.save();
}

function drawAnswerBox(c: Cursor, text: string): void {
  const size = 10;
  const leading = size * 1.45;
  const runs = tokenizeRich(text);
  const lines = wrapRuns(runs, CONTENT_W - 20, size, c.font, c.bold);
  const boxHeight = lines.length * leading + 14;
  ensure(c, boxHeight + 6);
  // background
  c.page.drawRectangle({
    x: MARGIN - 4,
    y: c.y - boxHeight + 4,
    width: CONTENT_W + 8,
    height: boxHeight,
    color: COLOR.answerBg,
  });
  let cy = c.y - 9;
  for (const line of lines) {
    ensure(c, leading);
    let cx = MARGIN + 6;
    for (const run of line) {
      const f = run.bold ? c.bold : c.font;
      c.page.drawText(run.text, { x: cx, y: cy - size, size, font: f, color: COLOR.text });
      cx += measure(run.text, f, size);
    }
    cy -= leading;
  }
  c.y = cy - 6;
}
