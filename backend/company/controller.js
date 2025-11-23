const { createCompanyifnotExists,checkCompanyExists } = require('./services.js')
const postCompany = async (req, res) => {
  const companyData = req.body;
  console.log("Recienved in controller page",companyData);
  
  try {
    const newCompany = await createCompanyifnotExists(companyData);
    res.status(201).json(newCompany);
  } catch (error){
    res.status(400).json({ error: error.message });
  }
}

const companylogin = async (req, res) => {
  const companyData = req.body;
  try {
    const companyname = await checkCompanyExists(companyData);
    res.status(200).json(companyname);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}



module.exports = { postCompany , companylogin};