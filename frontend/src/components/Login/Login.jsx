import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import image from "./login.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { loginSuccess } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import confetti from "canvas-confetti";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/validate";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const roleRequired = location.state?.roleRequired;
  const userFromSession = JSON.parse(sessionStorage.getItem("user"));

  const redirectTo =
    location.state?.redirectTo ||
    (userFromSession?.role === "employer"
      ? "/post-job"
      : "/find-work");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        data,
        { withCredentials: true }
      );

      const { user, token } = res.data;

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);

      dispatch(loginSuccess({ user, token }));

      toast.success("Login successful! Welcome back.");

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      navigate(
        user.role === "employer"
          ? "/post-job"
          : user.role === "worker"
          ? "/find-work"
          : redirectTo
      );
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center align-items-center">
        {/* LEFT FORM */}
        <div className="col-lg-5 col-md-6 mb-4">
          <div
            className="shadow p-3 rounded bg-white"
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <Link to="/" className="text-decoration-none">
              <p className="text-center text-primary mb-2" style={{ fontSize: "14px" }}>
                ← Back to Home
              </p>
            </Link>

            <h3 className="fw-bold text-center mb-1" style={{ color: "#0d6efd" }}>
              LabourLink
            </h3>
            <p className="text-center text-muted mb-3" style={{ fontSize: "13px" }}>
              Connecting Hands to Work
            </p>

            <p className="text-center fw-semibold mb-1">Welcome Back!</p>
            <p className="text-center" style={{ fontSize: "14px", marginBottom: "30px" }}>
              {roleRequired === "worker"
                ? "Sign in as Worker to continue"
                : roleRequired === "employer"
                ? "Sign in as Employer to continue"
                : "Sign in to continue"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                size="small"
                className="mb-3"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                size="small"
                className="mb-2"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ textTransform: "none", mt: 3 }}
              >
                Sign In
              </Button>
            </form>

            <p className="text-center mt-3" style={{ fontSize: "13px" }}>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-lg-5 col-md-6 text-center">
          <img
            src={image}
            style={{ width: "300px", height: "300px" }}
            alt="labourimage"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
