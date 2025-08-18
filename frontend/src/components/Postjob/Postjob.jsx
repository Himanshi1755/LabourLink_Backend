import React, { useEffect, useState } from "react";
import "./PostJob.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AddIcon from '@mui/icons-material/Add';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { toast } from "react-toastify";
import axios from "axios";
import ManageJob from "./ManageJob";
import Applications from "./Application";

const TabPanel = ({ children, value, index }) => {
  return value === index && (
    <Box sx={{ pt: 3 }}>
      {children}
    </Box>
  );
};

function PostJob() {

  const [job, setJob] = useState({
    title: "",
    location: "",
    wage: "",
    jobType: "",
    duration: "",
    startDate: "",
    description: "",
    requiredskills: "",
  });


  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobDetails = { ...job };
    try {
      const data = await axios.post("http://localhost:3000/jobs", jobDetails, { withCredentials: true })
       toast.dismiss();
      toast.success("Job Post Succesfully!!");

      setJob({
        title: "",
        location: "",
        wage: "",
        jobType: "",
        duration: "",
        startDate: "",
        description: "",
        requiredskills: "",
      });

    } catch (error) {
       toast.dismiss();
      toast.error("Something went wrong");
      console.log("post job : ", error);
    }
  }



  // useEffect(() => {
  //   jobsData()
  // }, [])

  // const jobsData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/jobs", { withCredentials: true })
  //     console.log(response)

  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
  return (
    <>
      <Header />
      <Box sx={{ width: '80%', mx: 'auto', mt: 5 }} component="form" onSubmit={handleSubmit}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Post Job" />
          <Tab label="Manage Jobs" />
          <Tab label="Application" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <div className="postjob-container">
            <div className="postjob-card">
              <h2>Post a New Job</h2>

              <div className="form-row mt-4">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Tailor, Painter, carpenter etc"
                    // onChange={(e) => setJob({ ...job, title: e.target.value })}
                    onChange={handleChange}

                    value={job.title}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <div className="input-icon">
                    <LocationOnIcon />
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., Sector 15, Noida"
                      // onChange={(e) => setJob({ ...job, location: e.target.value })}
                      onChange={handleChange}
                      value={job.location}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Daily Wage (₹) *</label>
                  <input
                    type="number"
                    name="wage"
                    placeholder="e.g., 500"
                    // onChange={(e) => setJob({ ...job, wage: e.target.value })}
                    onChange={handleChange}

                    value={job.wage}
                  />
                </div>
                <div className="form-group">
                  <label>Job Type *</label>
                  <select name="jobType"
                    value={job.jobType}
                    // onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                    onChange={handleChange}

                  >
                    <option>Select job type</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Job Duration</label>
                  <select name="duration" value={job.duration} onChange={handleChange}
                  >
                    <option>Select duration</option>
                    <option>1 Day</option>
                    <option>1 Week</option>
                    <option>1 Month</option>
                    <option>More than 1 Month</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="input-icon">
                    <CalendarTodayIcon />
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      value={job.startDate}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Job Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Describe the work, conditions, etc."
                  onChange={handleChange}

                  value={job.description}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Requirements & Skills</label>
                <textarea
                  name="requiredskills"
                  rows="2"
                  placeholder="Any specific skills or experience?"
                  value={job.requiredskills}
                  onChange={handleChange}

                ></textarea>
              </div>

              <p className="required-note">
                * Required fields<br />
                <span>Job will be visible to workers immediately after posting</span>
              </p>

              <div className="button-row">

                <button className="post-btn" type="submit">
                  <AddIcon sx={{ fontSize: "22px", paddingBottom: "3px" }} />
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </TabPanel>
        

        {/* Mnage job  */}
        <TabPanel value={tab} index={1}>
          <ManageJob />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>Applications Received</Typography>
          <Applications role={"employer"} />
        </TabPanel>
      </Box>

      <Footer />
    </>
  );
};

export default PostJob;
// [
//   {
//     "title": "Mason",
//     "description": "Build walls and small structures",
//     "wage": 600,
//     "location": "Indore",
//     "jobType": "Contract",
//     "requiredSkills": ["Brick work", "Concrete"],
//     "startDate": "2025-08-21",
//     "duration": "3 days",
//     "employerID": "688d67b400fcf7f65d9ca3f9"
//   },
//   {
//     "title": "Cleaner",
//     "description": "Clean home, office or shop",
//     "wage": 300,
//     "location": "Bhopal",
//     "jobType": "Part-time",
//     "requiredSkills": ["Cleaning", "Sweeping", "Dusting"],
//     "startDate": "2025-08-22",
//     "duration": "1 day",
//     "employerID": "688d67b400fcf7f65d9ca3f9"
//   },
//   {
//     "title": "Gardener",
//     "description": "Plant and maintain garden, water plants",
//     "wage": 400,
//     "location": "Indore",
//     "jobType": "Part-time",
//     "requiredSkills": ["Gardening", "Plant care"],
//     "startDate": "2025-08-23",
//     "duration": "2 days",
//     "employerID": "688d67b400fcf7f65d9ca3f9"
//   },
//   {
//     "title": "Painter Helper",
//     "description": "Help painter with painting walls and furniture",
//     "wage": 350,
//     "location": "Bhopal",
//     "jobType": "Contract",
//     "requiredSkills": ["Painting", "Mix colors"],
//     "startDate": "2025-08-24",
//     "duration": "2 days",
//     "employerID": "688d67b400fcf7f65d9ca3f9"
//   },
//   {
//     "title": "Tailor",
//     "description": "Stitch and repair clothes",
//     "wage": 400,
//     "location": "Indore",
//     "jobType": "Full-time",
//     "requiredSkills": ["Stitching", "Repairing clothes"],
//     "startDate": "2025-08-25",
//     "duration": "1 week",
//     "employerID": "688d67b400fcf7f65d9ca3f9"
//   }
// ]
