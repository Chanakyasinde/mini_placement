const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" });
  }
  
  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, userCheck) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = userCheck;
    next();
  });
  
};

module.exports = authenticate