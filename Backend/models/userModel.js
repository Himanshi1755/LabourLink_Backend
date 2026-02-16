import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    contactNo: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['worker', 'employer']
    },
    location: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: false
    }
});

export const User = mongoose.model("user", userSchema);