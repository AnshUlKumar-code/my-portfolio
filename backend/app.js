import express from "express"
import "dotenv/config.js"
import path from 'path'
import { fileURLToPath } from 'url'
import { configDotenv } from "dotenv";
import connectDB from "./config/mongoDB.js";
import {authRouter} from "./routes/auth.js";
import {projectsRouter} from "./routes/project.js"
import { skillsRouter } from "./routes/skill.js";
import { profileRouter } from "./routes/profile.js";
import contactRouter from "./routes/contact.js";
import cors from "cors";

configDotenv()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app=express();

connectDB();
//connectCloudinary();


const port=process.env.PORT || 3000;
// console.log(process.env.port);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use(cors({
//   origin:  'https://my-portfolio-nine-xi-78.vercel.app',
//   credentials: true
// }))
app.use(cors())

app.use("/api/auth",authRouter)
app.use("/api/projects",projectsRouter)
app.use("/api/skills",skillsRouter)
app.use("/api/profile",profileRouter)
app.use("/api/contact",contactRouter)

app.get("/",(req,res)=>{
    res.json("API is working")

})
 

app.listen(port,()=>{

    console.log(`server running on ${port}`);
    
})

