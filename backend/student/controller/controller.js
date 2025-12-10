const { createStudentSignup,checkStudentLogin } = require('../services/services.js')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const studentSignUp = async (req, res) => {
    const studentData = req.body;

    try {
        const Newstudent = await createStudentSignup(studentData)
        
        const sanitizedStudent = {
            ...Newstudent,
            phoneNumber: Newstudent.phoneNumber.toString()
        };

        const token = jwt.sign({ email: sanitizedStudent.email }, JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({ 
            message: 'Signup successful', 
            data: sanitizedStudent,
            token :token
            });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const studentLogin = async (req, res) => {
    try {
        const studentData = req.body;
        const student = await checkStudentLogin(studentData);

        const sanitizedStudent = {
            ...student,
            phoneNumber: student.phoneNumber.toString()
        };


        const token = jwt.sign({ email: sanitizedStudent.email }, JWT_SECRET, { expiresIn: '7d' });
        
        return res.status(200).json({ 
            message: 'Login successful', 
            data: sanitizedStudent,
            token :token
            });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { studentSignUp,studentLogin };
