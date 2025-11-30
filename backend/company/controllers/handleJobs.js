const { createJobIfNotExists } = require("../services.js");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createJobs = async (req, res) => {
    try {
        const email = req.companyEmail
        const company = await prisma.companies.findFirst({
            where: { email: email }
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        const companyId = company.companyId;
        const jobData = {
            ...req.body,
            companyId: companyId 
        };

        const created = await createJobIfNotExists(jobData);
        
        return res.status(201).json({
            message: "Job Created Successfully",
            data: created
        });
    } catch (err) {

        console.error("Create Job Error:", err); 
        return res.status(500).json({
            message: "Something is wrong",
            error: err.message 
        });
    }
}
const getJobs = async (req, res) => {

    try{
        const email = req.companyEmail
        const company = await prisma.companies.findFirst({
            where: { email: email }
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        const companyId = company.companyId;
        const jobs = await prisma.jobs.findMany({
            where: {companyId:companyId}
        });
        return res.status(200).json({
            message:"Jobs fetched Successfully",
            data: jobs
        })
    }catch(err){
        return res.status(404).json({message:"Something is wrong",error:err})
    }
}

const getJobById = async (job_id) => {
    const job = await prisma.jobs.findUnique({
        where: { jobId: job_id },
    });
    if (!job) {
        throw new Error('Job not found');
    }
    return job;
}

const updateJob = async (job_id,updateData) => {
    const updatedJob = await prisma.jobs.update({
        where: { jobId: job_id },
        data: updateData,
    });
    return updatedJob;
}

const deleteJob = async (job_id) => {
    await prisma.jobs.delete({
        where: { jobId: job_id },
    });
    return;
}


module.exports = {createJobs,getJobs,updateJob,deleteJob,getJobById};