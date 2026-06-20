import Inquiry from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export async function addInquiry(req, res) {
  try {
    if (!isItCustomer(req)) {
      return res.status(403).json({
        message: "Only customers can create inquiries",
      });
    }

    const data = req.body;

    data.email = req.user.email;
    data.phone = req.user.phone;
    
    // Generate next id
    const lastInquiry = await Inquiry.findOne().sort({ id: -1 });

    data.id = lastInquiry ? lastInquiry.id + 1 : 1;

    const newInquiry = new Inquiry(data);

    await newInquiry.save();

    return res.status(201).json({
      message: "Inquiry created successfully",
      inquiry: newInquiry,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create inquiry",
      error: error.message,
    });
  }
}