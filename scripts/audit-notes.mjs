import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const NOTES_DIR = path.join(process.cwd(), "src", "lib", "curriculum", "notes");

const REQUIRED = [
  "Unit overview",
  "Learning outcomes",
  "Detailed notes",
  "Practice exercises",
  "References",
];

function sectionBounds(md, heading) {
  // find a line that is exactly "## <heading>..." (level-2)
  const lines = md.split(/\r?\n/);
  const idxs = [];
  lines.forEach((line, i) => {
    const m = line.match(/^##\s+(.+)$/);
    if (m && m[1].trim().toLowerCase().startsWith(heading.toLowerCase())) idxs.push(i);
  });
  if (!idxs.length) return null;
  // take the first occurrence; end = next level-2 (##) heading after it, so all
  // ### subsections under this section are included.
  const start = idxs[0];
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return { start, end };
}

function sectionText(md, heading) {
  const b = sectionBounds(md, heading);
  if (!b) return "";
  return md.split(/\r?\n/).slice(b.start, b.end).join("\n");
}

function countQuestions(md) {
  // count numbered question lines under practice section
  const text = sectionText(md, "Practice exercises");
  const nums = text.match(/^\s*\d+[.)]\s+/gm);
  return nums ? nums.length : 0;
}

function countWords(s) {
  const t = s.replace(/[#*`>]/g, " ").replace(/\s+/g, " ").trim();
  return t ? t.split(" ").length : 0;
}

const files = readdirSync(NOTES_DIR).filter((f) => f.endsWith(".md")).sort();

console.log("NOTES AUDIT —", files.length, "unit files\n");
console.log(
  "FILE".padEnd(12) +
    "OVR".padEnd(5) +
    "LRN".padEnd(5) +
    "DET".padEnd(5) +
    "PRAC".padEnd(6) +
    "REF".padEnd(5) +
    "QUES".padEnd(6) +
    "WORDS".padEnd(7) +
    "BYTES"
);
let issues = 0;
for (const f of files) {
  const md = readFileSync(path.join(NOTES_DIR, f), "utf-8");
  const has = (h) => (sectionBounds(md, h) ? "Y" : "-");
  const detail = sectionText(md, "Detailed notes");
  const detailWords = countWords(detail);
  const q = countQuestions(md);
  const bytes = statSync(path.join(NOTES_DIR, f)).size;
  const missing = REQUIRED.filter((r) => !sectionBounds(md, r));
  if (missing.length || detailWords < 300 || q < 5) issues++;
  console.log(
    f.replace(".md", "").padEnd(12) +
      has("Unit overview").padEnd(5) +
      has("Learning outcomes").padEnd(5) +
      has("Detailed notes").padEnd(5) +
      has("Practice exercises").padEnd(6) +
      has("References").padEnd(5) +
      String(q).padEnd(6) +
      String(detailWords).padEnd(7) +
      String(bytes)
  );
}
console.log("\nIssues detected:", issues);
console.log(
  "\nLegend: OVR=Unit overview, LRN=Learning outcomes, DET=Detailed notes, PRAC=Practice exercises, REF=References, QUES=# practice questions, WORDS=words in Detailed notes, BYTES=file size"
);
