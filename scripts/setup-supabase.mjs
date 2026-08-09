import pg from "pg";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const dir = path.join(process.cwd(), "supabase", "migrations");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (!files.length) {
  console.error("No migration files found in", dir);
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(async () => {
    for (const f of files) {
      const sql = fs.readFileSync(path.join(dir, f), "utf-8");
      await client.query(sql);
      console.log("Applied", f);
    }
    console.log("Supabase schema migrated successfully.");
    await client.end();
  })
  .catch((e) => {
    console.error("Migration failed:", e.message);
    process.exitCode = 1;
    client.end();
  });
