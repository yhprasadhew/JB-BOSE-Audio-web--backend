import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    dimension: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      default: "uncategorized",
    },

    description: {
      type: String,
      required: true,
    },

    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;