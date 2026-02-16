import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    wage: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: false,
        // enum: ["Full-time", "Part-time", "Contract", "Internship"],
        default: "Full-time"
    },
    requiredSkills: {
        type: [String],
        required: false,
        default: [],
    },
    startDate: {
        type: Date,
        required: false,
        default: null
    },
    duration: {
        type: String,
        required: false,
    },
    employerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Job = mongoose.model("job", jobSchema);