const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const usersPath = path.join(__dirname, "users.json");

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.cookie("auth", username, { httpOnly: true });
    return res.json({ success: true });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

// Register route
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: "User already exists" });
  }

  users.push({ username, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.json({ success: true });
});

// Auth check route
app.get("/api/checkAuth", (req, res) => {
  const { auth } = req.cookies;
  res.json({ loggedIn: !!auth });
});

// Logout route
app.post("/api/logout", (req, res) => {
  res.clearCookie("auth");
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
