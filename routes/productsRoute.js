import express from "express";
import { addProduct } from "../controllers/productsController.js";

const productRouter = express.Router();



// Add Product
productRouter.post("/add", addProduct);

export default productRouter;


//{

 // "email": "presadd@gmail.com",

  //"password": "prasad123"

//}