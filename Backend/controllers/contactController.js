import { Contact } from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { fullName, phoneNumber, message } = req.body;

    if (!fullName || !message) {
      return res.status(400).json({
        message: "Full Name and Message are required",
      });
    }

    const contact = await Contact.create({
      fullName,
      phoneNumber,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
