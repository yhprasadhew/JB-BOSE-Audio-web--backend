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
    image :{
        type: [String],
        required:true,
        default: ["https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"]
    },
    type: {
      type: String,
      required: true,
      default: "sale",
      enum: ["sale", "rental"],
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;