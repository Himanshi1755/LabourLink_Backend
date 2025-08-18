import express from "express";
import {applyToJob,getMyApplications,getApplicantsByJob, getAllJobsWithApplicants,updateApplicationStatus} from "../controllers/appController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/apply", verifyToken, applyToJob);
router.get("/apply", verifyToken, getMyApplications);
router.get("/employer/:jobId", verifyToken, getApplicantsByJob);
router.get("/employer" , verifyToken , getAllJobsWithApplicants)
router.patch("/apply/:id", verifyToken, updateApplicationStatus);

export default router;