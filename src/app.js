import cookieParser from "cookie-parser";
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import

import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users" , userRouter)

//url : http://localhost:8000/api/v1/users/register


export {app};