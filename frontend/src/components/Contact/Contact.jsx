import React, { useState } from "react";
import axios from "axios";
import "../Contact/Contact.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Box,
  CircularProgress
} from "@mui/material";

function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    message: "",
  });

  const validate = () => {
    let tempErrors = {};

    if (!fullName.trim()) {
      tempErrors.fullName = "Full name is required";
    }

    if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) {
      tempErrors.phoneNumber = "Enter valid 10-digit phone number";
    }

    if (!message.trim()) {
      tempErrors.message = "Message is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/contact", {
        fullName,
        phoneNumber,
        message,
      });

      toast.success("Message sent successfully");

      setFullName("");
      setPhoneNumber("");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact LabourLink Support</h2>
          <p>
            Facing an issue or need guidance? Our support team is here to assist
            workers and employers quickly and effectively.
          </p>
        </div>

        <div className="contact-content">
         
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-card phone">
              <span className="icon">📞</span>
              <div>
                <h4>Phone Support</h4>
                <p>Available 24/7</p>
                <p className="highlight">1800-123-456</p>
              </div>
            </div>

            <div className="info-card email">
              <span className="icon">📧</span>
              <div>
                <h4>Email Us</h4>
                <p>Response within 4 hours</p>
                <p className="highlight">help@labourlink.in</p>
              </div>
            </div>

            <div className="info-card whatsapp">
              <span className="icon">💬</span>
              <div>
                <h4>WhatsApp Support</h4>
                <p>Quick reply via chat</p>
                <p className="highlight">+91 98765-43210</p>
              </div>
            </div>

            <div className="info-card address">
              <span className="icon">📍</span>
              <div>
                <h4>Office Location</h4>
                <p>
                  LabourLink Technologies<br />
                  Indore, MP
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send a Message</h3>

            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                
                <TextField
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors({ ...errors, fullName: "" });
                  }}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  fullWidth
                />

                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setErrors({ ...errors, phoneNumber: "" });
                  }}
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber}
                  inputProps={{ maxLength: 10 }}
                  fullWidth
                />

                <TextField
                  label="Your Message"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors({ ...errors, message: "" });
                  }}
                  error={Boolean(errors.message)}
                  helperText={errors.message || ""}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ py: 1.3 }}
                >
                  {loading ? (
                    <CircularProgress size={22} sx={{ color: "white" }} />
                  ) : (
                    "Send Message"
                  )}
                </Button>

              </Box>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
