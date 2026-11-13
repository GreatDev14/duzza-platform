import fs from "fs";
import path from "path";
import { getDbPool } from "../src/lib/db/client";

async function runMigrations() {
  console.log("=== INITIATING DUZZA LIMITED ENTERPRISE DATABASE MIGRATION ===");
  const migrationPath = path.join(__dirname, "../migrations/001_initial_schema.sql");
  
  if (!fs.existsSync(migrationPath)) {
    console.error(`Migration script not found at ${migrationPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationPath, "utf-8");
  const pool = getDbPool();

  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL via connection pool successfully.");
    console.log("Executing 001_initial_schema.sql (UUIDv7, RBAC, Divisions, Equipment, Audit Logs)...");

    await client.query(sql);

    console.log("✅ Migration applied successfully with all tables, triggers, and seed records.");
    client.release();
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Migration failed with error:", err.message);
    process.exit(1);
  }
}

runMigrations();

