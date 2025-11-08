const express = require("express");
const { postCompany} = require("../company/controller.js");
const { verifyCompanydetails } = require("../company/middleware.js");

const router1 = express.Router();

router1.post("/company", verifyCompanydetails, postCompany);

module.exports = router1;

