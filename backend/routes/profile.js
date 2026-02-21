import express from "express";

const profileRouter=express.Router();

profileRouter.get("/")
profileRouter.put("/")  
profileRouter.post("/photo")
profileRouter.post("/resume")
profileRouter.delete("/photo")
profileRouter.delete("/resume")
profileRouter.get("/resume/download")

export {profileRouter}