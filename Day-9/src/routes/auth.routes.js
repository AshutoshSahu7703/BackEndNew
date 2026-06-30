const express = require ("express")

const jwt = require("jsonwebtoken")

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
    const user = await userModel.create({
        email,name,password
    })

     const token=jwt.sign({
        id:user._id,
        email:user.email
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

   module.exports=authRouter