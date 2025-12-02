const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET



const authMiddleware = (req, res, next) => {
    console.log("Entered the authMiddlware")
    const completeToken = req.headers.authorization
    if (!completeToken) return res.status(401).json({ message: "Authorization header missing" });

    const token = completeToken.split(" ")[1]

    if (!token) {
        return res.status(404).json({ message: "Token not found" })
    }
    try {
        const verification = jwt.verify(token, JWT_SECRET)
        console.log("Token verified, payload:", verification);
        req.adminEmail = verification.email
        next()
    } catch (err) {
        console.error("Middleware Error:", err);
        return res.status(404).json({ message: "Error occured in Middleware", error: err })
    }

}

const adminValidateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    if (!password || typeof password !== "string" || password.trim().length < 6) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    next();
};

const adminValidateSignup = (req, res, next) => {
    const { admin_name, email, password } = req.body;
    if (!admin_name || typeof admin_name !== "string") {
        return res.status(400).json({ message: "Invalid Admin Name" });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!password || typeof password !== "string" || password.trim().length < 6) {
        return res.status(400).json({ message: "Invalid Password (min 6 chars)" });
    }
    next();
};

module.exports = { authMiddleware, adminValidateLogin, adminValidateSignup }