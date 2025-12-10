const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    const completeToken = req.headers.authorization
    const token = completeToken.split(" ")[1]

    if (!token) {
        return res.status(404).json({ message: "Token not found" })
    }
    try {
        const verification = jwt.verify(token, JWT_SECRET)
        req.studentEmail = verification.email
        next()
    } catch (err) {
        return res.status(404).json({ message: "Error occured in Middleware", error: err })
    }

}
module.exports = { authMiddleware }