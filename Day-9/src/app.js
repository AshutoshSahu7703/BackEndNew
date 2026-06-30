const express = require ("express")

const userModel=require("./models/user.model")

const authRouter=require("./routes/auth.routes")

const app = express()

app.use(express.json())

app.use("/api/auth",authRouter)

const cookieParser=require("cookie-parser")

app.use(cookieParser())

module.exports=app

