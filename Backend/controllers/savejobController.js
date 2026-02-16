import { SavedJob } from "../models/savedpostModel.js";

export const savedJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    const check = await SavedJob.findOne({ userId, jobId });
    if (check) {
      return res.status(400).json({ message: "Already saved" });
    }

    const saveP = await SavedJob.create({ userId, jobId });
    res.status(201).json({ message: "Job saved successfully", saveP });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getAllsavedJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const savedJobs = await SavedJob.find({ userId }).populate("jobId");
    res.status(200).json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const unsaveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const deleted = await SavedJob.findOneAndDelete({ userId, jobId });
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Removed from saved jobs" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
