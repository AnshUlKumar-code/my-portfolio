import express from "express"
import "dotenv/config.js"
import { config, configDotenv } from "dotenv";
import connectDB from "./config/mongoDB";

configDotenv()


const app=express();

connectDB();w

const port=process.env.PORT || 3000;
console.log(process.env.port);

app.listen(port,()=>{

    console.log(`server running on ${port}`);
    
})

