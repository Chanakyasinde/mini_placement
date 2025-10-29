const PrismaClient = require('@prisma/client')
const prisma = new PrismaClient()

exports.get_student = async (req,res) => {
    const user = await prisma.students.findFirst({
        where : {
            OR:[
                {email:email},
                {phone:phone}
            ]
        }
    })
}