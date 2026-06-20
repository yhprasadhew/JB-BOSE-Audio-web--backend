import Product from "../models/products.js";

export function addProduct(req, res) {
  // Check login
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  // Check admin
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
export async function getProducts(req, res) {
  try {
    // Public users or normal users
    if (!req.user || req.user.role !== "admin") {
      const products = await Product.find({
        availability: true,
      });

      return res.json(products);
    }

    // Admin users
    const products = await Product.find();

    return res.json(products);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
}