import React from 'react';
import image from './image.png';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldIcon from '@mui/icons-material/Shield';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { redirect, useNavigate } from 'react-router-dom';
// import { currentUser } from "../../redux/UserSlice";
import { useSelector, useDispatch } from 'react-redux';
import "../Home/Home.css";


function Home() {

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    // const redirectTo = location.state?.redirectTo || "/"

    return (
        <>
            <Header />
            {/* style={{ backgroundColor: '#f8d7da', borderRadius: '8px' }} */}
            <div className="container mt-0 py-5" >
                <div className="row align-items-center" style={{ backgroundColor: '#edf9fbff', padding: '20px', borderRadius: '8px' }}>
                    <div className="col-md-6 mb-4">
                        <div className="intro-section">
                            <h5 className="intro-heading">
                                Connecting Hands to the Work
                            </h5>
                            <p className="intro-text">
                                Bridging skilled hands with real opportunities. <br />
                                Join thousands of workers and employers who trust
                                <span className="brand"> LabourLink</span> for local employment solutions.
                            </p>
                        </div>
                        <div className="d-flex mt-4 gap-3">
                            <>
                                <button style={{marginLeft : "100px"}}
                                    onClick={() => {
                                        if (currentUser) {
                                            navigate("/find-work");
                                        }
                                        else {
                                            navigate("/login", { state: { roleRequired: "worker", redirectTo: "/find-work" } });
                                        }
                                    }}
                                    className="custom-btn worker-btn fw-bold p-0">
                                    {/* style={{ width: "200px", height: "32px" }} */}
                                    I Need Work{" "}
                                    <ArrowForwardIcon sx={{ fontSize: "17px", marginBottom: "2px" }} />{" "}
                                    <i className="fas fa-arrow-right"></i>
                                </button>

                                <button
                                    onClick={() => {
                                        if (currentUser) {
                                            navigate("/post-job");
                                        }
                                        else {
                                            navigate("/login", { state: { roleRequired: "employer", redirectTo: "/post-job" } });
                                        }
                                    }}
                                    className="custom-btn employer-btn">
                                    {/* style={{ width: "200px", height: "32px" }} */}
                                    I Have Work{" "}
                                    <ArrowForwardIcon sx={{ fontSize: "17px", marginBottom: "2px" }} />
                                </button>
                            </>

                        </div>
                    </div>

                    <div className="col-md-6 text-center">
                        <img src={image} alt="Work illustration" style={{ width: "390px", height: "330px", borderRadius: "4%", objectFit: "cover" }} className="img-fluid" />
                    </div>
                </div>
            </div>


            <div className="container mt-0 text-center mb-5" style={{ backgroundColor: '#edf9fbff', height: "auto", padding: "20px 10px" }}>
                <h5 className="fw-bold mt-5">Why Choose LabourLink?</h5>
                <p className="text-muted" style={{ maxWidth: "600px", margin: "10px auto", fontSize: "14px" }}>
                    We provide a secure, reliable platform that brings together skilled workers and employers for mutual success.
                </p>

                <div className="d-flex  justify-content-center gap-4 mt-5 mb-5 flex-wrap">
                    <div className="cards p-3 bg-info-subtle rounded " style={{ width: "220px", height: "225px" }}>
                        <div style={{ backgroundColor: "#e3f8f7ff", width: "45px", height: "50px", borderRadius: "20%", display: "inline-block", marginTop: "15px" }}><PeopleAltIcon sx={{ marginTop: "12px" }} /></div>
                        <h6 className="mt-4">Verified Workers</h6>
                        <p className="mt-3" style={{ fontSize: "12px" }} >Connect with skilled professionals who have been verified for quality and reliability.</p>
                    </div>
                    <div className="cards p-3 bg-info-subtle rounded" style={{ width: "220px", height: "225px" }}>
                        <div style={{ backgroundColor: "#bcf8f4ff", width: "45px", height: "50px", borderRadius: "20%", display: "inline-block", marginTop: "15px" }}></div>
                        <h6 className="mt-4">Trusted Clients</h6>
                        <p className="mt-3" style={{ fontSize: "12px" }}>Work with reputable companies and employers who value your skills and time.</p>
                    </div>
                    <div className="cards p-3 bg-info-subtle rounded" style={{ width: "220px", height: "225px" }}>
                        <div style={{ backgroundColor: "#d7fed4ff", width: "45px", height: "50px", borderRadius: "20%", display: "inline-block", marginTop: "15px" }}><LocationOnIcon sx={{ marginTop: "12px" }} /></div>
                        <h6 className="mt-4">Local Opportunities</h6>
                        <p className="mt-3" style={{ fontSize: "12px" }}>Find work opportunities in your local area and nearby communities.</p>
                    </div>
                    <div className="cards p-3 bg-info-subtle rounded" style={{ width: "220px", height: "225px" }}>
                        <div style={{ backgroundColor: "#d1d2fdff", width: "45px", height: "50px", borderRadius: "20%", display: "inline-block", marginTop: "15px" }}><ShieldIcon sx={{ marginTop: "12px" }} /></div>
                        <h6 className="mt-4">Quick Matching</h6>
                        <p className="mt-3" style={{ fontSize: "12px" }}>Get instantly matched with the right jobs or workers based on your preferences.</p>
                    </div>
                </div>
            </div>


            <div className="container mt-0 text-center mb-5" style={{ backgroundColor: '#edf9fbff', height: "auto", padding: "40px 20px" }}>
                <h5 className="fw-bold">How LabourLink Works</h5>
                <p className="text-muted" style={{ maxWidth: "600px", margin: "10px auto", fontSize: "14px" }}>
                    Simple steps to connect and start working
                </p>

                <div className="row text-start mt-4">

                    <div className="col-md-6 mb-4">
                        <h5 className="fw-semibold text-center">For Workers</h5>

                        <div className="gap-3 mt-4" style={{ marginLeft: "80px" }}>
                            <div className="d-flex align-items-start gap-3 mt-3">
                                <div style={{ backgroundColor: "blue", width: "30px", height: "30px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>1</div>
                                <div>
                                    <p className="mb-1 fw-semibold" style={{ fontSize: "13px" }}>Create Your Profile</p>
                                    <p className="text-muted mb-0 mt-0" style={{ fontSize: "11px" }}>Sign up and showcase your skills and experience.</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3 mt-3">
                                <div style={{ backgroundColor: "blue", width: "30px", height: "30px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>2</div>
                                <div>
                                    <p className="mb-1 fw-semibold" style={{ fontSize: "13px" }}>Browse Jobs</p>
                                    <p className="text-muted mb-0 mt-0" style={{ fontSize: "11px" }}>Find work opportunities in your area</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3 mt-3">
                                <div style={{ backgroundColor: "blue", width: "30px", height: "30px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>3</div>
                                <div>
                                    <p className="mb-1 fw-semibold" style={{ fontSize: "13px" }}>Apply & Connect</p>
                                    <p className="text-muted mb-0 mt-0" style={{ fontSize: "11px" }}>Apply to jobs and connect with employers</p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="col-md-6 mb-4">
                        <h5 className="fw-semibold text-center">For Employers</h5>

                        <div className="gap-3 mt-4" style={{ marginLeft: "80px" }}>
                            <div className="d-flex gap-3 mt-3">
                                <div style={{ backgroundColor: "orange", width: "30px", height: "30px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>1</div>
                                <div>
                                    <p className="mb-1 fw-semibold" style={{ fontSize: "13px" }}>Post Your Job</p>
                                    <p className="text-muted mb-0 mt-0" style={{ fontSize: "11px" }}>Describe your project and requirements.</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3 mt-3">
                                <div style={{ backgroundColor: "orange", width: "30px", height: "30px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>2</div>
                                <div>
                                    <p className="mb-1 fw-semibold" style={{ fontSize: "13px" }}>Review Applications</p>
                                    <p className="text-muted mb-0 mt-0" style={{ fontSize: "11px" }}>Browse profiles of interested workers</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3 mt-3">
                                <div style={{ backgroundColor: "orange", width: "30px", height: "30px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>3</div>
                                <div>
                                    <p className="mb-1 fw-semibold" style={{ fontSize: "13px" }}>Hire & Manage</p>
                                    <p className="text-muted mb-0 mt-0" style={{ fontSize: "11px" }}>Select workers and manage your projects</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );

}

export default Home;
