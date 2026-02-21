import jwt from "jsonwebtoken";

const  authMiddleware=async (req,res,next)=>{
    try {
        const token=req.headers.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
}
export default authMiddleware;