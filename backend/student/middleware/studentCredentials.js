const studentValidateSignUp = (req, res, next) => {
    const { studentName, phoneNumber, email, password } = req.body;
    if (!studentName || typeof studentName !== "string" || studentName.trim().length === 0) {
        return res.status(400).json({ message: "Invalid Student name" });
    }

    if (!phoneNumber || phoneNumber.trim().length !== 10 || isNaN(Number(phoneNumber))) {
        return res.status(400).json({ message: "Invalid Phone Number" });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    if (!password || typeof password !== "string" || password.trim().length < 6) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    next();
};

const studentValidateLogin = (req, res, next) => {
    const {  email,password } = req.body;

    if (!password || typeof password !== "string" || password.trim().length < 6) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    if (!email) {
        return res.status(400).json({ message: "Provide your email" });
    }
    if (email) {
        if (typeof email !== "string" || !email.includes("@")) {
            return res.status(400).json({ message: "Invalid Email" });
        }
    }

    next();
};

module.exports = { studentValidateSignUp,studentValidateLogin };