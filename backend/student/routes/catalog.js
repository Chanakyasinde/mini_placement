const express = require('express');
const router = express.Router();

const { studentValidateSignUp, studentValidateLogin } = require('../middleware/studentCredentials');
const { studentSignUp, studentLogin } = require('../controller/controller');
const { authMiddleware } = require('../middleware/authentication');
const { getDashboard, getJobsForStudent, applyToJobs, updatedProfile,jobsApplied  } = require('../controller/dashboard')
const { totalJobs } = require('../services/services')

router.post('/signup', studentValidateSignUp, studentSignUp);
router.post('/login', studentValidateLogin, studentLogin);
router.get('/dashboard', authMiddleware, getDashboard);
router.put('/dashboard/profile', authMiddleware, updatedProfile)
router.get('/dashboard/jobsStudent', getJobsForStudent);
router.post('/apply', authMiddleware, applyToJobs)
router.get('/jobsApplied', authMiddleware,jobsApplied )
router.get("/verify", authMiddleware, (req, res) => {
  res.status(200).json({ valid: true });
});
router.get('/totalJobs',totalJobs)
module.exports = router;
