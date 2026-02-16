import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AppliedJon from "../FindWork/AppiliedJob";
import SavedJob from "../FindWork/SavedJob";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few sec",
    ss: "%d sec",
    m: "1 min",
    mm: "%d min",
    h: "1 hr",
    hh: "%d hr",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function FindWork() {
  const [tab, setTab] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const appliedJobs = jobs.filter((job) => job.isApplied);
  const savedJobsCount = savedJobIds.length;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/jobs", { withCredentials: true });
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();

  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/saved_job",
        { withCredentials: true }
      );
      setSavedJobIds(res.data.map(item => item.jobId._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleApply = async (jobId) => {
    try {

      await axios.post("http://localhost:3000/apply", { jobID: jobId }, { withCredentials: true });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isApplied: true } : job
        )
      );

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Failed to apply. Please try again.");
      }
    }
  };

  const handleSave = async (jobId, isSaved) => {
    try {
      if (isSaved) {
        await axios.delete(
          `http://localhost:3000/saved_job/${jobId}`,
          { withCredentials: true }
        );
        setSavedJobIds(prev => prev.filter(id => id !== jobId));
      } else {
        await axios.post(
          "http://localhost:3000/saved_job",
          { jobId },
          { withCredentials: true }
        );
        setSavedJobIds(prev => [...prev, jobId]);
      }
    } catch (err) {
      console.error("Save job error:", err);
    }
  };



  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.requiredSkills &&
        job.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    const typeMatch = !jobTypeFilter || job.jobType === jobTypeFilter;
    return searchMatch && typeMatch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === "wage") return b.wage - a.wage;
    if (sortOption === "date") return new Date(a.startDate) - new Date(b.startDate);
    return 0;
  });

  return (
    <>
      <Header />
      <Box sx={{ width: "80%", mx: "auto", mt: 5 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label={`Available Jobs (${jobs.length})`} />
          <Tab label={`Applied Jobs (${appliedJobs.length})`} />
          <Tab label={`Saved Jobs (${savedJobsCount})`} />

        </Tabs>

        {/* ===================== Available Jobs ===================== */}
        <TabPanel value={tab} index={0}>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <TextField
              label="Search jobs"
              variant="outlined"
              size="small"
              placeholder="Searh by location, skill , title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: "1 1 250px" }}
            />
            <TextField
              select
              label="Job Type"
              size="small"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Long Term">Long Term</MenuItem>
            </TextField>

          </Box>


          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && sortedJobs.length > 0 ? (


            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",

                gap: 3,
              }}
            >
              {sortedJobs.map((job) => {
                const isApplied = job.isApplied || false;
                // const isSaved = job.isSaved || false;
                const isSaved = savedJobIds.includes(job._id);


                return (
                  <Card
                    key={job._id}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)", boxShadow: 6,
                        "& .gradient-hr": {
                          opacity: 1,
                          background: "linear-gradient(90deg, #5694f8ff, #06b6d4, #f78e4dff)",

                        },
                        "& .top-section": {
                          bgcolor: "#f1f4f7ff",
                        },
                        "& .job-title": {
                          color: "#024468ff"
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

                      {/* <hr></hr> */}
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
                          <LocationOnIcon fontSize="small" sx={{ color: "#0369a1" }} />
                        </Box>
                        <Typography variant="body2">{job.location}</Typography>
                      </Box>
                      {/* Wage */}
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
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "green" }}>
                          ₹{job.wage}/{job.jobType === "Weekly" ? "week" : "day"}
                        </Typography>
                      </Box>


                      {job.postedAt && (
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
                            <CalendarMonthIcon fontSize="small" sx={{ color: "#7e22ce" }} />
                          </Box>
                          <Typography variant="caption" color="text.secondary">Posted {" "}
                            {moment(job.postedAt).fromNow()}
                          </Typography>
                        </Box>
                      )}

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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: "auto",
                          // p:2,

                          marginLeft: "10px",
                          // position : "relative",
                        }}
                      >
                        <Button
                          variant={isApplied ? "outlined" : "contained"}
                          sx={{
                            flex: 1,
                            fontSize: "12px",
                            background: isApplied
                              ? "linear-gradient(to right, #def9e7ff, #a8f8c5ff)"
                              : "#1d4ed8",

                            color: isApplied ? "#68cf8eff" : "#fff",
                            borderColor: isApplied ? "#3ea062ff" : undefined,
                            "&:hover": {
                              bgcolor: isApplied ? "#bbf7d0" : "#1e40af",
                            },
                          }}
                          onClick={() => handleApply(job._id)}
                          startIcon={isApplied && <CheckCircleIcon />}
                        >
                          {isApplied ? "Applied" : "Apply Now"}
                        </Button>

                        {/* Save Button */}
                        <Button
                          variant="outlined"
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

                          onClick={() => handleSave(job._id, isSaved)}
                        >
                          <BookmarkBorderIcon />
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          ) : (
            !loading && (
              <Typography align="center" color="text.secondary" sx={{ mt: 5 }}>
                No jobs found
              </Typography>
            )
          )}
        </TabPanel>

        {/* ===================== Applied Jobs ===================== */}
        <TabPanel value={tab} index={1}>
          <Typography variant="h5">Your Applications</Typography>
          <AppliedJon onDelete={fetchJobs} />
        </TabPanel>


        <TabPanel value={tab} index={2}>
          <Typography variant="h5">Saved Jobs</Typography>
          <SavedJob onRemove={fetchJobs} />
        </TabPanel>


      </Box>
      <Footer />

    </>
  );
}

export default FindWork;

