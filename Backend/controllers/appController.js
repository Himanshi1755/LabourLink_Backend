import { Application } from "../models/appliactionModel.js";
import { Job } from "../models/jobModel.js";
import mongoose from "mongoose";

export const applyToJob = async (req, res) => {
    try {
         if (req.user.role !== "worker") {
            return res.status(403).json({ message: "Only workers can apply for jobs." });
        }
        const workerId = req.user.id;
        const { jobID } = req.body;

        const existing = await Application.findOne({ workerID: workerId, jobID});
        if (existing) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        const application = await Application.create({
            workerID: workerId,
            jobID: jobID
        });
        res.status(201).json({ message: "Applied successfully", application });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
    }
};

export const getMyApplications = async (req, res) => {
    try {
         if (req.user.role !== 'worker') {
            return res.status(403).json({ message: "Access denied. Workers only." });
        }
        const workerId = req.user.id;
        
        const applications = await Application.find({ workerID: workerId }).populate("jobID");

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export const getApplicantsByJob = async (req, res) => {
    try {

        if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers allowed" });
    }
    
        const jobId = req.params.jobId;
        //   const { jobId } = req.params;
        const applications = await Application.find({jobID : jobId }).populate("workerID" ,"name email contactNo skills location");

        res.status(200).json({message : "Applicants : ",applications});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAllJobsWithApplicants = async (req, res) => {
  try {
     if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers allowed" });
    }

    const employerId = req.user.id; 

   
    const jobs = await Job.find({ employerID: employerId });


    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await Application.find({ jobID: job._id })
          .populate("workerID", "name email contactNo skills location"); 

        return {
          ...job._doc,
          applicants,
        };
      })
    );

    res.status(200).json(jobsWithApplicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs with applicants" });
  }
};


// export const updateApplicationStatus = async (req, res) => {
//     try {
//         if (req.user.role !== "employer") {
//       return res.status(403).json({ message: "Only employer allowed" });
//     }
//         const appId = req.params.id;
//         const { status } = req.body;
//         const check = await Application.findOne({_id : appId});
//         if (!check) {
//             return res.status(404).json("Application not found");
//         }
//     //  const updated=   await Application.updateOne({_id :  appId }, status);
// check.status = status;
// await check.save();

// res.status(200).json({ message: "Status updated", application: check });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };


// export const updateApplicationStatus = async (req, res) => {
//   try {
//     if (req.user.role !== "employer") {
//       return res.status(403).json({ message: "Only employer allowed" });
//     }
// const appId = req.params.id; 
//     const { status } = req.body;
//     const app = await Application.findById(appId).populate("jobID");

//     if (!app) return res.status(404).json({ message: "Application not found" });

//     if (app.jobID.employerID.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     app.status = req.body.status;
//     await app.save();

//     res.status(200).json({ message: "Status updated", app });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


export const updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employer allowed" });
    }

    const appId = req.params.id;
    const { status } = req.body;

    const app = await Application.findById(appId);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🔥 get job separately
    const job = await Job.findById(app.jobID);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🔥 correct employer check
    if (job.employerID.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not your job" });
    }

    app.status = status;
    await app.save();

    res.status(200).json({ message: "Status updated", app });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAppliedJobs = async (req, res) => {
    try {
        const appId = req.params.id;
        const workerId = req.user.id;

        const application = await Application.findOne({ _id: appId, workerID: workerId });
        if (!application) return res.status(404).json({ message: "Application not found" });

        await Application.deleteOne({ _id: appId });
        res.status(200).json({ message: "Application withdrawn successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



