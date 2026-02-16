// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PhoneIcon from "@mui/icons-material/Phone";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";

// function Applications({ selectJobId }) {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!selectJobId) return;

//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/employer/${selectJobId}/applicants`,
//           { withCredentials: true }
//         );
//         setApplications(res.data.applications || []);
//       } catch (err) {
//         toast.error("Failed to load applicants");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [selectJobId]);

//   // ⭐ ACCEPT / REJECT
//   const updateStatus = async (appId, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:3000/apply/${appId}`,
//         { status },
//         { withCredentials: true }
//       );

//       setApplications(prev =>
//         prev.map(a => (a._id === appId ? { ...a, status } : a))
//       );

//       toast.success(`Marked as ${status}`);
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <div
//         className="mb-4 px-4 py-2"
//         style={{
//           background:
//             "linear-gradient(to right,#e1faef,#e8edfa)",
//           borderRadius: "8px"
//         }}
//       >
//         <h3>Job Applicants</h3>
//         <p className="text-muted">
//           Review and manage applications from workers
//         </p>
//       </div>

//       {applications.length === 0 ? (
//         <p className="text-center text-muted">No applicants yet</p>
//       ) : (
//         applications.map(app => (
//           <div
//             key={app._id}
//             className="card mb-3 p-3 shadow-sm"
//             style={{ borderRadius: "10px" }}
//           >
//             <div className="d-flex justify-content-between">
//               <div className="d-flex gap-3">
//                 <div
//                   style={{
//                     height: 60,
//                     width: 60,
//                     borderRadius: "50%",
//                     background: "#e0f3ff",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center"
//                   }}
//                 >
//                   <PersonOutlineIcon />
//                 </div>

//                 <div>
//                   <strong>{app.workerID?.name}</strong>
//                   <div className="text-muted" style={{ fontSize: 13 }}>
//                     Applied on{" "}
//                     {new Date(app.createdAt).toLocaleDateString()}
//                   </div>

//                   <div style={{ marginTop: 5 }}>
//                     Status:
//                     <span
//                       style={{
//                         marginLeft: 6,
//                         fontWeight: 600,
//                         color:
//                           app.status === "accepted"
//                             ? "green"
//                             : app.status === "rejected"
//                             ? "red"
//                             : "orange"
//                       }}
//                     >
//                       {app.status}
//                     </span>
//                   </div>

//                   <div style={{ fontSize: 13, marginTop: 4 }}>
//                     Skills: {app.workerID?.skills}
//                   </div>
//                 </div>
//               </div>

//               <div style={{ minWidth: 200 }}>
//                 <strong>Contact</strong>
//                 <div>
//                   <PhoneIcon sx={{ fontSize: 16 }} />{" "}
//                   {app.workerID?.contactNo}
//                 </div>
//                 <div>
//                   <MailOutlineIcon sx={{ fontSize: 16 }} />{" "}
//                   {app.workerID?.email}
//                 </div>
//               </div>
//             </div>

//             {/* ⭐ ACTION BUTTONS */}
//             <div
//               className="d-flex gap-2 mt-3"
//               style={{ justifyContent: "flex-end" }}
//             >
//               <button
//                 className="btn btn-success btn-sm"
//                 disabled={app.status === "accepted"}
//                 onClick={() => updateStatus(app._id, "accepted")}
//               >
//                 Accept
//               </button>

//               <button
//                 className="btn btn-danger btn-sm"
//                 disabled={app.status === "rejected"}
//                 onClick={() => updateStatus(app._id, "rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Applications;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function Applications({ selectJobId }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectJobId) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/employer/${selectJobId}/applicants`,
          { withCredentials: true }
        );
        setApplications(res.data.applications || []);
      } catch {
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [selectJobId]);

  const updateStatus = async (appId, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/apply/${appId}`,
        { status },
        { withCredentials: true }
      );

      setApplications(prev =>
        prev.map(a => (a._id === appId ? { ...a, status } : a))
      );

      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="mb-4 px-4 py-2" style={{
        background: "linear-gradient(to right,#e1faef,#e8edfa)",
        borderRadius: "10px"
      }}>
        <h3>Job Applicants</h3>
        <p className="text-muted">Review and manage applications</p>
      </div>

      {applications.length === 0 ? (
        <p className="text-center text-muted">No applicants yet</p>
      ) : (
        applications.map(app => (
          <div key={app._id} className="card mb-3 p-3 shadow-sm"
            style={{ borderRadius: "12px", border: "1px solid #eee" }}
          >
            <div className="d-flex justify-content-between">

              {/* LEFT */}
              <div className="d-flex gap-3">
                <div style={{
                  height: 55,
                  width: 55,
                  borderRadius: "50%",
                  background: "#eef6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <PersonOutlineIcon />
                </div>

                <div>
                  <strong>{app.workerID?.name}</strong>

                  <div style={{ fontSize: 12, color: "#777" }}>
                    Applied {new Date(app.createdAt).toLocaleDateString()}
                  </div>

                  <div style={{ marginTop: 4 }}>
                    Status:
                    <span style={{
                      marginLeft: 6,
                      fontWeight: 600,
                      color:
                        app.status === "accepted"
                          ? "green"
                          : app.status === "rejected"
                          ? "red"
                          : "orange"
                    }}>
                      {app.status}
                    </span>
                  </div>

                  <div style={{ fontSize: 13 }}>
                    Skills: {app.workerID?.skills}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ minWidth: 200 }}>
                <strong>Contact</strong>
                <div><PhoneIcon sx={{ fontSize: 16 }} /> {app.workerID?.contactNo}</div>
                <div><MailOutlineIcon sx={{ fontSize: 16 }} /> {app.workerID?.email}</div>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3 justify-content-end">
              <button
                className="btn btn-success btn-sm"
                disabled={app.status === "accepted"}
                onClick={() => updateStatus(app._id, "accepted")}
              >
                Accept
              </button>

              <button
                className="btn btn-danger btn-sm"
                disabled={app.status === "rejected"}
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;
