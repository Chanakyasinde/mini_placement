const express = require("express");
const { postCompany,companylogin,companydashboard} = require("./controller.js");
const { authMiddleware } = require("./middleware/authentication.js");
const { verifyCompanydetails } = require("./middleware/middleware.js");

const router1 = express.Router();

router1.post("/signup", verifyCompanydetails, postCompany);
router1.post("/login", verifyCompanydetails, companylogin);
router1.get("/dashboard/:companyName", authMiddleware, companydashboard);

module.exports = router1;


