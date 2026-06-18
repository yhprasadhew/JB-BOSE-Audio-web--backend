import Product from "../models/products.js";

export function addProduct(req, res) {
  // 🔐 check login
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  // 🔐 check admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to do this action",
    });
  }

  const data = req.body;

  const newProduct = new Product(data);

  newProduct
    .save()
    .then(() => {
      res.status(201).json({
        message: "Product added successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to add product",
        error: error.message,
      });
    });
}