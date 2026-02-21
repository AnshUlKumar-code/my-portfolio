import express from "express";
import { getProjectsController } from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProjectController } from "../controllers/projectController.js";
import { deleteProjectController } from "../controllers/projectController.js";
import { updateProjectController } from "../controllers/projectController.js";
import { getSingleProjectController } from "../controllers/projectController.js";



const projectsRouter=express.Router();

projectsRouter.use(authMiddleware)

projectsRouter.get("/",getProjectsController)
projectsRouter.get("/:id", getSingleProjectController)
projectsRouter.post("/", createProjectController)
projectsRouter.put("/:id", updateProjectController)
projectsRouter.delete("/:id", deleteProjectController)



export {projectsRouter}