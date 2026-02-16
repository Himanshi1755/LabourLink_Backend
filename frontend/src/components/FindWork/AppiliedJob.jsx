import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import moment from "moment";

function AppliedJob({ onDelete }) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/apply", { withCredentials: true })
  //     .then((res) => setAppliedJobs(res.data))
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
  const fetchApps = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/apply",
        { withCredentials: true }
      );
      setAppliedJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchApps();

  // ⭐ AUTO REFRESH every 5 sec
  const interval = setInterval(fetchApps, 5000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/saved_job", { withCredentials: true })
      .then((res) => {
        const ids = res.data.map((item) => item.jobId._id);
        setSavedJobIds(ids);
      })
      .catch((err) => console.error(err));
  }, []);


  // const handleSave = async (jobId, isSaved) => {
  //   try {
  //     if (isSaved) {
  //       await axios.delete(
  //         `http://localhost:3000/saved_job/${jobId}`,
  //         { withCredentials: true }
  //       );
  //       setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
  //     } else {
  //       await axios.post(
  //         "http://localhost:3000/saved_job",
  //         { jobId },
  //         { withCredentials: true }
  //       );
  //       setSavedJobIds((prev) => [...prev, jobId]);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  const handledeleteapply = async (appId) => {
    try {
      await axios.delete(`http://localhost:3000/apply/${appId}`, { withCredentials: true });
      setAppliedJobs(prev => prev.filter(app => app._id !== appId));

      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Box sx={{ mt: 3 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : appliedJobs.length === 0 ? (
        <Typography align="center" sx={{ mt: 5 }}>
          You haven’t applied to any jobs yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {appliedJobs.map((application) => {
            const job = application.jobID;
            if (!job) return null;

            const isSaved = savedJobIds.includes(job._id);

            return (
              <Card
                key={job._id}
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    "& .gradient-hr": {
                      opacity: 1,
                      background:
                        "linear-gradient(90deg, #5694f8ff, #06b6d4, #f78e4dff)",
                    },
                    "& .top-section": {
                      bgcolor: "#f1f4f7ff",
                    },
                    "& .job-title": {
                      color: "#024468ff",
                    },
                  },
                }}
              >
                <CardContent sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}>
                  {/* Header */}
                  <Box
                    className="top-section"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      p: 2,
                    }}
                  >
                    <Typography
                      className="job-title"
                      sx={{
                        fontWeight: 200,
                        color: "#000000ff",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {job.title}
                    </Typography>
                    <Chip
                      label={job.jobType || "Daily"}
                      size="small"
                      sx={{
                        bgcolor: "#e0f2fe",
                        color: "#0369a1",
                        fontWeight: 200,
                      }}
                    />
                  </Box>

                  <Box component="hr" className="gradient-hr" sx={{ border: 0, height: "1px", m: 0 }} />


                  <Box sx={{ ml: 2, mt: 1 }}>
                    <Chip
                      label={application.status}
                      size="small"
                      sx={{
                        bgcolor:
                          application.status === "accepted"
                            ? "#22c55e"
                            : application.status === "rejected"
                              ? "#ef4444"
                              : "#fddc58",
                        color: "#fff",
                      }}
                    />
                  </Box>

                  {/* Location */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, ml: 2, mt: 1 }}>
                    <Box sx={{ bgcolor: "#e0f2fe", p: 0.8, borderRadius: "6px", display: "flex" }}>
                      <LocationOnIcon fontSize="small" sx={{ color: "#0369a1" }} />
                    </Box>
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>

                  {/* Wage */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, ml: 2 }}>
                    <Box sx={{ bgcolor: "#dcfce7", p: 0.8, borderRadius: "6px", display: "flex" }}>
                      💰
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: "green" }}>
                      ₹{job.wage}/{job.jobType === "Weekly" ? "week" : "day"}
                    </Typography>
                  </Box>

                  {/* Posted At */}
                  {job.postedAt && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, ml: 2 }}>
                      <Box sx={{ bgcolor: "#f3e8ff", p: 0.8, borderRadius: "6px", display: "flex" }}>
                        <CalendarMonthIcon fontSize="small" sx={{ color: "#7e22ce" }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Posted {moment(job.postedAt).fromNow()}
                      </Typography>
                    </Box>
                  )}

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "#f9fafb",
                      p: 1,
                      borderRadius: 1,
                      mb: 1,
                      color: "#374151",
                      ml: 2,
                    }}
                  >
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + "..."
                      : job.description}
                  </Typography>

                  {/* Skills */}
                  {job.requiredSkills?.length > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2563eb",
                        fontWeight: 500,
                        mb: 1,
                        ml: 2,
                      }}
                    >
                      <strong>Requirements:</strong> {job.requiredSkills.join(", ")}
                    </Typography>
                  )}

                 
                  <Box sx={{  px :1 , mt: "auto", }}>
                    <Button
                      variant="outlined"
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        fontSize: "12px",
                        background: "linear-gradient(to right, #def9e7ff, #b9fbd1ff)",
                        color: "#68cf8eff",
                        borderColor: "#3ea062ff",
                        "&:hover": {
                          bgcolor: "#bbf7d0",
                        },
                        fontWeight: 600,
                        width: "100%",
                        // mt : "auto",
                        borderRadius : "4px",
                        py:1,
                      }}
                      onClick={() => handledeleteapply(application._id)}
                    >
                      Applied
                    </Button>

                    {/* <Button
                      variant="outlined"
                      onClick={() => handleSave(job._id, isSaved)}
                      sx={{
                        minWidth: 40,
                        mx: 1,
                        background: isSaved
                          ? "linear-gradient(to right, #f9dee2ff, #f4aeaeff)"
                          : "#ffffffff",
                        borderColor: isSaved ? "#fb2f2fff" : "#ccc",
                        color: isSaved ? "#e64b4bff" : "#555",
                        "&:hover": {
                          borderColor: "#dc2626",
                          bgcolor: isSaved ? "#fee2e2" : "#f9fafb",
                        },
                      }}
                    >
                      <BookmarkBorderIcon />
                    </Button> */}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default AppliedJob
