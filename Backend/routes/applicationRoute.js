import express from "express";
import {applyToJob,getMyApplications,getApplicantsByJob, getAllJobsWithApplicants,updateApplicationStatus,deleteAppliedJobs} from "../controllers/appController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/apply", verifyToken, applyToJob);
router.get("/apply", verifyToken, getMyApplications);
router.get("/employer/:jobId/applicants", verifyToken, getApplicantsByJob);
router.get("/employer/jobs-with-applicants" , verifyToken , getAllJobsWithApplicants)
router.patch("/apply/:id", verifyToken, updateApplicationStatus);
router.delete("/apply/:id" , verifyToken , deleteAppliedJobs);

export default router;