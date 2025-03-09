import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {addCourse} from "./controller/course.js"

dotenv.config();
const secrect = process.env.MONGO_URI

mongoose.connect(secrect,
    {dbName:"courseapp"}
).then(console.log("mongodb connected successfully...!"))
.catch((err)=>console.log(err));

const app = express();
app.use(express.json());

//home 
app.get('/',(req,res)=>{
    res.end("Home page");
})
//add course done
app.post("/courses/add", addCourse);

const port = 5000;
app.listen(port,(req,res)=>{
    console.log(`server up and runnig at port : ${port}`);
})