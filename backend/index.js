require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticate = require("./middleware/authenticate.js");
const authorize = require("./middleware/authorize.js");
const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();
const control = require('./routes/control.js')
app.use(cors());
app.use(express.json());
const users = [
  { id: 1, username: "admin1", password: "adminpass", role: "admin" },
  { id: 2, username: "company1", password: "companypass", role: "company" },
  { id: 3, username: "student1", password: "studentpass", role: "student" },
];
// Signup code is written in control.js to keep it clean
app.post("/signup", control.post_student);

// Login code is written in control.js to keep it clean
app.post("/login", control.get_students);


app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.send(`Welcome to admin dashboard, ${req.user.username}`);
});
app.get("/company", authenticate, authorize(["company"]), (req, res) => {
  res.send(`Welcome to company dashboard, ${req.user.username}`);
});
app.get("/student", authenticate, authorize(["student"]), (req, res) => {
  res.send(`Welcome to student dashboard, ${req.user.username}`);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});