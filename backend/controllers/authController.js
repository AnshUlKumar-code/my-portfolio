import zod from "zod";
import jwt from "jsonwebtoken";

const loginController = (req, res) => {
    try {
        const {email,password}=req.body;
    const objectSchema=zod.object({
        email:zod.string().email(),
        password:zod.string().min(6)
    })
    const validationResult=objectSchema.safeParse({email,password})
    if(!validationResult.success){
        return res.status(400).json({
            message:validationResult.error.errors
        })
    }
    console.log(email,password);
    console.log(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD);
    
    
    if(process.env.ADMIN_EMAIL!=email || process.env.ADMIN_PASSWORD!=password){
        return res.status(401).json({
            message:"Invalid credentials"
        })

    }
    const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(200).json({
        message:"Login successfull",
        token
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message 
        })
        
        
    }
    
}
export {loginController}