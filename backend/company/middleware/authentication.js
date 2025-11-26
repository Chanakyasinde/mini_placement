const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.companyEmail = decoded.email;

    next();

  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
module.exports = {authMiddleware};