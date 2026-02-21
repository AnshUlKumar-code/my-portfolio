import express from "express"
import "dotenv/config.js"
import { configDotenv } from "dotenv";
import connectDB from "./config/mongoDB.js";
import {authRouter} from "./routes/auth.js";
import {projectsRouter} from "./routes/project.js"

import { skillsRouter } from "./routes/skill.js";

configDotenv()


const app=express();

connectDB();

const port=process.env.PORT || 3000;
// console.log(process.env.port);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authRouter)
app.use("/api/projects",projectsRouter)
app.use("/api/skills",skillsRouter)

app.get("/",(req,res)=>{
    res.json("API is working")

})
 

app.listen(port,()=>{

    console.log(`server running on ${port}`);
    
})

