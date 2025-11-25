const express = require("express");
const { postCompany,companylogin} = require("../controllers/controller.js");
const { verifyCompanydetails } = require("../middleware/middleware.js");

const router1 = express.Router();

router1.post("/signup", verifyCompanydetails, postCompany);
router1.post("/login", verifyCompanydetails, companylogin);

module.exports = router1;

