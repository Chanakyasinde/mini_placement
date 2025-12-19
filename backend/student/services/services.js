const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')
const prisma = new PrismaClient();
const salt = 10

const createStudentSignup = async (studentData) => {
    const phoneAsBigInt = BigInt(studentData.phoneNumber);
    const alreadyExists = await prisma.students.findFirst({
        where: {
            OR: [
                { email: studentData.email },
                { phoneNumber: phoneAsBigInt }
            ]
        }
    })
    if (alreadyExists) {
        throw new Error("Student with given email or phone number already exists");
    }
    const hashedPass = await bcrypt.hash(studentData.password, salt)

    const created = await prisma.students.create({
        data: {
            studentName: studentData.studentName,
            email: studentData.email,
            password: hashedPass,
            phoneNumber: phoneAsBigInt,
            college: studentData.college,
            cgpa: studentData.cgpa || null,
            yearOfPassing: studentData.yearOfPassing || null,
            resume_link: studentData.resume_link,
        }
    });
    return created


}

const checkStudentLogin = async (studentData) => {
    const checkLogin = await prisma.students.findFirst({
        where: { email: studentData.email }
    })

    if (!checkLogin) {
        throw new Error("Student with the credentials not found")
    }
    const comparedPass = await bcrypt.compare(studentData.password, checkLogin.password)

    if (!comparedPass) {
        throw new Error("student has entered incorrect password")
    }

    return checkLogin

}

const studentInformation = async (studentEmail) => {
    const studentInfo = await prisma.students.findUnique({
        where: {
            email: studentEmail
        }
    })

    return studentInfo
}

const fetchJobsForStudent = async (studentEmail) => {
    const job = await prisma.jobs.findMany({
        where: {
            isActive: true,
            company: {
                status: true
            }
        },
        include: {
            company: true,
            skills: true
        },
    })
    return job
}
const applicationToJob = async (studentEmail, jobId) => {
    const student = await prisma.students.findFirst({
        where: {
            email: studentEmail
        }
    });
    if (!student) {
        throw new Error("Student not found");
    }
    const existingApplication = await prisma.applications.findFirst({
        where: {
            studentId: student.student_id,
            jobId: jobId
        }
    })
    if (existingApplication) {
        throw new Error("Already applied to the job before")
    }
    const applied = await prisma.applications.create({
        data: {
            studentId: student.student_id,
            jobId: jobId
        }
    })
    return applied
}

const studentUpdated = async (studentEmail, updateData) => {
    const allowedFields = ['studentName', 'phoneNumber', 'college', 'cgpa', 'yearOfPassing', 'resume_link'];

    const dataToUpdate = {};

    allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
            dataToUpdate[field] = updateData[field];
        }
    });

    if (dataToUpdate.phoneNumber) {
        dataToUpdate.phoneNumber = BigInt(dataToUpdate.phoneNumber);
    }

    const info = await prisma.students.update({
        where: { email: studentEmail },
        data: dataToUpdate
    })
    return info
}

const fetchAppliedJobs = async (studentEmail) => {
    console.log("Entered fetch applied jobs service", studentEmail)
    const appliedStudents = await prisma.students.findFirst({
        where: {
            email: studentEmail
        }
    })
    const application = await prisma.applications.findMany({
        where: {
            studentId: appliedStudents.student_id
        },
        include: {
            job: {
                include: {
                    company: true
                }
            }
        }
    })
    console.log("Applied jobs fetched:", application)
    return application
}
const totalJobs = async (req, res) => {
    try {
        const jobs = await prisma.jobs.findMany({
            where: {
                isActive: true,
                company: {
                    status: true
                }
            },
            include: {
                company: true,
                skills: true
            }
        })
        return res.status(200).json(jobs)
    } catch (error) {
        console.error("Error fetching total jobs:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = { createStudentSignup, checkStudentLogin, studentInformation, fetchJobsForStudent, applicationToJob, studentUpdated, fetchAppliedJobs, totalJobs }