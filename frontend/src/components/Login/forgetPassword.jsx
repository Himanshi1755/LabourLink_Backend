import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import image from "./login.png"; 
const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      // Simulate or send request to API
      // await axios.post("http://localhost:3000/user/forgot-password", { email });
      toast.success("Reset link sent to your email");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 col-md-6 mb-4">
          <div
            className="shadow p-3 rounded bg-white"
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <p
              className="text-center text-primary mb-2"
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              ← <Link to="/">Back to Home</Link>
            </p>

            <h3 className="fw-bold text-center mb-1" style={{ color: "#0d6efd" }}>
              LabourLink
            </h3>
            <p className="text-center text-muted mb-3" style={{ fontSize: "13px" }}>
              Connecting Hands to Work
            </p>

            <p className="text-center fw-semibold mb-1">Reset Your Password</p>
            <p className="text-center" style={{ fontSize: "14px", marginBottom: "30px" }}>
              Enter your email to get reset link
            </p>

            <form onSubmit={handleReset}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                size="small"
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: "none", mb: 2 }}
                type="submit"
              >
                Send Reset Link
              </Button>
            </form>

            <p className="text-center" style={{ fontSize: "13px" }}>
              Remember your password?{" "}
              <Link to="/login" className="text-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>

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
};

export default ForgetPassword;
