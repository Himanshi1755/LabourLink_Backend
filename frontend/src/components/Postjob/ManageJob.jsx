// import react from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

// function ManageJob({ setSelectedJobId, setTab, setIsEditMode, setEditingJobId, setJob }) {

//     const [visibleCount, setVisibleCount] = useState(8);
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedApplicant, setSelectedApplicant] = useState(null)
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchApplications = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:3000/employer/jobs-with-applicants",
//                     { withCredentials: true }
//                 );
//                 setJobs(res.data);
//             } catch (error) {
//                 if (error.response?.status !== 403) {
//                     console.error(error);
//                     toast.error("Failed to load data");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchApplications();
//     }, []);

//     const handleStatus = async (id, currentStatus) => {
//         const newStatus = currentStatus === "Active" ? "Deactive" : "Active";
//         try {
//             await axios.patch(
//                 `http://localhost:3000/jobs/${id}/status`,
//                 { status: newStatus }, { withCredentials: true }
//             );

//             setJobs(prevJobs =>
//                 prevJobs.map(job =>
//                     job._id === id ? { ...job, status: newStatus } : job
//                 )
//             );
//             toast.success(`Job status updated`);
//         } catch (err) {
//             toast.error("Error updating status");
//         }
//     };

//     const handleStatusChange = async (appId, status) => {
//         try {
//             await axios.patch(
//                 `http://localhost:3000/apply/${appId}`,
//                 { status },
//                 { withCredentials: true }
//             );

//             setJobs(prev =>
//                 prev.map(job => ({
//                     ...job,
//                     applicants: job.applicants.map(a =>
//                         a._id === appId ? { ...a, status } : a
//                     )
//                 }))
//             );

//             toast.success(`Marked as ${status}`);
//             setSelectedApplicant(null);
//         } catch {
//             toast.error("Failed");
//         }
//     };

//     const deletePost = async (id) => {
//         try {
//             const ok = window.confirm("Delete this job?");
//             if (!ok) return;

//             await axios.delete(`http://localhost:3000/jobs/${id}`, { withCredentials: true });
//             setJobs(jobs.filter(job => job._id !== id));
//             toast.success("Deleted");
//         } catch {
//             toast.error("Delete failed");
//         }
//     }

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="container" style={{ maxWidth: 1050 }}>

//             {/* HEADER */}
//             <div style={{
//                 marginBottom: 25,
//                 padding: 15,
//                 borderRadius: 12,
//                 background: "linear-gradient(to right,#f1f5ff,#f9fafb)",
//                 borderLeft: "4px solid #3b82f6"
//             }}>
//                 <h3 style={{ margin: 0 }}>Manage Jobs</h3>
//                 <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
//                     View and manage applications
//                 </p>
//             </div>

//             {jobs.slice(0, visibleCount).map((job) => (
//                 <div key={job._id}
//                     style={{
//                         background: "#fff",
//                         borderRadius: 16,
//                         padding: 20,
//                         marginBottom: 25,
//                         boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
//                         border: "1px solid #eee"
//                     }}
//                 >
//                     {/* TOP */}
//                     <div className="d-flex justify-content-between">
//                         <div>
//                             <h5 style={{ marginBottom: 4 }}>{job.title}</h5>
//                             <div style={{ fontSize: 13, color: "#666" }}>
//                                 {job.description}
//                             </div>
//                         </div>

//                         <div>
//                             <span style={{ fontSize: 14 }}>
//                                 <PeopleAltIcon sx={{ fontSize: 18 }} /> {job.applicants?.length || 0}
//                             </span>
//                         </div>
//                     </div>

//                     {/* INFO */}
//                     <div className="d-flex gap-4 mt-3 flex-wrap"
//                         style={{ fontSize: 13, color: "#555" }}>
//                         <span><LocationOnIcon sx={{ fontSize: 18 }} /> {job.location}</span>
//                         <span><CurrencyRupeeIcon sx={{ fontSize: 16 }} /> {job.wage}/day</span>
//                         <span><AccessTimeIcon sx={{ fontSize: 16 }} /> {new Date(job.postedAt).toLocaleDateString()}</span>
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="mt-3 d-flex gap-2">
//                         <button
//                             onClick={() => handleStatus(job._id, job.status)}
//                             className={`btn btn-sm btn-outline-${job.status === "Active" ? "success" : "danger"}`}
//                         >
//                             {job.status}
//                         </button>

