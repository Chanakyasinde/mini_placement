const verifyCompanydetails = (req, res, next) => {
  const {companyName,email}= req.body;
  console.log(companyName,email);
  if (!companyName || typeof companyName !== "string" || companyName.trim() === "") {
      throw new Error("Company name is required and must be a string");
    }

  if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("A valid email address is required");
    }

  next();
}


module.exports = { verifyCompanydetails };
