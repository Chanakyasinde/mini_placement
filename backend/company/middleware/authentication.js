const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader ? 'Present' : 'Missing');

  const token = authHeader?.split(" ")[1];
  console.log('Token extracted:', token ? 'Yes' : 'No');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    console.log('JWT_SECRET available:', !!JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token verified successfully for:', decoded.email);
    req.companyEmail = decoded.email;

    next();

  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
module.exports = { authMiddleware };