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

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);


  const [tab, setTab] = useState(0);
  const [selectJobId, setSelectedJobId] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.title.trim() || !job.description.trim() || !job.wage || !job.location.trim()) {
      toast.error("Please fill all required fields (title, description, wage, location)");
      return;
    }
    const descriptionWords = job.description.trim().split(/\s+/);
    if (descriptionWords.length < 2 || descriptionWords.length > 40) {
      toast.error("Description must be between 2 and 40 words.");
      return;
    }

    const jobDetails = {
      ...job,
      requiredSkills: job.requiredskills
        ? job.requiredskills.split(",").map(s => s.trim())
        : [],
    };

    // delete jobDetails.requiredskills;

    // if (!jobDetails.jobType) {
    //   delete jobDetails.jobType;
    // }

    try {

      if (isEditMode) {
        await axios.patch(`http://localhost:3000/jobs/${editingJobId}`, jobDetails, { withCredentials: true });
        toast.success("Job updated Sucessfully !!")
      } else {
        await axios.post("http://localhost:3000/jobs", jobDetails, { withCredentials: true })
        toast.success("Job Post Succesfully!!");
      }
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

      setIsEditMode(false);
      setEditingJobId(null);

    } catch (error) {
      toast.error("Something went wrong");
      console.log("Handle Submit of PostJob is something error: ", error);
    }
  }
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
                    value={job.title}
                    onChange={handleChange}
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
                       value={job.location}
                      onChange={handleChange}
                     
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
                     value={job.wage}
                    onChange={handleChange}
                   
                  />
                </div>
                <div className="form-group">
                  <label>Job Type *</label>
                  <select name="jobType"
                    value={job.jobType}
                    // onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                    onChange={handleChange}
                   
                  >
                    <option value="">-- Select job type --</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Job Duration</label>
                  <select name="duration" value={job.duration} onChange={handleChange}
                  >

                    <option value="">-- Select duration --</option>
                    <option value="Permanent">Permanent/Regular</option>
                    <option value="1 Day">1 Day</option>
                    <option value="1 Week">1 Week</option>
                    <option value="1 Month">1 Month</option>

                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="input-icon">
                    <CalendarTodayIcon />
                    <input
                      type="date"
                      name="startDate"
                       value={job.startDate}
                      onChange={handleChange}
                     
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
                  
                  value={job.description}
                  onChange={handleChange}

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

            
              <div className="button-row" style={{display : "flex ",gap:"5px", marginTop:"20px"}}>
                <button className="post-btn" type="submit" style={{width:"400px", padding :"5px 20px" ,fontSize : "15px" ,color : "white",borderRadius : "6px" , border : "none" }}> 
                  <AddIcon sx={{ fontSize: "22px", paddingBottom: "2px" }} />
                  {isEditMode ? "Update Job" : "Post Job"}
                </button>

                {isEditMode && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                     
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
                      setIsEditMode(false);
                      setEditingJobId(null);
                      toast.info("Edit cancelled");
                    }}
                    style={{ marginLeft: "10px", backgroundColor: "#f84d41ff", color: "white", border: "none", padding: "7px 16px", borderRadius: "4px" ,width : "400px" }}
                  >
                    Cancel
                  </button>
                )}
              </div>

            </div>
          </div>
        </TabPanel>

        {/* Mnage job  */}
        <TabPanel value={tab} index={1}>
          <ManageJob setTab={setTab} setSelectedJobId={setSelectedJobId} setIsEditMode={setIsEditMode} setEditingJobId={setEditingJobId} setJob={setJob} />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>Applications Received</Typography>
          <Applications role={"employer"} selectJobId={selectJobId} />
        </TabPanel>
      </Box>

      <Footer />
    </>
  );
};

export default PostJob;

