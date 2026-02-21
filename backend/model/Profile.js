import { Schema } from "mongoose";

const profileSchema=new Schema({
    name: String,           
  title: String,          
  bio: String,            
  email: String,
  phone: String,
  location: String,       
  photo: String,          
  resume: {
    url: String,          
    filename: String,     
    updatedAt: Date
  },
  social: {
    github: String,
    linkedin: String,
    instagram: String
  }

})

const profileModel=mongoose.model("Profile",profileSchema)

export default profileModel;