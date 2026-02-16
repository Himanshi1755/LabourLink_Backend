import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BusinessIcon from "@mui/icons-material/Business";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../validation/validate";

import worker from "./worker.png";

export default function SignupForm() {
  const [role, setRole] = useState("worker");
  const [skill, setSkill] = useState("labour");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const userData = {
      ...data,
      role,
      skills: role === "worker" ? [skill] : [],
    };

    try {
      await axios.post("http://localhost:3000/user/signup", userData);
      toast.success("Signup successful!");
    } catch (err) {
      console.error(err);
      toast.error("Signup failed!");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Grid container spacing={4} alignItems="center">
        {/* LEFT */}
        <Grid item xs={12} md={6}>
          <Box textAlign="center">
            <Box
              component="img"
              src={worker}
              alt="Worker"
              sx={{ width: "100%", maxWidth: 400 }}
            />
            <Typography variant="h6" fontWeight="bold" color="primary">
              Find Your Next Opportunity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join LabourLink and connect with trusted employers & skilled workers.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" textAlign="center" fontWeight="bold">
              Create Your Account
            </Typography>

            {/* ROLE */}
            <Box sx={{ display: "flex", gap: 1, my: 2 }}>
              <Button
                fullWidth
                variant={role === "worker" ? "contained" : "outlined"}
                startIcon={<EngineeringIcon />}
                onClick={() => setRole("worker")}
              >
                Worker
              </Button>
              <Button
                fullWidth
                variant={role === "employer" ? "contained" : "outlined"}
                startIcon={<BusinessIcon />}
                onClick={() => setRole("employer")}
              >
                Employer
              </Button>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Full Name"
                fullWidth
                variant="standard"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Email Address"
                fullWidth
                variant="standard"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Contact Number"
                fullWidth
                variant="standard"
                {...register("contactNo")}
                error={!!errors.contactNo}
                helperText={errors.contactNo?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                variant="standard"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <TextField
                label="Location"
                fullWidth
                variant="standard"
                {...register("location")}
                error={!!errors.location}
                helperText={errors.location?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {role === "worker" && (
                <Select
                  fullWidth
                  variant="standard"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="labour">Labour</MenuItem>
                  <MenuItem value="tailoring">Tailoring</MenuItem>
                  <MenuItem value="plumbing">Plumbing</MenuItem>
                  <MenuItem value="welding">Welding</MenuItem>
                  <MenuItem value="painting">Painting</MenuItem>
                  <MenuItem value="carpenter">Carpenter</MenuItem>
                </Select>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Create Account
              </Button>

              <Typography align="center" sx={{ mt: 2 }}>
                Already have an account? <Link to="/login">Sign in</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
