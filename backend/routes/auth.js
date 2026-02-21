import express from "express";
import { loginController } from "../controllers/authController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

 

const authRouter=express.Router();

// authRouter.use(authMiddleware)




authRouter.post("/login",loginController);

export {authRouter}
