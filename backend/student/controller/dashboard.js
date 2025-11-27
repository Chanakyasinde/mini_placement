const {studentInformation} = require("../services/services")

const getDashboard = async (req,res) => {
    console.log("entered cotroller")
    const studentEmail = req.studentEmail;
    try{
        const getStudent = await studentInformation(studentEmail);
        const sanitizedStudent = {
            ...getStudent,
            phoneNumber: getStudent.phoneNumber.toString()
        };

        console.log(getStudent)
        return res.status(200).json({
            message:"Student Data",
            data: sanitizedStudent
        })
    }catch(err){
        return res.status(400).json({error:err})
    }
}

module.exports = { getDashboard }