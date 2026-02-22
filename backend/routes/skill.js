import { Router } from "express";
import { getSkillsController } from "../controllers/skillController.js";
import { createSkillController } from "../controllers/skillController.js";
import { updateSkillController } from "../controllers/skillController.js";
import { deleteSkillController } from "../controllers/skillController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const skillsRouter=Router();




skillsRouter.get("/",getSkillsController)
skillsRouter.post("/",authMiddleware,createSkillController)
skillsRouter.put("/:id",authMiddleware,updateSkillController)
skillsRouter.delete("/:id",deleteSkillController)

export {skillsRouter}