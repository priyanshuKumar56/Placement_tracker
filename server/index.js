// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pool = require("./config/db");
const app = express();

// Global Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure HTTP headers
// Database Connection Test

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Placement Tracker API!" });
});





app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
    [name, email, age],
  );
  res.json(result.rows[0]);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *",
    [name, email, age, id],
  );
  res.json(result.rows[0]);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
