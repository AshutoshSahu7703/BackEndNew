const express = require ("express")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

const userModel=require("../models/user.model")

const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body

    const isUserAlreadyExist= await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exist from this email address"
        })
      }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email,name,password:hash
    })

     const token=jwt.sign({
        id:user._id,
     },
     process.env.JWT_SECRET
     )

     res.cookie("jwt_token",token)

     res.status(201).json({
        message:"user created successfully",
        user,
        token
     })
   })

authRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user is not exist from this email id"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"User logged in",
        user
    })
})
   module.exports=authRouter