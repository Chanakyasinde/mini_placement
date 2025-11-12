const express = require("express");
const { postCompany,companylogin} = require("../company/controller.js");
const { verifyCompanydetails } = require("../company/middleware.js");

const router1 = express.Router();

router1.post("/signup", verifyCompanydetails, postCompany);
router1.post("/login", verifyCompanydetails, companylogin);

module.exports = router1;

