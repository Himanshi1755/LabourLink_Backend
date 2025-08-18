import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, contactNo, role, location, skills } = req.body;

        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad Request", errorMessages: errors.array() });
        }

        
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            contactNo,
            role,
            location,
            skills
        });

        return res.status(201).json({ message: "Registered Successfully", user: newUser });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

// ===================== LOGIN =====================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad Request", errorMessages: errors.array() });
        }

        // Find user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        
        const token = generateToken(user);

        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ===================== GET USER PROFILE =====================
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Get profile error:", err);
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// ===================== UPDATE USER PROFILE =====================
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.updateOne({ _id: userId }, data);

        return res.status(200).json({ message: "Updated successfully" });
    } catch (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// ===================== HELPER FUNCTION =====================
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "3d" });
};

