const express = require('express');
const router = express.Router();

const { studentValidateSignUp,studentValidateLogin } = require('../middleware/studentCredentials');
const { studentSignUp, studentLogin } = require('../controller/controller');

router.post('/signup', studentValidateSignUp, studentSignUp);
router.post('/login', studentValidateLogin, studentLogin);

module.exports = router;
