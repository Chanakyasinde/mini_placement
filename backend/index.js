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

const companyRoutes = require("./company/routes.js");
app.use("/signup", companyRoutes);


// Signup code is written in control.js to keep it clean
// app.post("/signup", control.post_student);

// Login code is written in control.js to keep it clean
app.get("/login", control.get_users);


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