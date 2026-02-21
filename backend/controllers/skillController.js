import zod from "zod";
import skillModel from "../model/Skill.js";


const getSkillsController=async(req,res)=>{
    try {
        const skills=await skillModel.find()
        if(!skills){
            return res.status(404).json({
                message:"No skills found"
            })
        }
        res.status(200).json(skills)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

const createSkillController=async(req,res)=>{
    try {
        const {name,icon,color,category,proficiency}=req.body
        const objectSchema=zod.object({
            name:zod.string(),
            icon:zod.string(),
            color:zod.string(),
            category:zod.string(),
            proficiency:zod.number().min(1).max(10)

        })
        const validationResult=objectSchema.safeParse({name,icon,color,category,proficiency})
        if(!validationResult.success){
            return res.status(400).json({
                message:"Validation failed",
                errors:validationResult.error.errors
            })
        }


        const newSkill=await skillModel.create({
            name,
            icon,
            color,
            category,
            proficiency
        })
        res.status(201).json(newSkill)
    } catch (error) {
        
    }
}

const updateSkillController=async(req,res)=>{
    try {
        const {id}=req.params
        const {name,icon,color,category,proficiency}=req.body
        const objectSchema=zod.object({
            name:zod.string(),
            icon:zod.string(),
            color:zod.string(),
            category:zod.string(),
            proficiency:zod.number().min(1).max(10)
        })
        const validationResult=objectSchema.safeParse({name,icon,color,category,proficiency})
        if(!validationResult.success){
            return res.status(400).json({
                message:"Validation failed",
                errors:validationResult.error.errors
            })
        }
        const updatedSkill=await skillModel.findByIdAndUpdate(id,{
            name,
            icon,
            color,
            category,
            proficiency
        },{new:true})
        if(!updatedSkill){
            return res.status(404).json({
                message:"Skill not found"
            })
        }
        res.status(200).json(updatedSkill)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }

}

const deleteSkillController=async(req,res)=>{
    try {
        const {id}=req.params
        const deletedSkill=await skillModel.findByIdAndDelete(id)
        if(!deletedSkill){
            return res.status(404).json({
                message:"Skill not found"
            })
        }
        res.status(200).json({
            message:"Skill deleted successfully",
            deletedSkill
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

export {getSkillsController,createSkillController,updateSkillController,deleteSkillController}