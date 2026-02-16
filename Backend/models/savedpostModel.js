import mongoose from "mongoose"

const savedpostschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true,
    },
    savedAt: {
        type: Date,
        default: Date.now
    },
});

export const SavedJob = mongoose.model("savedJob", savedpostschema);