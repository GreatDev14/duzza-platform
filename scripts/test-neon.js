const fs = require("fs");
const { Pool } = require("pg");

const env = fs.readFileSync(".env.local", "utf8");
const line = env.split(/\r?\n/).find((l) => l.startsWith("DATABASE_URL="));
if (!line) {
  console.error("No DATABASE_URL found");
  process.exit(1);
}
const url = line.substring("DATABASE_URL=".length).trim().replace(/^["']|["']$/g, "");

const pool = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

pool
  .query("SELECT NOW() as current_time, current_database() as db")
  .then((res) => {
    console.log("CONNECTED TO NEON SUCCESSFULLY:", res.rows[0]);
    pool.end();
  })
  .catch((err) => {
    console.error("CONNECTION FAILED:", err.message);
    pool.end();
    process.exit(1);
  });

