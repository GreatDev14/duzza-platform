const fs = require("fs");
const path = require("path");
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

async function run() {
  const schemaSql = fs.readFileSync(path.join(__dirname, "iam-schema.sql"), "utf8");
  console.log("Applying schema to Neon...");
  await pool.query(schemaSql);
  console.log("Schema applied successfully.");

  // Check if seeded users exist
  const res = await pool.query("SELECT COUNT(*) FROM iam_users");
  console.log("Current user count in Neon:", res.rows[0].count);

  if (parseInt(res.rows[0].count, 10) === 0) {
    const rawData = fs.readFileSync(path.join(__dirname, "../data/iam-cms-db.json"), "utf8");
    const data = JSON.parse(rawData);

    for (const u of data.users) {
      await pool.query(
        `INSERT INTO iam_users (id, name, email, password_hash, role, status, invited_by, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (email) DO NOTHING`,
        [u.id, u.name, u.email, u.passwordHash, u.role, u.status, u.invitedBy || null, u.createdAt, u.updatedAt]
      );
    }
    console.log(`Seeded ${data.users.length} users.`);

    for (const p of data.projects) {
      await pool.query(
        `INSERT INTO cms_projects (id, title, division, location, description, image_url, created_by, created_by_email, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO NOTHING`,
        [p.id, p.title, p.division, p.location, p.description, p.imageUrl, p.createdBy, p.createdByEmail, p.createdAt]
      );
    }
    console.log(`Seeded ${data.projects.length} projects.`);

    for (const img of data.images) {
      await pool.query(
        `INSERT INTO cms_images (id, title, category, url, uploaded_by, uploaded_by_email, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [img.id, img.title, img.category, img.url, img.uploadedBy, img.uploadedByEmail, img.createdAt]
      );
    }
    console.log(`Seeded ${data.images.length} images.`);

    for (const n of data.notifications) {
      await pool.query(
        `INSERT INTO cms_notifications (id, title, message, priority, created_by, created_by_email, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [n.id, n.title, n.message, n.priority, n.createdBy, n.createdByEmail, n.createdAt]
      );
    }
    console.log(`Seeded ${data.notifications.length} notifications.`);
  }

  const finalCheck = await pool.query("SELECT role, email, status FROM iam_users ORDER BY role");
  console.log("Users in Neon:", finalCheck.rows);

  await pool.end();
}

run().catch((err) => {
  console.error("Migration error:", err);
  pool.end();
  process.exit(1);
});

