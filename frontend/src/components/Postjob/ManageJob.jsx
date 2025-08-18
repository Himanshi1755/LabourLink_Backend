import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function ManageJob() {

    const [jobs, setJobs] = useState([]);
    const [status, setStatus] = useState("Active");
    const navigate = useNavigate();

    // const handleStatus = () => {
    //     setStatus(p => p === "Active" ? "Deactive" : "Active")
    // }

    // const handleStatus = (id) => {
    //     setJobs(prevJobs =>
    //         prevJobs.map(job =>
    //             job._id === id
    //                 ? { ...job, status: job.status === "Active" ? "Deactive" : "Active" }
    //                 : job
    //         )
    //     );
    // };

    useEffect(() => {
        axios.get("http://localhost:3000/employer/jobs", { withCredentials: true })
            .then(res => setJobs(res.data))
            .catch(err => console.error("Error fetching jobs:", err));
    }, []);

    const handleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Deactive" : "Active";
        try {
            await axios.put(
                `http://localhost:3000/jobs/${id}/status`,
                { status: newStatus }, { withCredentials: true }
            );

            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job._id === id ? { ...job, status: newStatus } : job
                )
            );
            toast.dismiss();
            toast.success(`Job status updated to ${newStatus}`);
        } catch (err) {
            toast.error("Error updating status");
            console.log("Status update error:", err);
        }
    };


    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/jobs/${id}`, { withCredentials: true });
            setJobs(jobs.filter(job => job._id !== id));
            toast.dismiss();
            toast.success("Job deleted successfully");
        }
        catch (err) {
            toast.dismiss();
            toast.error("Something went wrong while deleting");
            console.log("Delete error", err);
        }
    }



    return (
        <>
            <div className=" table-responsive" style={{ marginBottom: "500px" }}>
                <h2>All Job Posts</h2>
                <table className="table table-hover" width="100%">
                    <thead>
                        <tr style={{ fontWeight: "lighter" }}>
                            <th>Job Title</th>
                            <th>Location</th>
                            <th>Wage/Day</th>
                            <th>Posted On</th>
                            <th>Status</th>
                            {/* <th>Application</th> */}
                            {<th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody style={{ fontSize: "15px", alignItems: "center" }}>
                        {jobs.map((job, index) => (
                            <tr key={index}>

                                <td>
                                    {job.title}
                                    <div className="d-flex gap-2">
                                        <span style={{ color: "grey" }}>{job.jobType || "N/A"}</span>
                                        <span style={{ color: "grey" }}>{job.duration || "N/A"}</span>
                                    </div>
                                </td>
                                <td>{job.location}</td>
                                <td>Rs.{job.wage}</td>
                                <td>{new Date(job.postedAt).toLocaleDateString()}</td>
                                <td>
                                    {/* <button onClick={()=>handleStatus(job._id)} className={`btn btn-sm ${status === "Active" ? "btn-outline-success" : "btn-outline-danger"}`}>
                                        {status}
                                    </button> */}
                                    <button
                                        onClick={() => handleStatus(job._id, job.status)} // pass currentStatus
                                        className={`btn btn-sm btn-outline-${job.status === "Active" ? "success" : "danger"}`}
                                    >
                                        {job.status}
                                    </button>


                                </td>
                                {/* <td style={{ textAlign: "center" }}> (   ) </td> */}
                                <td>
                                    <div className="d-flex">
                                        <button onClick={() => deletePost(job._id)} className="btn btn-outline-danger btn-sm m-1 p-1"><DeleteIcon /></button>
                                        <button onClick={() => navigate(`/edit-job/${job._id}`)} className="btn btn-outline-info btn-sm m-1 p-1"><EditIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default ManageJob;