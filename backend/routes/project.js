import express from "express";
import { getProjectsController } from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProjectController } from "../controllers/projectController.js";
import { deleteProjectController } from "../controllers/projectController.js";
import { updateProjectController } from "../controllers/projectController.js";
import { getSingleProjectController } from "../controllers/projectController.js";



const projectsRouter=express.Router();


projectsRouter.get("/",getProjectsController)
projectsRouter.get("/:id", getSingleProjectController)
projectsRouter.post("/",authMiddleware, createProjectController)
projectsRouter.put("/:id",authMiddleware, updateProjectController)
projectsRouter.delete("/:id",authMiddleware, deleteProjectController)



export {projectsRouter}