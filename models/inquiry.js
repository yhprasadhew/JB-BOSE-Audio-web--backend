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
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;