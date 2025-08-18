import express from "express";
import { savedJob , getAllsavedJob,unsavejob } from "../models/savedpostModel";

const router = express.Router();

router.post("/saved_job" , savedJob);
router.get("/saved_job" , getAllsavedJob);
router.delete("saved_job/:jobId",unsavejob);

export default router;



