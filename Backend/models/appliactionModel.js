import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    workerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
},
{timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
