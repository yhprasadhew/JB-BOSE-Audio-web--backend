import express from "express" ;
import { RegisterUser ,loginUser, updateProfile, getUsers, deleteUser, toggleSuspendUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",RegisterUser);
userRouter.post("/login",loginUser);
userRouter.put("/profile", updateProfile);
userRouter.get("/", getUsers);
userRouter.delete("/:email", deleteUser);
userRouter.put("/:email/suspend", toggleSuspendUser);



export default userRouter;