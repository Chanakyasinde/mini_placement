const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { adminLoginService, statusUpdateService, getAllCompaniesService, createAdminService } = require('./services');
const JWT_SECRET = process.env.JWT_SECRET
const salt = 10

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminAccess = await adminLoginService(email, password);
        const validPassword = await bcrypt.compare(password, adminAccess.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ email: adminAccess.email }, JWT_SECRET, { expiresIn: '7d' })
        return res.status(200).json({ message: "Admin logged in successfully", token: token })
    } catch (err) {
        return res.status(404).json({ message: "Error occured during admin login", error: err.message })
    }
}

const companyStatusUpdate = async (req, res) => {
    const { companyId, status } = req.body;
    const adminEmail = req.adminEmail;

    try {
        const CompanyHere = await statusUpdateService(companyId, status, adminEmail);
        return res.status(200).json({ message: "Company status updated successfully" });
    } catch (err) {
        return res.status(404).json({ message: "Error occured during company status update", error: err.message });
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const companies = await getAllCompaniesService();
        return res.status(200).json({ message: "Companies fetched successfully", companies });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching companies", error: err.message });
    }
}



const adminSignup = async (req, res) => {
    try {
        const adminData = req.body;
        const newAdmin = await createAdminService(adminData);
        return res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (err) {
        return res.status(400).json({ message: "Error creating admin", error: err.message });
    }
}

module.exports = { adminLogin, companyStatusUpdate, getAllCompanies, adminSignup }