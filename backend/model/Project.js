import mongoose, { Schema } from "mongoose";

const projectSchema=new Schema({
    title:String,
    description:String,
    shortDescription:String,
    category:String,
    platform:String,
    technologies:[String],
    Image:String ,
    githubLink:String,
    liveLink:String,
    featured:Boolean,
   
    createdAt:{
        type:Date,
        default:Date.now
    } 
})

const projectModel=mongoose.model("Project",projectSchema)

export default projectModel;