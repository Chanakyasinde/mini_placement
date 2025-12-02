const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const salt = 10;

const adminLoginService = async (email, password) => {

    const admin = await prisma.admins.findFirst({
        where: { email: email }
    })
    if (!admin) {
        throw new Error("Admin with given credentials not found")
    }
    return admin
}
const statusUpdateService = async (companyId, status, adminEmail) => {
    const admin = await prisma.admins.findFirst({
        where: { email: adminEmail }
    })
    if (!admin) {
        throw new Error("Unauthorized: Admin not found")
    }

    const updateStatus = await prisma.companies.update({
        where: { companyId: companyId },
        data: { status: status }
    })
    return updateStatus
}

const getAllCompaniesService = async () => {
    const companies = await prisma.companies.findMany();
    return companies;
}

const createAdminService = async (adminData) => {
    const { admin_name, email, password } = adminData;
    const existingAdmin = await prisma.admins.findUnique({
        where: { email: email }
    });

    if (existingAdmin) {
        throw new Error("Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await prisma.admins.create({
        data: {
            admin_name,
            email,
            password: hashedPassword
        }
    });
    return newAdmin;
}

module.exports = { adminLoginService, statusUpdateService, getAllCompaniesService, createAdminService }