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
      
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create inquiry",
      error: error.message,
    });
  }
}



export async function getInquiries(req, res) {
  try {
    // 🔐 must be logged in
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    let filter = {};

    // 👤 if NOT admin → only own inquiries
    if (req.user.role !== "admin") {
      filter = { email: req.user.email };
    }

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      inquiries,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to get inquiries",
      error: error.message,
    });
  }
}
 
//delete

export async function deleteInquiry(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const id = Number(req.params.id);

    const inquiry = await Inquiry.findOne({ id: id });

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    // 🔐 only admin OR owner
    if (req.user.role !== "admin" && req.user.email !== inquiry.email) {
      return res.status(403).json({
        message: "You don't have permission to delete this inquiry",
      });
    }

    await Inquiry.deleteOne({ id: id });

    return res.json({
      message: "Inquiry deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete inquiry",
      error: error.message,
    });
  }
}

//update

export async function updateInquiry(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const id = Number(req.params.id);
    const updates = req.body;

    const inquiry = await Inquiry.findOne({ id: id });

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    // 🔐 permission check (admin OR owner)
    if (req.user.role !== "admin" && req.user.email !== inquiry.email) {
      return res.status(403).json({
        message: "You don't have permission to update this inquiry",
      });
    }

    // ❌ prevent changing sensitive fields
    delete updates.id;
    delete updates.email;

    const updatedInquiry = await Inquiry.findOneAndUpdate(
      { id: id },
      { $set: updates },
      { new: true }
    );

    return res.json({
      message: "Inquiry updated successfully",
      inquiry: updatedInquiry,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update inquiry",
      error: error.message,
    });
  }
}