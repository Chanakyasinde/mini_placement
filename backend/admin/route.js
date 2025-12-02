const express = require('express');
const { adminValidateLogin, authMiddleware, adminValidateSignup } = require('./middleware');
const { adminLogin, companyStatusUpdate, getAllCompanies, adminSignup } = require('./controller');
const router2 = express.Router();

router2.post('/signup', adminValidateSignup, adminSignup);
router2.post('/login', adminValidateLogin, adminLogin);
router2.put('/companyValidate', authMiddleware, companyStatusUpdate);
router2.get('/companies', authMiddleware, getAllCompanies);
router2.delete("/delete/:id", (req, res) => {
  return res.status(403).json({ message: "Admin cannot be deleted. Only one admin allowed." });
});

module.exports = router2;