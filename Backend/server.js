import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://2k22cscore2212760:wjoMfKUjjdQxTMv4@courseapp.v6obx.mongodb.net/",
    {dbName:"courseapp"}
).then(console.log("mongodb connected successfully...!"))
.catch((err)=>console.log(err));




const app = express();

app.get('/',(req,res)=>{
    res.end("Home page");
})

const port = 5000;
app.listen(port,(req,res)=>{
    console.log(`server up and runnig at port : ${port}`);
})