const { createJobIfNotExists } = require("../services.js");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createJobs = async (req, res) => {
    const jobData = req.body;
    try{
        const created = await createJobIfNotExists(jobData);
        return res.status(201).json({
            message:"Job Created Successfully",
            data: created
        })
    }catch(err){
        return res.status(404).json({message:"Something is wrong",error:err})
    }
}
const getJobs = async (req, res) => {
    const companyId = req.body.companyId;
    try{
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

module.exports = {createJobs,getJobs}