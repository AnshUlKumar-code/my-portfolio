import express from "express";
import {upload} from "../middleware/multer.js";
import { addProfile, deleteProfile, downloadResume, getProfileController, updateProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const profileRouter=express.Router();



profileRouter.get("/",  getProfileController)
profileRouter.post('/', authMiddleware,upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), addProfile)   
profileRouter.put("/",authMiddleware, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), updateProfile)  
profileRouter.delete("/",authMiddleware, deleteProfile)
profileRouter.get("/resume/download", downloadResume)

export {profileRouter}