//                         <button onClick={() => deletePost(job._id)}
//                             className="btn btn-outline-danger btn-sm">
//                             <DeleteIcon />
//                         </button>

//                         <button
//                             onClick={() => {
//                                 const jobToEdit = jobs.find(j => j._id === job._id);
//                                 setJob({
//                                     title: jobToEdit.title || "",
//                                     location: jobToEdit.location || "",
//                                     wage: jobToEdit.wage || "",
//                                     jobType: jobToEdit.jobType || "",
//                                     duration: jobToEdit.duration || "",
//                                     startDate: jobToEdit.startDate ? jobToEdit.startDate.slice(0, 10) : "",
//                                     description: jobToEdit.description || "",
//                                     requiredskills: jobToEdit.requiredSkills ? jobToEdit.requiredSkills.join(", ") : "",
//                                 });

//                                 setEditingJobId(jobToEdit._id);
//                                 setIsEditMode(true);
//                                 setTab(0);
//                             }}
//                             className="btn btn-outline-info btn-sm">
//                             <EditIcon />
//                         </button>
//                     </div>

//                     <hr style={{ margin: "18px 0" }} />

//                     {/* RECENT */}
//                     <div className="d-flex justify-content-between align-items-center">
//                         <b>Recent Applications</b>

//                         <button
//                             className="btn btn-link p-0"
//                             onClick={() => {
//                                 setSelectedJobId(job._id);
//                                 setTab(2);
//                             }}
//                         >
//                             View All ({job.applicants?.length || 0})
//                         </button>
//                     </div>

//                     {/* APPLICANTS */}
//                     <div className="d-flex gap-2 flex-wrap mt-3">
//                         {(job.applicants || []).slice(0, 4).map((app) => (
//                             <div
//                                 key={app._id}
//                                 onClick={() => setSelectedApplicant(app)}
//                                 style={{
//                                     padding: "8px 14px",
//                                     borderRadius: 12,
//                                     border: "1px solid #e5e7eb",
//                                     background: "#f9fafb",
//                                     cursor: "pointer"
//                                 }}
//                             >
//                                 <div style={{ fontSize: 13, fontWeight: 500 }}>
//                                     {app.workerID?.name}
//                                 </div>

//                                 <div style={{
//                                     fontSize: 12,
//                                     color:
//                                         app.status === "accepted"
//                                             ? "green"
//                                             : app.status === "rejected"
//                                                 ? "red"
//                                                 : "#777"
//                                 }}>
//                                     {app.status}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//             {visibleCount < jobs.length && (
//                 <div style={{ textAlign: "center", marginTop: 20 }}>
//                     <button
//                         onClick={() => setVisibleCount(prev => prev + 8)}
//                         style={{
//                             padding: "10px 18px",
//                             borderRadius: 10,
//                             border: "1px solid #ddd",
//                             background: "#f9fafb",
//                             cursor: "pointer",
//                             fontWeight: 500
//                         }}
//                     >
//                         Load More
//                     </button>
//                 </div>
//             )}

//             {/* MODAL */}
//             {selectedApplicant && (
//                 <div style={{
//                     position: "fixed",
//                     inset: 0,
//                     background: "rgba(0,0,0,0.4)",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     zIndex: 999
//                 }}>
//                     <div style={{
//                         background: "#fff",
//                         borderRadius: 18,
//                         padding: 25,
//                         width: 400,
//                         position: "relative"
//                     }}>
//                         <button
//                             onClick={() => setSelectedApplicant(null)}
//                             style={{
//                                 position: "absolute",
//                                 right: 15,
//                                 top: 10,
//                                 border: "none",
//                                 background: "none",
//                                 fontSize: 18
//                             }}
//                         >
//                             ✖
//                         </button>

//                         <h4>{selectedApplicant.workerID?.name}</h4>
//                         <p>📧 {selectedApplicant.workerID?.email}</p>
//                         <p>📞 {selectedApplicant.workerID?.contactNo}</p>
//                         <p><b>Skills:</b> {selectedApplicant.workerID?.skills}</p>

