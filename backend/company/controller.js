const { createCompanyifnotExists,existingCompany} = require('./services.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


const postCompany = async (req, res) => {
  const companyData = req.body;
  try {
    const newCompany = await createCompanyifnotExists(companyData);
    res.status(201).json(newCompany);
  } catch (error){
    res.status(400).json({ error: error.message });
  }
}


const companylogin = async (req, res) => {
  const {email,loginpassword} = req.body;
  try{
    const existingCompany = await checkCompanyExists( email );
    const storedPassword = existingCompany.password;
    const passwordMatch = await bcrypt.compare(loginpassword, storedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });

    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ 
      message: 'Login successful', 
      token 
    });

  }
  catch(error){
    res.status(400).json({ error: error.message });
}}

const companydashboard = async (req, res) => {
  try {
  
    const loggedInEmail = req.companyEmail; // From authentication middleware
    const company = await existingCompany(loggedInEmail);

    const company_name= company.companyName;

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const paramCompanyName = req.params.companyName;

    // Authorization check
    if (company.companyName !== paramCompanyName) {
      return res.status(403).json({ 
        error: "Unauthorized: You cannot access another company's dashboard" 
      });
    }
    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      company: {
        id: company.companyId ,
        name: company.companyName,
        email: company.email,
        industry: company.industry,
        location: company.location,
        website: company.website,
        companyType: company.companyType,
        jobsPosted: company.jobs
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { postCompany , companylogin, companydashboard };