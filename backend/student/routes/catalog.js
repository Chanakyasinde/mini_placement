const express = require('express');
const router = express.Router();

const { studentValidateSignUp,studentValidateLogin } = require('../middleware/studentCredentials');
const { studentSignUp, studentLogin } = require('../controller/controller');
const { authMiddleware } = require('../middleware/authentication');
const { getDashboard,getJobsForStudent,applyToJobs } = require('../controller/dashboard')

router.post('/signup', studentValidateSignUp, studentSignUp);
router.post('/login', studentValidateLogin, studentLogin);
router.get('/dashboard',authMiddleware, getDashboard);
router.get('/dashboard/jobsStudent', getJobsForStudent);
router.post('/apply',authMiddleware, applyToJobs)

module.exports = router;
