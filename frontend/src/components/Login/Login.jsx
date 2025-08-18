import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import image from "./login.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { loginSuccess } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const roleRequired = location.state?.roleRequired;

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const validateLogin = () => {
        if (!data.email || !data.password) {
            toast.error("All fields are required");
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        {
            e.preventDefault();
            const check = validateLogin();
            const loginData = { ...data }

            try {
                const details = await axios.post("http://localhost:3000/user/login", loginData, { withCredentials: true });
                console.log("Login user details ", details);

                const { user, token } = details.data;

                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("token", token);

                dispatch(loginSuccess({ user, token }));

                toast.success("Login Successfully")
                navigate(-1);

                if (user.role === "employer") navigate("/post-job");
                else if (user.role === "worker") navigate("/find-work");
                else navigate("/");

            } catch (err) {
                console.log(err);
                toast.error("Login failed");
            }
        }
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div className="container py-4">
            <div
                className="row justify-content-center align-items-center"
            >
                <div className="col-lg-5 col-md-6 mb-4">
                    <div className="shadow p-3 rounded bg-white"
                        style={{ maxWidth: "400px", margin: "auto" }} >

                        <Link className="text-decoration-none" to="/" ><p className="text-center text-primary mb-2 "
                            style={{ fontSize: "14px" }}>← Back to Home</p></Link>

                        <h3 className="fw-bold text-center mb-1" style={{ color: "#0d6efd" }}> LabourLink</h3>
                        <p className="text-center text-muted mb-3" style={{ fontSize: "13px" }}> Connecting Hands to Work </p>

                        <p className="text-center fw-semibold mb-1">Welcome Back!</p>
                        <p
                            className="text-center"
                            style={{ fontSize: "14px", marginBottom: "30px" }}
                        >
                            {roleRequired === "worker" ? "Sign in as Worker to continue" : roleRequired === "employer" ? "Sign in as Employer to continue" : "Sign in to continue"}
                        </p>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                variant="standard"
                                size="small"
                                className="mb-3"
                                onChange={(e) => setData({ ...data, email: e.target.value })} />

                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                size="small"
                                className="mb-1"
                                onChange={(e) => setData({ ...data, password: e.target.value })} />

                            {/* <div className="text-end mb-4">
                                <Link
                                    to="/forgetPassword"
                                    className="text-decoration-none"
                                    style={{ fontSize: "12px" }}
                                >
                                    Forgot Password?
                                </Link>
                            </div> */}

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                sx={{ textTransform: "none", mt: 3 }}
                            >
                                Sign In
                            </Button>

                            <div className="d-flex align-items-center my-3">
                                <hr className="flex-grow-1" />
                                <span className="mx-2 text-muted" style={{ fontSize: "14px" }}>
                                    or continue with
                                </span>
                                <hr className="flex-grow-1" />
                            </div>

                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={
                                    <img
                                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                                        alt="google"
                                        style={{ width: 20, height: 20 }}
                                    />
                                }

                                sx={{ textTransform: "none", mb: 2 }}
                            >
                                Login with Google
                            </Button>

                        </form>

                        <p className="text-center" style={{ fontSize: "13px" }}>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary">
                                Register here
                            </Link>
                            {/* <Link to="/signup" className="text-primary">
                                Register here
                            </Link> */}
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
}

export default Login;
