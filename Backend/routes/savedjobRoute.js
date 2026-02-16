import express from "express";
import { savedJob , getAllsavedJob,unsaveJob } from "../controllers/savejobController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/saved_job" , verifyToken , savedJob);
router.get("/saved_job" , verifyToken ,getAllsavedJob);
router.delete("/saved_job/:jobId",verifyToken , unsaveJob);

export default router;



