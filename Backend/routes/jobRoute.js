import express from "express";
import { createJob, getAllJobs, getJobById, updateJob,  deleteJob,  getEmployerJobs,updateStatus} from "../controllers/jobController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/jobs", verifyToken, createJob);
router.get("/jobs",verifyToken, getAllJobs);
router.get("/jobs/:id",verifyToken,  getJobById);
router.patch("/jobs/:id", verifyToken, updateJob);
router.delete("/jobs/:id", verifyToken, deleteJob);
router.get("/employer/jobs", verifyToken, getEmployerJobs);
router.patch("/jobs/:id/status" ,verifyToken, updateStatus);

export default router;
