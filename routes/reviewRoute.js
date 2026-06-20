import express from "express";
import { addReview, getReview ,deleteReview, approveReview } from "../controllers/reviewcontroller.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview)
reviewRouter.get("/",getReview)
reviewRouter.put("/approve/:email",approveReview )

reviewRouter.delete("/:email", deleteReview);

export default reviewRouter ;