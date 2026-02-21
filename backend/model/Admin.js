import { Schema} from "mongoose";


const adminSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

const adminModel=mongoose("Admin",adminSchema)

export default adminModel;