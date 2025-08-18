import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from '@mui/icons-material/Close';
import "./Application.css";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get("http://localhost:3000/employer", {
                    withCredentials: true,
                });
                setApplications(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load applications");
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await axios.patch(
                `http://localhost:3000/apply/${id}`,
                { status },
                { withCredentials: true }
            );
            toast.success(`Marked as ${status}`);

            setApplications((prev) =>
                prev.map((job) => ({
                    ...job,
                    applicants: job.applicants.map((a) =>
                        a._id === id ? { ...a, status } : a
                    ),
                }))
            );
            setSelectedApplicant(null); 
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "0px", background: "#f9f9fb" }}>
            {applications.length === 0 ? (
                <p>No applications found</p>
            ) : (
                applications.map((job) => (
                    <div key={job._id} className="job-block">
                       
                        <div style={{ backgroundColor: "#e6f2ff", padding: "10px" }}>
                            <div className="job-title">{job.title}</div>
                            <div className="job-description justify-content-between">
                                <LocationOnIcon fontSize="small" /> {job.location} • ₹
                                {job.salary}/day{" "}
                                <AccessTimeIcon
                                    fontSize="small"
                                    style={{ marginLeft: "6px", marginRight: "3px" }}
                                />
                                {new Date(job.postedAt).toLocaleDateString()}
                            </div>
                        </div>

                       {/* //Aplicants  */}
                        <div className="applicants-row">
                            {job.applicants.length === 0 ? (
                                <p style={{ color: "#777" }}>No applicants yet</p>
                            ) : (
                                job.applicants.map((app) => (
                                    <div
                                        key={app._id}
                                        className="applicant-card"
                                        onClick={() => setSelectedApplicant(app)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="applicant-name">
                                            {app.workerID?.name || "Unknown"}
                                        </div>
                                        <div className="applicant-details">
                                            {/* Skills: {app.workerID?.skills || "N/A"} <br /> */}
                                            {/* Phone: {app.workerID?.contactNo || "N/A"} <br /> */}
                                            Status:{" "}
                                            <span
                                                style={{
                                                    color:
                                                        app.status === "accepted"
                                                            ? "green"
                                                            : app.status === "rejected"
                                                                ? "red"
                                                                : "gray",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                {app.status || "pending"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))
            )}

            {/* Modal for Applicant Details */}
            {selectedApplicant && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="d-flex justify-content-between">
                        <h3>{selectedApplicant.workerID?.name}</h3>
                        <button style={{fontSize : "15px" ,background: "transparent", padding: "2px",border : "none",cursor: "pointer"}} onClick={() => setSelectedApplicant(null)}><CloseIcon style={{ fontSize: "16px" }}/> </button>
                        </div>
                        <p>Email: {selectedApplicant.workerID?.email || "N/A"}</p>
                        <p>Phone: {selectedApplicant.workerID?.contactNo || "N/A"}</p>
                        <p>Skills: {selectedApplicant.workerID?.skills || "N/A"}</p>
                        <p>Location: {selectedApplicant.workerID?.location || "N/A"}</p>

                        <div className="modal-actions">
                            <button
                                className="btn-accept"
                                onClick={() => handleStatusChange(selectedApplicant._id, "accepted")}
                            >
                                Accept
                            </button>
                            <button
                                className="btn-reject"
                                onClick={() => handleStatusChange(selectedApplicant._id, "rejected")}
                            >
                                Reject
                            </button>
                        </div>

                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default Applications;

