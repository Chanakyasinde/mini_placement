 const { createStudentSignup,checkStudentLogin } = require('../services/services.js')
const studentSignUp = async (req, res) => {
    const studentData = req.body;

    try {
        const Newstudent = await createStudentSignup(studentData)
        
        const sanitizedStudent = {
            ...Newstudent,
            phoneNumber: Newstudent.phoneNumber.toString()
        };

        return res.status(200).json({
            message: "Successfully passed the controllers",
            student: sanitizedStudent
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


        res.status(200).json({
            message: "Login successful",
            student: sanitizedStudent
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { studentSignUp,studentLogin };
