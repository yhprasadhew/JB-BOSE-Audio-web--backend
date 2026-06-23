import express from "express" ;
import { RegisterUser ,loginUser, updateProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",RegisterUser);
userRouter.post("/login",loginUser);
userRouter.put("/profile", updateProfile);



export default userRouter;