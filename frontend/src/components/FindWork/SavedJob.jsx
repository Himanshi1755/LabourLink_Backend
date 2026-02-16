import React, { useEffect, useState } from "react";
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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import moment from "moment";

function SavedJob({ onRemove }) {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/saved_job", {
        withCredentials: true,
      });
      setSavedJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleUnsave = async (jobId) => {
    try {
      await axios.delete(
        `http://localhost:3000/saved_job/${jobId}`,
        { withCredentials: true }
      );

      setSavedJobs((prev) =>
        prev.filter((item) => item.jobId._id !== jobId)
      );

      if (onRemove) onRemove();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        You haven’t saved any jobs yet.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 3,
        mt: 3,
      }}
    >
      {savedJobs.map((item) => {
        const job = item.jobId;
        if (!job) return null;

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
            {/* <CardContent > */}
            <CardContent sx={{
              p: 0,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}>

              <Box className="top-section" sx={{

                display: "flex", justifyContent: "space-between", transition: "all 0.3s ease",
                width: "100%",
                p: 2,
              }}>

                <Typography className="job-title" sx={{ fontWeight: 200, color: "#000000ff", transition: "color 0.3s ease", }}>
                  {job.title}
                </Typography>
                <Chip
                  label={job.jobType || "Daily"}
                  size="small"
                  sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 200 }}
                />
              </Box>

              {/* Location */}

              {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}> */}
              <Box
                component="hr"
                className="gradient-hr"
                sx={{
                  border: 0,
                  height: "2px",
                  m: 0,

                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  marginLeft: "10px",
                  marginTop: "10px"
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#e0f2fe",
                    p: 0.8,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon fontSize="small" /></Box>
                <Typography variant="body2">{job.location}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  marginLeft: "10px"
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#dcfce7",
                    p: 0.8,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  💰

                </Box>
                <Typography sx={{ mt: 1, fontWeight: 700, color: "green" }}>
                  ₹{job.wage}/{job.jobType === "Weekly" ? "week" : "day"}
                </Typography>
              </Box>

              {/* Posted */}
              {job.postedAt && (
                // <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    marginLeft: "10px"
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#f3e8ff",
                      p: 0.8,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarMonthIcon fontSize="small" />
                  </Box>
                  <Typography variant="caption" color="text.secondary">Posted {" "}
                    {moment(job.postedAt).fromNow()}
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
                  marginLeft: "10px"
                }}
              >
                {job.description.length > 100
                  ? job.description.slice(0, 100) + "..."
                  : job.description}
              </Typography>

              {job.requiredSkills?.length > 0 && (
                <Typography
                  variant="body2"
                  sx={{ color: "#2563eb", fontWeight: 500, mb: 1, marginLeft: "10px" }}
                >
                  <strong>Requirements:</strong>{" "}
                  {job.requiredSkills.join(", ")}
                </Typography>
              )}

              {/* Unsave Button */}
              <Box sx={{ px: 1, mt: "auto", }}>
                <Button
                  fullWidth
                  startIcon={<BookmarkIcon />}
                  sx={{
                    mt: 2,
                    bgcolor: "#fee2e2",
                    color: "#dc2626",
                    "&:hover": { bgcolor: "#fecaca" },
                    width: "100%",
                  }}

                  onClick={() => handleUnsave(job._id)}
                >
                  Remove from Saved
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

export default SavedJob;
