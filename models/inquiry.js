import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    response: {
      type: String,
      default: "",
    },

    isResolved: {
      type: Boolean,
      default: false,
    },

    productKey: {
      type: String,
      required: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;