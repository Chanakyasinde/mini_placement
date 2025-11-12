const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCompanyifnotExists = async (companyData) => {
  const { email, companyName } = companyData;
  const existingCompany = await prisma.companies.findFirst({
    where: { OR: [{ email }, { companyName }] }
  });

  if (existingCompany) {
    throw new Error('Company with this email or company name already exists');
  }
  const newCompany = await prisma.companies.create({
    data: companyData
  });

  return newCompany;
}


const checkCompanyExists = async (companyData) => {
  const { email, companyName } = companyData
  const existingCompany = await prisma.companies.findFirst({
    where: { OR: [{ email }, { companyName }] }
  });

  if (!existingCompany) {
    throw new Error('Invalid company name or email');
  }
  return existingCompany.companyName;
}

module.exports = { createCompanyifnotExists , checkCompanyExists};