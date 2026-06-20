import express from "express";
import { addProduct, deleteProduct, getProducts ,updateProduct } from "../controllers/productsController.js";

const productRouter = express.Router();



// Add Product
productRouter.post("/", addProduct);
productRouter.get("/", getProducts);
productRouter.put("/:key", updateProduct);
productRouter.delete("/:key", deleteProduct);





export default productRouter;


//{

 // "email": "presadd@gmail.com",

  //"password": "prasad123"

//}