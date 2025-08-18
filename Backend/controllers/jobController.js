import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
        res.status(201).json({ message: "Job created successfully", job: newJob });
    }
    catch (error) {
        console.log("Create Job error " , error)
        res.status(500).json({ message: "Server Error", error });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find(); //return array
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

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

        const job = await Job.find({employerID : userId});
        res.status(200).json(job);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });

    }
}
// 687d375aff91e291842873bd
