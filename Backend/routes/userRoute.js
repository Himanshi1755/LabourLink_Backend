import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { body } from "express-validator";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup",
  body("name", "name is required ").notEmpty(),
  body("name", "Only alphaets are allowed").isAlpha(),
  body("email", " Email is required").notEmpty(),
  body("email", "Email is not valid").isEmail(),
  body("password", "pasword is requires").notEmpty(),
  // body("contactNo").if(body("role").equals("worker")).notEmpty().withMessage("contact number is required").isNumeric().withMessage("Only digits are allowed"),
  body("location").if(body("role").equals("worker")).notEmpty().withMessage("location is required"),
  body("skills").if(body("role").equals("worker")).notEmpty().withMessage("skill is required"), registerUser);

router.post("/login",
  body("email", "Valid email required").isEmail(),
  body("password", "Password is required").notEmpty(),
  loginUser
);
router.get("/user/profile", verifyToken, getUserProfile);
router.patch("/user/profile", verifyToken, updateUserProfile);


export default router;


