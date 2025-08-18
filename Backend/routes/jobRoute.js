import express from "express";
import { createJob, getAllJobs, getJobById, updateJob,  deleteJob,  getEmployerJobs} from "../controllers/jobController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/jobs", verifyToken, createJob);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id",verifyToken,  getJobById);
router.patch("/jobs/:id", verifyToken, updateJob);
router.delete("/jobs/:id", verifyToken, deleteJob);
router.get("/employer/jobs", verifyToken, getEmployerJobs);

export default router;


// {
//     "message": "Login successful",
//     "user": {
//         "_id": "688d67b400fcf7f65d9ca3f9",
//         "name": "Himanshi",
//         "email": "infohimanshijoshi@gmail.com",
//         "password": "$2b$10$RPi5XS8ck8gnWsfbIdMp8ugX9/WdK2h8ng1UbPpWc7eL.PFSbE96a",
//         "contactNo": "07389767625",
//         "role": "employer",
//         "location": "Indore",
//         "skills": null,
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGQ2N2I0MDBmY2Y3ZjY1ZDljYTNmOSIsImVtYWlsIjoiaW5mb2hpbWFuc2hpam9zaGlAZ21haWwuY29tIiwicm9sZSI6ImVtcGxveWVyIiwiaWF0IjoxNzU1MTEyNTEwLCJleHAiOjE3NTUzNzE3MTB9.S_jezHMyY4do-0KK47x-SaCxGJVerKFqtAbF_dsWiKg"
// }
