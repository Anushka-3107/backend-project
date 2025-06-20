
import dotenv from 'dotenv'
import {app} from "./app.js";
import connectDB from './db/index.js'

dotenv.config({
    path: './.env'
});

console.log(process.env)

console.log("Loaded env:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
    console.log(`SERVER STARTED ON PORT : ${process.env.PORT}`)
})
})
.catch((err)=>{
    console.log(err)
})