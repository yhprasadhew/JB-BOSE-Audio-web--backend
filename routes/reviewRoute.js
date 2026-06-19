import express from "express";
import { addReview, getReview ,deleteReview } from "../controllers/reviewcontroller.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview);
reviewRouter.get("/",getReview)
reviewRouter.delete("/:email", deleteReview);

export default reviewRouter ;