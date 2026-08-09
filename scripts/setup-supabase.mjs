import pg from "pg";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const file = path.join(process.cwd(), "supabase", "migrations", "20240101000000_init_schema.sql");
const sql = fs.readFileSync(file, "utf-8");

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => client.query(sql))
  .then(() => {
    console.log("Supabase schema migrated successfully.");
    return client.end();
  })
  .catch((e) => {
    console.error("Migration failed:", e.message);
    process.exitCode = 1;
    client.end();
  });