//                         <div className="d-flex gap-2 mt-3">
//                             <button
//                                 className="btn btn-success w-50"
//                                 onClick={() => handleStatusChange(selectedApplicant._id, "accepted")}
//                             >
//                                 Accept
//                             </button>

//                             <button
//                                 className="btn btn-danger w-50"
//                                 onClick={() => handleStatusChange(selectedApplicant._id, "rejected")}
//                             >
//                                 Reject
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>


//     );
// }

// export default ManageJob;


import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function ManageJob({ setSelectedJobId, setTab, setIsEditMode, setEditingJobId, setJob }) {

    const [visibleCount, setVisibleCount] = useState(8);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplicant, setSelectedApplicant] = useState(null)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/employer/jobs-with-applicants",
                    { withCredentials: true }
                );
                setJobs(res.data);
            } catch (error) {
                if (error.response?.status !== 403) {
                    toast.error("Failed to load");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Deactive" : "Active";
        try {
            await axios.patch(
                `http://localhost:3000/jobs/${id}/status`,
                { status: newStatus }, { withCredentials: true }
            );

            setJobs(prev =>
                prev.map(job =>
                    job._id === id ? { ...job, status: newStatus } : job
                )
            );
            toast.success("Status updated");
        } catch {
            toast.error("Error updating status");
        }
    };

    const handleStatusChange = async (appId, status) => {
        try {
            await axios.patch(
                `http://localhost:3000/apply/${appId}`,
                { status },
                { withCredentials: true }
            );

            setJobs(prev =>
                prev.map(job => ({
                    ...job,
                    applicants: job.applicants.map(a =>
                        a._id === appId ? { ...a, status } : a
                    )
                }))
            );

            toast.success(`Marked as ${status}`);
            setSelectedApplicant(null);
        } catch {
            toast.error("Failed");
        }
    };

    const deletePost = async (id) => {
        try {
            const ok = window.confirm("Delete this job?");
            if (!ok) return;

            await axios.delete(`http://localhost:3000/jobs/${id}`, { withCredentials: true });
            setJobs(jobs.filter(job => job._id !== id));
            toast.success("Deleted");
        } catch {
            toast.error("Delete failed");
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container" style={{ maxWidth: 1050 }}>

            {/* HEADER */}
            <div style={{
                marginBottom: 25,
                padding: 18,
                borderRadius: 14,
                background: "linear-gradient(to right,#eef2ff,#f8fafc)",
                borderLeft: "5px solid #3b82f6"
            }}>
                <h3 style={{ margin: 0 }}>Manage Jobs</h3>
                <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
                    Manage postings and applicants
                </p>
            </div>

            {jobs.slice(0, visibleCount).map((job) => (
                <div key={job._id}
                    style={{
                        position: "relative",
                        background: "#fff",
                        borderRadius: 18,
                        padding: 22,
                        marginBottom: 25,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                        border: "1px solid #eee"
                    }}
                >

                    {/* RIGHT ACTION ICONS */}
                    <div style={{
                        position: "absolute",
                        right: 18,
                        top: 18,
                        display: "flex",
                        gap: 14,
                        alignItems: "center"
                    }}>

                        {/* STATUS */}
                        <span
                            onClick={() => handleStatus(job._id, job.status)}
                            style={{
                                fontSize: 12,
                                padding: "5px 12px",
                                borderRadius: 20,
                                cursor: "pointer",
                                background: job.status === "Active" ? "#dcfce7" : "#fee2e2",
                                color: job.status === "Active" ? "#16a34a" : "#dc2626",
                                fontWeight: 600
                            }}
                        >
                            {job.status}
                        </span>

                        <EditIcon
                            onClick={() => {
                                const jobToEdit = jobs.find(j => j._id === job._id);
                                setJob({
                                    title: jobToEdit.title || "",
                                    location: jobToEdit.location || "",
                                    wage: jobToEdit.wage || "",
                                    jobType: jobToEdit.jobType || "",
                                    duration: jobToEdit.duration || "",
                                    startDate: jobToEdit.startDate ? jobToEdit.startDate.slice(0, 10) : "",
                                    description: jobToEdit.description || "",
                                    requiredskills: jobToEdit.requiredSkills ? jobToEdit.requiredSkills.join(", ") : "",
                                });
                                setEditingJobId(jobToEdit._id);
                                setIsEditMode(true);
                                setTab(0);
                            }}
                            style={{ cursor: "pointer", color: "#3b82f6" }}
                        />

                        <DeleteIcon
                            onClick={() => deletePost(job._id)}
                            style={{ cursor: "pointer", color: "#ef4444" }}
                        />
                    </div>

                    {/* TITLE */}
                    <h5 style={{ marginBottom: 6 }}>{job.title}</h5>
                    <div style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>
                        {job.description}
                    </div>

                    {/* INFO */}
                    <div className="d-flex gap-4 flex-wrap"
                        style={{ fontSize: 13, color: "#555" }}>
                        <span><LocationOnIcon sx={{ fontSize: 18 }} /> {job.location}</span>
                        <span><CurrencyRupeeIcon sx={{ fontSize: 16 }} /> {job.wage}/day</span>
                        <span><AccessTimeIcon sx={{ fontSize: 16 }} /> {new Date(job.postedAt).toLocaleDateString()}</span>
                        <span><PeopleAltIcon sx={{ fontSize: 18 }} /> {job.applicants?.length || 0}</span>
                    </div>

                    <hr style={{ margin: "18px 0" }} />

                    {/* RECENT HEADER */}
                    <div className="d-flex justify-content-between align-items-center">
                        <b>Recent Applications</b>

                        {job.applicants?.length > 0 && (
                            <button
                                className="btn btn-link p-0"
                                style={{ fontSize: 13 }}
                                onClick={() => {
                                    setSelectedJobId(job._id);
                                    setTab(2);
                                }}
                            >
                                View All ({job.applicants?.length})
                            </button>
                        )}
                    </div>

                    {/* APPLICANTS */}
                    <div className="d-flex gap-2 flex-wrap mt-3">
                        {(job.applicants || []).slice(0, 4).map((app) => (
                            <div
                                key={app._id}
                                onClick={() => setSelectedApplicant(app)}
                                style={{
                                    padding: "9px 14px",
                                    borderRadius: 12,
                                    border: "1px solid #e5e7eb",
                                    background: "#f9fafb",
                                    cursor: "pointer",
                                    minWidth: 120
                                }}
                            >
                                <div style={{ fontSize: 13, fontWeight: 600 }}>
                                    {app.workerID?.name}
                                </div>

                                <div style={{
                                    fontSize: 12,
                                    color:
                                        app.status === "accepted"
                                            ? "green"
                                            : app.status === "rejected"
                                                ? "red"
                                                : "#777"
                                }}>
                                    {app.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* LOAD MORE */}
            {visibleCount < jobs.length && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button
                        onClick={() => setVisibleCount(prev => prev + 8)}
                        style={{
                            padding: "10px 20px",
                            borderRadius: 12,
                            border: "1px solid #ddd",
                            background: "#f1f5f9",
                            cursor: "pointer",
                            fontWeight: 500
                        }}
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* MODAL */}
            {selectedApplicant && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 999
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: 20,
                        padding: 26,
                        width: 400,
                        position: "relative"
                    }}>
                        <button
                            onClick={() => setSelectedApplicant(null)}
                            style={{
                                position: "absolute",
                                right: 14,
                                top: 10,
                                border: "none",
                                background: "none",
                                fontSize: 18,
                                cursor: "pointer"
                            }}
                        >
                            ✖
                        </button>

                        <h4 style={{ marginBottom: 10 }}>{selectedApplicant.workerID?.name}</h4>
                        <p style={{ marginBottom: 6 }}>📧 {selectedApplicant.workerID?.email}</p>
                        <p style={{ marginBottom: 6 }}>📞 {selectedApplicant.workerID?.contactNo}</p>
                        <p><b>Skills:</b> {selectedApplicant.workerID?.skills}</p>

                        <div className="d-flex gap-2 mt-4">
                            <button
                                className="btn btn-success w-50"
                                onClick={() => handleStatusChange(selectedApplicant._id, "accepted")}
                            >
                                Accept
                            </button>

                            <button
                                className="btn btn-danger w-50"
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

export default ManageJob;
