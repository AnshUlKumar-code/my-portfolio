import { Schema } from "mongoose";
import mongoose from "mongoose";

const skillSchema=new Schema({
  name: String,       
  icon: String,        
  color: String,       
  category: String,    
  proficiency: Number, 
 

})
const skillModel=mongoose.model("Skill",skillSchema)
export default skillModel