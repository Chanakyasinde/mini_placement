const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const createCompanyifnotExists = async (companyData) => {
  const { email, companyName } = companyData;
  const existingCompany = await prisma.companies.findFirst({
    where: { OR: [{ email }, { companyName }] }
  });

  if (existingCompany) {
    throw new Error('Company with this email or company name already exists');
  }
  const newCompany = await prisma.companies.create({
    data: {
      companyName: companyData.companyName,
      email: companyData.email,
      password: await bcrypt.hash(companyData.password, 10),
      address: companyData.address,
      phone: companyData.phone,
      website: companyData.website,
      description: companyData.description
    }
  });

  return newCompany;
}


const existingCompany = async (email) => {
  const company = await prisma.companies.findFirst({
    where: { email: email }
  });

  if (!company) {
    throw new Error('Invalid company name or email');
  }
  return company;
}

module.exports = { createCompanyifnotExists , existingCompany};