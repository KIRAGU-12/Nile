// ─────────────────────────────────────────────────────────────────────
// Check that the Supabase keys in .env.local are valid for the project.
// Usage:  node scripts/check-supabase-keys.mjs
// It never prints the keys themselves — only VALID / INVALID.
// ─────────────────────────────────────────────────────────────────────
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");

function readEnv(name) {
  if (!existsSync(envPath)) return "";
  const line = readFileSync(envPath, "utf-8")
    .replace(/^\uFEFF/, "") // strip UTF-8 BOM if present
    .split(/\r?\n/)
    .find((l) => l.startsWith(name + "="));
  return line ? line.slice(name.length + 1).trim() : "";
}

const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
const anon = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const secret = readEnv("SUPABASE_SECRET_KEY");

async function test(label, key) {
  if (!key) {
    console.log(`${label}: MISSING in .env.local`);
    return;
  }
  try {
    // Use a real table query (the root /rest/v1/ endpoint returns 401 for the
    // new sb_publishable_ keys even when they are valid — false negative).
    const res = await fetch(`${url}/rest/v1/profiles?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    });
    if (res.status === 200) console.log(`${label}: VALID (HTTP 200)`);
    else console.log(`${label}: INVALID (HTTP ${res.status})`);
  } catch (e) {
    console.log(`${label}: ERROR ${e.message}`);
  }
}

console.log("Supabase URL:", url || "MISSING in .env.local");
console.log("Testing keys against:", url || "?");
await test("ANON key   ", anon);
await test("SECRET key ", secret);
console.log(
  "\nIf either says INVALID, update that value in .env.local with the\ncurrent key from Supabase Dashboard -> Project Settings -> API."
);
