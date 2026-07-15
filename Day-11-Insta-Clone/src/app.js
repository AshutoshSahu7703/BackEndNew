const express = require("express")

const cookieParser=require("cookie-parser")

const authRouter=require("./routes/auth.routes")

const postRouter=require("./routes/post.routes")

const userRouter= require("./routes/user.routes")

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use("/api/auth",authRouter) 
app.use("/api/posts",postRouter)
app.use("/api/user",userRouter)

module.exports=app