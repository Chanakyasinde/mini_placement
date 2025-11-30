const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt')
const prisma = new PrismaClient();
const salt = 10

const createStudentSignup = async (studentData) => {
    console.log("Entered services page")

    const phoneAsBigInt = BigInt(studentData.phoneNumber);

    const alreadyExists = await prisma.students.findFirst({
        where: {
            OR:[
                {email : studentData.email},
                {phoneNumber : phoneAsBigInt}
            ]
        }
    })
    if(alreadyExists){
        throw new Error("Student with given email or phone number already exists");
    }
    const hashedPass = await bcrypt.hash(studentData.password,salt)

    const created = await prisma.students.create({
        data:{ 
            ...studentData,
            phoneNumber:phoneAsBigInt,
            password: hashedPass
        }
    })
    return created


}

const checkStudentLogin = async (studentData) => {
    console.log("Entered check student login service")
    
    const checkLogin = await prisma.students.findFirst({
        where: {email : studentData.email}
    })

    if(!checkLogin){
        throw new Error("Student with the credentials not found")
    }
    const comparedPass = await bcrypt.compare(studentData.password,checkLogin.password)

    if(!comparedPass){
        throw new Error("student has entered incorrect password")
    }

    return checkLogin

}

const studentInformation = async (studentEmail) => {
    console.log("entered services of dashboard")
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
            isActive: true
        }
    })
    return job
}
module.exports = {createStudentSignup,checkStudentLogin,studentInformation,fetchJobsForStudent}