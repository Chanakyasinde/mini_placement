const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    console.log("Entered the authMiddlware")
    const completeToken = req.headers.authorization
    console.log("Auth Header:", completeToken);

    const token = completeToken && completeToken.split(" ")[1]
    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(404).json({ message: "Token not found" })
    }
    try {
        console.log("Verifying token:", token);
        const verification = jwt.verify(token, JWT_SECRET)
        console.log("Token verified, payload:", verification);
        req.studentEmail = verification.email
        next()
    } catch (err) {
        console.error("Middleware Error:", err);
        return res.status(404).json({ message: "Error occured in Middleware", error: err })
    }

}
module.exports = { authMiddleware }