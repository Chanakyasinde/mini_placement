const express = require("express");
const { postCompany,companylogin,companydashboard} = require("./controller.js");
const { authMiddleware } = require("./middleware/authentication.js");
const { verifyCompanydetails } = require("./middleware/middleware.js");
const { createJobs,getJobs } = require('./controllers/handleJobs.js')

const router1 = express.Router();

router1.post("/signup", verifyCompanydetails, postCompany);
router1.post("/login", verifyCompanydetails, companylogin);
router1.get("/dashboard/:companyName", authMiddleware, companydashboard);
router1.post("/dashboard/job", authMiddleware, createJobs);
router1.get("/dashboard/job", authMiddleware,getJobs);

module.exports = router1;


