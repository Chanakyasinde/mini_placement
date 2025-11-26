const verifyCompanydetails = (req, res, next) => {
  const { companyName, email } = req.body;

  if (!companyName || typeof companyName !== "string" || companyName.trim() === "") {
    return res.status(400).json({
      error: "Company name is required and must be a non-empty string."
    });
  }

  if (!email || typeof email !== "string" || !email.includes("@") || email.trim() === "") {
    return res.status(400).json({
      error: "A valid email address is required."
    });
  }

  next();
};
module.exports = { verifyCompanydetails };

