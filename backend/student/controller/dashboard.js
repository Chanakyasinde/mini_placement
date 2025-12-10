const { studentInformation, fetchJobsForStudent, applicationToJob, studentUpdated, fetchAppliedJobs } = require("../services/services");

const getDashboard = async (req, res) => {
    const studentEmail = req.studentEmail;
    try {
        const getStudent = await studentInformation(studentEmail);

        if (!getStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        const sanitizedStudent = {
            ...getStudent,
            phoneNumber: getStudent.phoneNumber.toString()
        };
        return res.status(200).json({
            message: "Student Data",
            data: sanitizedStudent
        })
    } catch (err) {
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

        const sanitizedStudent = {
            ...student,
            phoneNumber: student.phoneNumber ? student.phoneNumber.toString() : null
        };

        return res.status(200).json({ message: "Profile updated successfully", data: sanitizedStudent })
    } catch (err) {
        return res.status(400).json({ message: "error while updating profile", error: err.message || err })
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

const jobsApplied = async (req, res) => {
    const studentEmail = req.studentEmail;
    try {
        const appliedJobs = await fetchAppliedJobs(studentEmail);
        return res.status(200).json({ message: "Applied jobs fetched successfully", data: appliedJobs })
    } catch (err) {
        return res.status(400).json({ message: "error while fetching applied jobs", error: err })
    }
}

module.exports = { getDashboard, getJobsForStudent, applyToJobs, updatedProfile, jobsApplied }