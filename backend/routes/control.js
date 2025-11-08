const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


exports.post_student = async (req,res) => {
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

exports.get_users = async (req,res) => {
    const { role,email, password } = req.body;
    if (!role || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(role == 'student'){
        try {
            
                const user1 = await prisma.students.findFirst({
                    where: { email: email }
                });
                
                if(!user1){
                    return res.status(401).json({ message: "Invalid username" });
                }
                const isMatch = await bcrypt.compare(password, user1.password);
                if (!isMatch) {
                return res.status(401).json({ message: "Invalid username or password" });
                }
                const token = jwt.sign({ id: user1.id, username: user1.student_name, role: role }, JWT_SECRET);
                const safeUser = {
                    ...user1,
                    phone_number: user1.phone_number.toString()
                  };
                  
                return res.status(200).json({ message: "Login successful", token, user: safeUser });

            }
        catch(err) {
                return res.status(500).json({ message: "Server error", error: err.message });
        }
    }
     else if (role == 'company'){
        try{
            const user2 = await prisma.companies.findFirst({
                where: {
                    email:email
                }
            })
            if(!user2){
                return res.status(401).json({ message: "Invalid username or password" });
            }
            const isMatch = await bcrypt.compare(password, user2.password);
            if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
            }
            const token = jwt.sign({ id: user2.id, username: user2.company_name, role: role }, JWT_SECRET);
            return res.status(200).json({ message: "Login successful", token });
        }
        catch(err){
            return res.status(500).json({ message: "Server error", error: err.message });
        }
    }
    else if (role == 'admin'){

        try{
            const user3 = await prisma.admins.findFirst({
                where: {
                    email:email
                }
            })
            if(!user3){
                return res.status(401).json({ message: "Invalid username or password" });
            }
            const isMatch = await bcrypt.compare(password, user3.password);
            if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
            }
            const token = jwt.sign({ id: user3.id, username: user3.admin_name, role: role }, JWT_SECRET);
            return res.status(200).json({ message: "Login successful", token });
        }
        catch(err){
                return res.status(500).json({ message: "Server error", error: err.message });
        }
    }
        
}