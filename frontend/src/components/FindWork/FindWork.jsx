import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

function FindWork() {

  // const [tabValue, setTabValue] = useState(0);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const [job, setJob] = useState({
  //   title: "",
  //   location: "",
  //   wage: "",
  //   jobType: "",
  //   duration: "",
  //   startDate: "",
  //   description: "",
  //   requiredskills: "",
  // });


  const [tab, setTab] = useState(0);
  
  return (
    <>
      <Header />
      <Box sx={{ width: '80%', mx: 'auto', mt: 5 }} component="form" onSubmit={handleSubmit}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Available Jobs" />
          <Tab label="Applied Jobs" />
          <Tab label="Saved Jobs" />
        </Tabs>

        <TabPanel value={tab} index={0}>
         <Box>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Card key={job._id} sx={{ mb: 2, p: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography>{job.location}</Typography>
                    <Typography>{job.description}</Typography>
                    <Typography>₹{job.wage} / day</Typography>
                    <Box sx={{ mt: 1 }}>
                      <Button variant="contained" size="small" sx={{ mr: 1 }}>Apply</Button>
                      <Button variant="outlined" size="small">Save</Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No jobs found</Typography>
            )}
          </Box>
        </TabPanel>

        {/* ---------- */}
        <TabPanel value={tab} index={1}>
     <Typography variant="h3">Your Applications </Typography>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Typography variant="h6">Applications Received</Typography>
        </TabPanel>
      </Box>

      <Footer />
    </>
  );
};

export default FindWork;