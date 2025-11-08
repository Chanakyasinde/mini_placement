const { createCompanyifnotExists } = require('../company/services.js')
const postCompany = async (req, res) => {
  const companyData = req.body;
  console.log("Received company data:", companyData);
  try {
    const newCompany = await createCompanyifnotExists(companyData);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = { postCompany };