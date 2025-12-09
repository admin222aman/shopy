import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// --- FIXED NEON DIRECT CONNECTION (NO POOLER) ---
const connectionString =
  "postgresql://neondb_owner:NEW_PASSWORD@ep-dark-hat-ahy13rc3.us-east-1.aws.neon.tech/neondb?sslmode=require";

// DB pool
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000
});

// Test + create table
const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to Neon PostgreSQL");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Table "users" ready.');
    client.release();
  } catch (err) {
    console.error("❌ DB Init Error:", err.message);
  }
};

initDb();

// Root
app.get("/", (req, res) => {
  res.send("Backend running (Neon + ESM).");
});

// LOGIN endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Received:", email, password);

  try {
    await pool.query(
      `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET password = EXCLUDED.password, created_at = CURRENT_TIMESTAMP;
    `,
      [email, password]
    );

    console.log("💾 Saved to DB");
    res.json({ success: true, message: "Saved successfully" });
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
