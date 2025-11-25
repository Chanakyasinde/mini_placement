const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied. No user role found." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. You do not have permission." });
    }

    next();
  };
};

module.exports = authorize;
