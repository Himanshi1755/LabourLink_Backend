import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Application } from "../models/appliactionModel.js";
dotenv.config();

export const createJob = async (req, res) => {
    try {
        // const {title,description,wage,location,requiredSkills,employerID,postedAt} = req.body;
        const user = req.user;
        // const data = req.body;

        if (user.role != "employer") {
            return res.status(403).json({ message: "Only employers can post jobs" });
        }
        const newJob = await Job.create({ ...req.body, employerID: user.id });
        console.log("Respose job body : ", req.body);
        res.status(201).json({ message: "Job created successfully", job: newJob });
    }
    catch (error) {
        console.log("Create Job error ", error)
        res.status(500).json({ message: "Server Error", error });
    }
}

// export const getAllJobs = async (req, res) => {
//     try {
//         const jobs = await Job.find(); 


//         res.status(200).json(jobs);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// }


export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    // agar user login hai aur role worker hai
    if (req.user && req.user.role === "worker") {
      const workerId = req.user.id;

      const applications = await Application.find({ workerID: workerId });
      const appliedJobIds = applications.map(app => app.jobID.toString());

      const jobsWithApplied = jobs.map(job => ({
        ...job._doc,
        isApplied: appliedJobIds.includes(job._id.toString())
      }));

      return res.status(200).json(jobsWithApplied);
    }


    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });

    }
}

export const updateJob = async (req, res) => {
    try {
        const user = req.user;
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (job.employerID.toString() !== user.id) {
            return res.status(403).json({ message: "Unauthorized User ! update this job" });
        }

        await Job.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: "Job updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });

    }
}

export const deleteJob = async (req, res) => {
    try {

        const user = req.user;

        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.employerID.toString() !== user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this job" });
        }

        await Job.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getEmployerJobs = async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;

        if (user.role !== "employer") {
            return res.status(401).json("Unauthorized User");
        }

        const job = await Job.find({ employerID: userId });
        res.status(200).json(job);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });

    }
}

export const updateStatus = async (req, res) => {
    try {

    //      if (req.user.role !== "employer") {
    //   return res.status(403).json({ message: "Only employer can update job status" });
    // }

    //
    // const { status } = req.body;
    
        let job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.employerID.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized " });

        }
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
         { status: req.body.status } ,
            { new: true, runValidators: false }
        );
        console.log("Updated Staus  : ", updatedJob);
        console.log("User in updateStatus:", req.user);
        console.log("req.body:", req.body);
        res.status(200).json({ message: "Status updated", job: updatedJob });
    } catch (error) {
        console.log("status update error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
}

