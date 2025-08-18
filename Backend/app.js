import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "./models/userModel.js";
import jobRouter from "./routes/jobRoute.js";
import appRouter from "./routes/applicationRoute.js";
import { Job } from "./models/jobModel.js";
import { Application } from "./models/appliactionModel.js";
import user from "./routes/userRoute.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
   credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", user);
app.use("/", jobRouter);
app.use("/", appRouter);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server started on port");
    });
  })
  .catch(error => {
    console.log("Database connection failed:", error);
  });
