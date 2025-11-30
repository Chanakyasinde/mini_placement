const { studentInformation, fetchJobsForStudent, applicationToJob, studentUpdated } = require("../services/services");

const getDashboard = async (req, res) => {
    console.log("entered cotroller")
    const studentEmail = req.studentEmail;
    try {
        console.log("Fetching info for email:", studentEmail);
        const getStudent = await studentInformation(studentEmail);
        console.log("Student info retrieved:", getStudent);

        if (!getStudent) {
            console.error("Student not found for email:", studentEmail);
            return res.status(404).json({ error: "Student not found" });
        }

        const sanitizedStudent = {
            ...getStudent,
            phoneNumber: getStudent.phoneNumber.toString()
        };

        console.log(getStudent)
        return res.status(200).json({
            message: "Student Data",
            data: sanitizedStudent
        })
    } catch (err) {
        console.error("Controller Error:", err);
        return res.status(400).json({ error: err })
    }
}
const getJobsForStudent = async (req, res) => {
    const studentEmail = req.studentEmail;

    try {
        const studentJobs = await fetchJobsForStudent(studentEmail);
        return res.status(200).json({
            message: "Jobs sucesfully fetched",
            data: studentJobs
        });
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}
const updatedProfile = async (req, res) => {
    const studentEmail = req.studentEmail;
    const updateData = req.body
    try {
        const student = await studentUpdated(studentEmail, updateData);
        return res.status(200).json({ message: "Profile updated successfully", data: student })
    } catch (err) {
        return res.status(400).json({ message: "error while updating profile", error: err })
    }

}

const applyToJobs = async (req, res) => {
    const studentEmail = req.studentEmail;
    const { jobId } = req.body;
    try {
        const applicationResult = await applicationToJob(studentEmail, jobId);
        return res.status(201).json({ message: "Applied successfully", data: applicationResult })
    } catch (err) {
        return res.status(404).json({ message: "error while applying job", error: err })
    }
}

module.exports = { getDashboard, getJobsForStudent, applyToJobs, updatedProfile }