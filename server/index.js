// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Global Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure HTTP headers

// Sample Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Placement Tracker API!" });
});

// Global Error Handler (Must be last)export default app;

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
