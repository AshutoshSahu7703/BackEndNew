const express = require("express")

const userModel=require("../models/user.model")

const crypto=require("crypto")

const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{

    const {name,email,password,bio,profileImage}=req.body

    const isUserAlreadyExist=userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exist"+(isUserAlreadyExist===email?"with this email":"with this username")
        })
    }
    
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = userModel.create({
        name,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = JWT.sign({
        id: user._id,
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("jwt-token",token)

    res.status(200).json({
        message:"User registered Successfully",
        user:{
            
        }
    })
    
})