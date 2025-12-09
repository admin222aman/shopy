const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// ------------------------------------------------------
// 1️⃣ CONNECT TO NEON POSTGRESQL
// ------------------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Create users table if not exists
const initDb = async () => {
  try {
    const client = await pool.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Connected to Neon & users table ready.");
    client.release();
  } catch (err) {
    console.error("❌ Database initialization error:", err.message);
  }
};

initDb();

// ------------------------------------------------------
// 2️⃣ SERVE FRONTEND BUILD FROM dist/
// ------------------------------------------------------
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ------------------------------------------------------
// 3️⃣ LOGIN ROUTE (SAVE TO DATABASE)
// ------------------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Received login:", email, password);

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });
  }

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

    console.log("💾 Saved login to database.");
    res.json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error("❌ DB Save Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------
// 4️⃣ START SERVER
// ------------------------------------------------------
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
