import React, { useState } from 'react';
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
  Divider,
  Grid,
  Paper
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BusinessIcon from '@mui/icons-material/Business';
import { toast } from "react-toastify";

import worker from './worker.png';

export default function SignupForm() {
  const [role, setRole] = useState('worker');
  const [skill, setSkill] = useState('');
  const [error, setError] = useState({});
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    contactNo: "",
    role: "",
    location: "",
    skills: ""
  })

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!signup.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signup.email) {
      newErrors.email = "Email is Required";
      isValid = false;
    }
    else if (!emailCheck.test(signup.email)) {
      newErrors.email = "invalid email";
      isValid = false;

    }

    if (!signup.password) {
      newErrors.password = "password is required";
      isValid = false;
    }

    if (!signup.confirmPassword) {
      newErrors.confirmPassword = "confirm your Pssword";
      isValid = false;
    }
    else if (signup.password !== signup.confirmPassword) {
      newErrors.confirmPassword = "Password do not match";
      isValid = false;
    }

    if (!signup.contactNo) {
      newErrors.contactNo = "Contact Number is required";
      isValid = false;
    }

    if (!signup.location) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setError(newErrors);

    return isValid;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      toast.error("Please fill all fileds correctly")
      return;
    }

    const userData = {
      ...signup, role, skills: role === "worker" ? skill : null
    };

    try {
      const send = await axios.post("http://localhost:3000/user/signup", userData );
      toast.success("Signup successful!");
      console.log(send.data);

    } catch (err) {
      toast.error("Signup failed!");
      console.log(err);
    }


  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ display: 'flex' }}>

        <Grid size={6} >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              px: 2
            }}
          >
            <Box
              component="img"
              src={worker}
              alt="Worker illustration"
              sx={{
                width: '100%',
                maxWidth: 400,
                borderRadius: 2,
                mr: 9,
                mb: 2
              }}
            />
            <Typography variant="h6" fontWeight="bold" color="primary" marginRight="10px">
              Find Your Next Opportunity
            </Typography>
            <Typography variant="body2" color="text.secondary" marginRight="19px">
              Join LabourLink and connect with trusted employers & skilled workers.
            </Typography>
          </Box>
        </Grid>
        {/* ------------------------ */}
        <Grid size={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              width: '120%',
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              Create Your Account
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
              textAlign="center"
            >
              Start building your future today 🌟
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Button
                variant={role === 'worker' ? 'contained' : 'outlined'}
                onClick={() => setRole('worker')}
                startIcon={<EngineeringIcon />}
                sx={{ flex: 1, textTransform: 'none' }}
              >   Worker
              </Button>
              <Button
                variant={role === 'employer' ? 'contained' : 'outlined'}
                onClick={() => setRole('employer')}
                startIcon={<BusinessIcon />}
                sx={{ flex: 1, textTransform: 'none' }}
              >
                Employer
              </Button>
            </Box>

            <form onSubmit={handleSubmit}>

              <TextField
                label="Full Name"
                fullWidth
                variant='standard'
                onChange={(event) => setSignup({ ...signup, name: event.target.value })}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
                // error = {!!error.name}
                error={Boolean(error.name)}
                helperText={error.name}

              />
              <TextField
                label="Email Address"
                type="email"
                variant='standard'
                onChange={(event) => setSignup({ ...signup, email: event.target.value })}
                fullWidth
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
                error={Boolean(error.email)}
                helperText={error.email}


                value={signup.email}
              />
              <TextField
                label="Contact Number"
                variant='standard'
                fullWidth
                onChange={(event) => setSignup({ ...signup, contactNo: event.target.value })}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  )
                }}
                error={Boolean(error.contactNo)}
                helperText={error.contactNo}

                value={signup.contactNo}
              />
              <TextField
                label="Password"
                type="password"
                variant='standard'
                fullWidth
                onChange={(event) => setSignup({ ...signup, password: event.target.value })}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
                error={Boolean(error.password)}
                helperText={error.password}

                value={signup.password}
              />

              <TextField
                label="Confirm Password"
                type="password"
                variant='standard'
                onChange={(event) => setSignup({ ...signup, confirmPassword: event.target.value })}
                fullWidth
                margin="dense"
                error={Boolean(error.confirmPassword)}
                helperText={error.confirmPassword}

              />
              <TextField
                label="Location"
                fullWidth
                variant='standard'
                onChange={(event) => setSignup({ ...signup, location: event.target.value })}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  )
                }}
                error={Boolean(error.location)}
                helperText={error.location}

                value={signup.location}/>

              {role === 'worker' && (
                <Select
                  value={skill}
                  variant='standard'
                  onChange={(e) => setSkill(e.target.value)}
                  fullWidth
                  // onChange={(event)=>setSignup({...signup,skills:event.target.value})}
                  displayEmpty
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select your skills
                  </MenuItem>
                  <MenuItem value="tailoring">Tailoring</MenuItem>
                  <MenuItem value="plumbing">Plumbing</MenuItem>
                  <MenuItem value="welding">Welding</MenuItem>
                  <MenuItem value="painting">Painting</MenuItem>
                  <MenuItem value="labour">Labour</MenuItem>
                  <MenuItem value="carpenter">Carpenter</MenuItem>
                </Select>
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 2.5, py: 1.2, textTransform: 'none' }}
              >
                Create Account
              </Button>

              <Divider sx={{ my: 2 }}>or</Divider>

              <Button
                variant="outlined"
                fullWidth
                startIcon={
                  <Box
                    component="img"
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                sx={{ textTransform: 'none' }}>Sign up with Google
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account? <a href="/signup">Sign in</a>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}


