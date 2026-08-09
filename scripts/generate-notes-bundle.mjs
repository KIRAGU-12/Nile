// Generates src/lib/curriculum/notesBundle.generated.ts from the markdown files
// in src/lib/curriculum/notes/. The bundle is imported by units.ts so the unit
// notes are compiled into the JS bundle and work on serverless hosts (Vercel,
// Netlify, etc.) where the source .md files are not present at runtime.
//
// Runs automatically before every build via the "prebuild" npm script.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const notesDir = path.join(__dirname, "..", "src", "lib", "curriculum", "notes");
const outFile = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "curriculum",
  "notesBundle.generated.ts"
);

if (!existsSync(notesDir)) {
  console.error("notes directory not found:", notesDir);
  process.exit(1);
}

const entries = [];
for (const f of readdirSync(notesDir)) {
  if (!f.endsWith(".md")) continue;
  const slug = f.slice(0, -3);
  const content = readFileSync(path.join(notesDir, f), "utf-8");
  entries.push(`  ${JSON.stringify(slug)}: ${JSON.stringify(content)},`);
}

const header = `// AUTO-GENERATED — do not edit by hand.\n// Run: node scripts/generate-notes-bundle.mjs\n// Regenerated automatically on every build (see "prebuild" in package.json).\n\n`;

const body = `export const NOTES: Record<string, string> = {\n${entries.join("\n")}\n};\n`;

writeFileSync(outFile, header + body);
console.log(`Generated ${outFile} with ${entries.length} notes.`);
