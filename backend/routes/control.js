const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");
exports.get_student = async (req,res) => {
    const  {username,password,email,phone,resume_link}= req.body;
    const salt = 10
    if (!username || !password || !email || !phone) {
        return res.status(400).json({ message: "All fields are required" });
      }
    const user = await prisma.students.findFirst({
        where : {
            OR:[
                {email:email},
                {phone_number:phone}
            ]
        }
    })
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.students.create({
            data: {
                student_name : username,
                password: hashedPassword,
                phone_number: phone,
                email:email,
                resume_link:resume_link
            }
        })
        res.status(201).json({ message: "Signup successfully" });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
}
