import express from "express";
import { addProduct, getProducts } from "../controllers/productsController.js";

const productRouter = express.Router();



// Add Product
productRouter.post("/", addProduct);
productRouter.get("/", getProducts);


export default productRouter;


//{

 // "email": "presadd@gmail.com",

  //"password": "prasad123"

//}