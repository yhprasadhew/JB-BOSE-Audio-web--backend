import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productsRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import inquiryRouter from "./routes/inquiryRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(bodyParser.json());

// ================= JWT MIDDLEWARE =================
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return next();
  }

  const token = authHeader.replace("Bearer ", "");

  jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ Invalid Token");
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // ✅ SHOW IN TERMINAL
    console.log("🔐 Decoded User:", decoded);

    // store user in request
    req.user = decoded;

    next();
  });
};

app.use(authMiddleware);

// ================= DATABASE =================
const mongoUrl =process.env.MONGO_URL ;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

// ================= ROUTES =================
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);

app.use("/api/inquiry",inquiryRouter);



// ================= SERVER =================
app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});


// "email": "dud@gmail.com",
 // "password": "prasad123",
 // "role": "customer",

 //"email": "dud6@gmail.com",
 // "password": "prasad123",
 // "role": "admin",

 